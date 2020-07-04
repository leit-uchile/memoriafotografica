<img src="uchile_fcfm.svg" width="300px"/>

<img width="500px" src="frontend/public/assets/bcentral.svg" />

# Proyecto Recuperación de la Memoria Fotográfica de la FCFM

Actualmente la FCFM carece de una base de datos que contenga su memoria fotográfica. Se trata de una institución de relevancia nacional que, no obstante haber influido significativamente en la historia del país y en su desarrollo, no es capaz hoy día de acceder a la documentación visual emanada de sus anteriores procesos, los que se encuentran disgregados y en manos de quienes vivenciaron cada una de aquellas experiencias, mas no en en los anales de la propia facultad. Esta carencia dificulta significativamente el conocimiento y acceso a la documentación que contiene la historia de nuestra casa de estudios, por lo que resulta necesario rescatar y sistematizar dicha información para permitir a la comunidad toda imbuirse de la trayectoria que ha construido el carácter e identidad de la Escuela de InJeniería de la Universidad de Chile.

<img width="500px" src="frontend/public/assets/logoExt.svg" />

## Objetivos

* Preservar
  * Respaldo de los datos.
  * Seguridad ante ataque.
  * Facilidad de migración de datos.
* Recuperar la memoria fotográfica e historia de la facultad
  * ¿Cómo acercarse a la comunidad?
  * Obtener información asociada a la imagen.
  * Generar participación.
* Socializar y compartir tal memoria
  * Abrir la información al público general.
  * Generar información a partir del conocimiento público (Crowdsourcing).

## Equipo

Legal y derechos de autor
  - Fernanda Carvajal (Egresada de leyes) 

Desarrollo
  - Natalia Duran (Enfermería)
  - Isaias Venegas (Computación)
  - Victoria Bollo (Astronomía)
  - Dario Caceres (Computación)
  - Dario Palma (Computación)

Se agradece a
- Nicolas Varas
- Eduardo Riveros
- Juan Alvarez
- Rafael Castillo

por la idea original del Laboratorio Estudiantil de Infotecnologías **LEIT**

# Setup del proyecto (desarrollo)

La aplicación utiliza Django para el backend y React en frontend. La aplicación se encuentra dockerizada.

Para correr el proyecto se necesita *docker* y *docker-compose*. Los comandos son los siguientes:

```
user$ sudo docker-compose build
user$ sudo docker-compose run db # Hay que permitir que se inicialice una vez, si no Django no se conectará con ella a tiempo.
user$ sudo ./reset_db.sh
user$ sudo ./load_fixtures.sh
user$ sudo docker-compose up
```

En caso de no poder utilizar el script *.sh* basta cambiar los permisos del archivo con
```
user$ sudo chmod +x ./reset_db.sh
```

# Setup del proyecto con Docker (release)

**Trabajo en proceso ...**

Pasos:
1. Cambiar en backend/MemoriaFotografica/settings.py las variables:
    * DEBUG=False
    * ALLOWED_HOSTS=["nombre de dominio"]
2. Ajustar variables de produccion en frontend/.env-cmdrc
    * REACT_APP_BACKEND_URL="URL dominio con HTTP(S)"
3. Compilar Frontend con `user$ sudo docker-compose rn frontend npm build`
4. Cambiar variables de dominio en configuracion de NGINX
5. Crear imagenes de Django (con todas sus operaciones de collect static y configuracion de gunicorn)
6. Crear imagenes (missing) y desplegar exponiendo el puerto 80/443 (con un certbot en la misma para pedir certificados y reiniciar nginx cuando sea necesario)