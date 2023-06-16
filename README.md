# prueba técnica Milio
[![N|Solid](https://cdn-icons-png.flaticon.com/256/25/25231.png)](https://github.com/carlosdizx)
[![N|Solid](https://cdn-icons-png.flaticon.com/256/174/174857.png)](https://www.linkedin.com/in/carlos-ernesto-diaz-basante-backend/)

### Descripción

Esta aplicación desarrollada con NestJS y Serverless es un ejemplo de una función lambda que
interactúa con una base de datos Postgres SQL utilizando TypeORM como ORM.
La función se encarga de leer información de un archivo ubicado en un Bucket de Amazon S3
(archivo csv). Adicionalmente, se creó un CRUD para una entidad para interactuar con la aplicación,
además, se crearon migraciones para poblar la base de datos con las tablas y recursos que necesita para
gestionar la persistencia de los datos.

La aplicación utiliza AWS-SDK v3 para la comunicación con Amazon S3 y está diseñada para
ser ejecutada en un entorno serverless, lo que proporciona una escalabilidad y flexibilidad óptima.
Además, se incluyen las colecciones de Postman para facilitar la prueba y el consumo
de la función lambda.

### Requisitos

Antes de ejecutar la aplicación localmente o desplegarla en un entorno de producción, asegúrate de tener lo siguiente instalado:

- Nodejs y npm instalados en tu máquina (version 16 de Nodejs recomendada).
- NestJs y Serverless instalados de manera global en tu máquina.
- Git para clonar el repositorio.
- Docker instalado en tu máquina (puedes utilizar una base de datos que ya tengas en tu maquina).
- Postman para probar la aplicación.

### Instalación

Sigue estos pasos para instalar y configurar la aplicación localmente:

1. Clona este repositorio en tu máquina local.
    ```
    git clone https://github.com/carlosdizx/test-milio.git
    ```
2. Abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias:
    ```
    npm install
    ```

3. Crea los recursos que se utilizarán en AWS, como la base de datos y el bucket
   - ### Crea una base de datos de RDS
   - Inicia sesión en la Consola de administración de AWS utilizando tus credenciales de cuenta de AWS.
   - Busca y selecciona "RDS" para acceder al servicio de Amazon RDS.
   - Haz clic en el botón "Crear base de datos".
   - Selecciona "Crear base de datos estándar".
   - En la sección "Motor de base de datos", elige "PostgreSQL".
   - En la sección "Opciones de despliegue", selecciona la opción adecuada según tus necesidades (por ejemplo, "Producción" o "Prueba y desarrollo").
   - En la sección "Capacidad", configura la clase de instancia de la base de datos y el tamaño de almacenamiento según tus requisitos.
   - En la sección "Configuración de la base de datos", ingresa el nombre de la base de datos, el nombre de usuario y la contraseña para el acceso a la base de datos.
   - En la sección "Conexión", selecciona una opción para la accesibilidad de la base de datos desde Internet (por ejemplo, "Acceso público" para permitir conexiones desde cualquier lugar). Ten en cuenta que esta opción no tiene en cuenta consideraciones de seguridad y es recomendable utilizar una VPC y configurar adecuadamente la seguridad.
   - En la sección "Configuración adicional", puedes ajustar otros parámetros según tus necesidades, como el grupo de seguridad, los respaldos automáticos y la retención de respaldos.
   - Haz clic en el botón "Crear base de datos" para iniciar la creación de la base de datos Postgres en Amazon RDS.
   - ### Crea un bucket de S3
   - Inicia sesión en la Consola de administración de AWS utilizando tus credenciales de cuenta de AWS.

   - Busca y selecciona "S3" para acceder al servicio de Amazon S3.
   - Haz clic en el botón "Crear bucket".
   - Ingresa un nombre único para tu bucket. Ten en cuenta que el nombre debe ser globalmente único entre todos los buckets de S3 existentes.
   - Selecciona la región en la que deseas crear el bucket.
   - En la sección "Configuración de permisos", desmarca la opción "Bloquear todo el acceso público" para permitir el acceso público al bucket.
   - Importante: Al configurar un bucket como público, se permitirá el acceso a todos los objetos dentro del bucket a través de Internet. Asegúrate de entender y gestionar adecuadamente las implicaciones de seguridad y privacidad de los datos antes de habilitar el acceso público.
   - Haz clic en el botón "Crear bucket" para crear el bucket de S3.


4. Configura las variables de entorno de tu ambiente, crea un archivo en la raíz del proyecto llamado ```.env```
ahí colocarás tus variables de conexión a base de datos y tu bucket de s3, asi como la región.

    Ejemplo (Esta configuración es para probar en local, los valores se reemplazan por los que se necesiten):
    ```
    #DB POSTGRESQL
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=milio_database
    
    #S3
    S3_BUCKET_NAME=milio-bucket
    S3_BUCKET_REGION=us-east-1
    ```

5. Instala la base de datos en el proyecto, ejecuta el comando:
    ```
   npm run database:install
   ```
6. Ejecuta las migraciones para construir y poblar la base de datos con las tablas
y recursos requeridos, para correo el comando:
   ```
   npm run migration:run  
   ```
7. Corre la aplicación en tu máquina para probar las funcionalidades de los endpoints:
   ```
   npm run serveless:dev
   ```
8. En Postman importa la colección de postman con los endpoint de la app
   - Ve a Postman y en la sección de colecciones busca el archivo ```Mlio App.postman_collection.json``` (está en la raíz del proyecto)
   - Verás que al importar se crea una colección en Postman con los endpoints para testear la aplicación
   - Cada endpoint deberás reemplazar ```{{MILIO-PROD}}``` por la url base de tu app, por ejemplo:
     - ```GET {{MILIO-PROD}}users``` por ```GET http://localhost:3000/users```
     - ```PATCH {{MILIO-PROD}}users/7c2ffbb9-7832-4025-b25b-448ed96a7b85``` por ```PATCH http://localhost:3000/users/7c2ffbb9-7832-4025-b25b-448ed96a7b85```
   - Realiza todas las pruebas que tengas que hacer sobre las operaciones crud
   - Para la prueba de leer el archivo de S3 y cargar su contenido en base de datos puedes probar el endpoint
     - ```POST http://localhost:3000/users/upload-data```
   Este te devolverá un objeto con un mensaje y los usuarios que fueron cargados a la base de datos.
     - Puedes apoyarte del endpoint ```GET http://localhost:3000/users``` para corroborar la operación.

9. Para desplegar el proyecto es necesario que tengas una cuenta de AWS activa, además, de que hayas
generado las credenciales de acceso a AWS desde la CLI.
   - Inicia sesión en la Consola de administración de AWS utilizando tus credenciales de cuenta de AWS.
   - Busca y selecciona "IAM" para acceder al servicio de Identidad y acceso de AWS.
   - En el panel de navegación izquierdo, haz clic en "Usuarios".
   - Selecciona el usuario al que deseas generar las credenciales de acceso o crea uno nuevo.
   - En la pestaña "Credenciales de seguridad", haz clic en el botón "Crear credenciales de acceso".
   - Aparecerá un cuadro de diálogo con las credenciales de acceso recién generadas. Asegúrate de guardar estas credenciales de manera segura, ya que no se mostrarán nuevamente. 
   - Importante: La clave de acceso y el secreto de acceso son sensibles y proporcionan acceso completo a tus recursos de AWS. Trátalos como información confidencial y no los compartas públicamente.
   - Una vez que hayas guardado las credenciales de acceso, puedes configurar AWS CLI en tu máquina local siguiendo estos pasos adicionales:
   ```
   aws configure
   ```
   - Se te solicitará ingresar las credenciales de acceso que generaste en los pasos anteriores. Proporciona la clave de acceso y el secreto de acceso cuando se te soliciten, y luego configura la región predeterminada y el formato de salida según tus preferencias.
   - Una vez que hayas completado la configuración, las credenciales de acceso se guardarán en tu máquina y podrás utilizar AWS CLI para interactuar con los servicios de AWS utilizando esas credenciales.
   - ### Desplegar la aplicación
   - Ejecuta el comando
   ```
   npm run serveless:deploy
   ```
   Nota: Al final del despliegue te entregará una url, esta será tu url base para probar en postman, recuerda
actualizar tus variables de entorno antes de desplegar, también de ejecutar la migración en tu base de datos de AWS RDS.

