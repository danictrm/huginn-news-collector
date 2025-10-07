const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const querystring = require('querystring'); 

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.text({ type: '*/*' })); 
app.use(express.static('public'));


const db = new sqlite3.Database('huginn_events.db');


db.run(`CREATE TABLE IF NOT EXISTS rsss_events (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  date_published TEXT,
  title TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);


app.post("/huginn", (req, res) => {
  console.log("📥 Evento recibido (URL encoded):");
 
  try {
    
    const decodedData = querystring.parse(req.body);
    console.log("Datos decodificados:", decodedData);

    
    const eventData = {
      id: decodedData.id,
      url: decodedData.url,
      date_published: decodedData.date_published,
      title: decodedData.title,
      description: decodedData.description
    };

    console.log("Datos procesados:", eventData);

    if (!eventData.id || !eventData.url) {
      return res.status(400).json({ error: "Faltan campos id o url" });
    }

    
    if (eventData.title) {
      eventData.title = eventData.title.replace(/%20/g, ' ').replace(/%22/g, '"');
    }

    db.run(
      `INSERT OR REPLACE INTO rsss_events (id, url, date_published, title, description)
       VALUES (?, ?, ?, ?, ?)`,
      [eventData.id, eventData.url, eventData.date_published, eventData.title, eventData.description],
      function(err) {
        if (err) {
          console.error("❌ Error BD:", err);
          return res.status(500).json({ error: err.message });
        }
       
        console.log("✅ Guardado:", eventData.id);
        res.json({ status: "ok", id: eventData.id });
      }
    );

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/events', (req, res) => {
  db.all("SELECT * FROM rsss_events ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error('❌ Error en BD:', err);
      return res.status(500).json({ error: 'Error de base de datos' });
    }
   
    console.log(`✅ Enviando ${rows.length} eventos`);
    res.json(rows);
  });
});


app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
