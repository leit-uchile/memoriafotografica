<img src="uchile_fcfm.svg" width="300px"/>

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
  - Fernanda Carvajal (Abogada) 

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

por la idea original del Laboratorio Estudiantil de Infotecnologías **LEIT**

# Setup del proyecto

La aplicación utiliza Django para el backend y React en frontend. La aplicación se encuentra dockerizada.

Para correr el proyecto se necesita *docker* y *docker-compose*. Los comandos son los siguientes:

```
user$ sudo docker-compose build
user$ sudo ./reset_db.sh
user$ sudo ./load_fixtures.sh
user$ sudo docker-compose up
```

En caso de no poder utilizar el script *.sh* basta cambiar los permisos del archivo con
```
user$ sudo chmod 777 ./reset_db.sh
```