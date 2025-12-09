commands:

sudo apt remove docker docker-engine docker.io containerd runc

sudo apt update

sudo apt install ca-certificates curl gnupg lsb-release

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo docker run hello-world # para revisar que funciona

sudo usermod -aG docker $USER # no es necesario


sudo docker run -d -p 127.0.0.1:3000:3000 --name huginn ghcr.io/huginn/huginn

sudo docker exec -it huginn /app/bin/rails console

user = User.new(
  email: 'tucorreo',
  password: 'tucontraseña', 
  username: 'tuusuario',
  admin: true
)

user.save(validate: false)

User.last.email # para verificar que se ha creado correctamente


docker ps -a

docker start huginn_web_1

docker exec -it huginn_web_1 bash

docker start -a huginn_web_1
Resumen rápido de uso
Instalación de Docker desde el repositorio oficial, incluyendo docker-ce, docker-ce-cli, containerd.io y el plugin de docker compose.​

Prueba de la instalación con sudo docker run hello-world para confirmar que el daemon funciona correctamente.​

Despliegue de Huginn con el puerto 3000 expuesto sólo en 127.0.0.1, y creación de un usuario admin desde la consola de Rails del contenedor.​

Gestión básica de contenedores
docker ps -a muestra todos los contenedores, incluyendo los detenidos (equivalente a docker container ls -a).​

docker start huginn_web_1 arranca un contenedor que estaba parado; docker start -a huginn_web_1 lo arranca y adjunta la salida al terminal.​

docker exec -it huginn_web_1 bash abre una shell interactiva dentro del contenedor ya en ejecución.​

Acceso a la interfaz de Huginn
Con el -p 127.0.0.1:3000:3000 puedes acceder a la interfaz web de Huginn desde el host en http://localhost:3000 para crear y editar agentes.​

Esta configuración limita el acceso al propio equipo, lo que es ideal para entornos de desarrollo o pruebas locales.​

Tips adicionales
bash
Docker ps -a
Docker start huginn

si queremos parar el servidor exit
ps aux | grep nombre servidor
kill -9 "pid"

npm install
npm start

recordar que en cheerio hay que descargar la ultima versión estable no la latest que va mal con npm

revisar condiciones de uso de RSS y no hacer scraping masivo

Comprobar siempre cada cuanto nos permite solicitar el RSS la web, para no sobrapasar el rate limiting y que no te banen la IP
Docker ps -a (equivalente a docker ps -a) permite ver todos los contenedores, incluidos los que están parados, y es muy útil para localizar nombres reales de contenedores.​

Docker start huginn arranca el contenedor llamado huginn si existe y está detenido, de forma similar a como se usa con huginn_web_1.​

Para parar servidores que se ejecutan en primer plano (por ejemplo, npm start o un servidor de desarrollo), lo normal es salir con Ctrl+C o exit si estás dentro de una shell interactiva.

Si un proceso se queda colgado, puedes localizarlo con ps aux | grep nombre servidor y terminarlo con kill -9 "pid", aunque la señal -9 debería ser la última opción porque fuerza el cierre sin limpieza de recursos.

En proyectos Node.js, npm install instala las dependencias definidas en package.json y npm start lanza el script de inicio definido allí.

Con Cheerio, es recomendable fijar una versión estable concreta en package.json en lugar de usar latest, para evitar incompatibilidades o cambios rompientes con npm.

Antes de consumir un RSS, conviene revisar las condiciones de uso de la web y evitar hacer scraping masivo o automatizado que vaya en contra de sus políticas.

Comprueba siempre cada cuánto permite la web consultar el RSS (cabeceras HTTP, documentación o robots.txt) para respetar el rate limiting y minimizar el riesgo de baneos de IP.
