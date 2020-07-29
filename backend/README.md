# Backend Memoria Fotográfica

## Dependencias
Este proyecto depende principalmente de las siguientes librerías:

- `Django x.x.x` como framework web (MVVM)
- `Django REST Framework (DRF)` para el desarrollo de la API Rest y los componentes involucrados:
    - Endpoints
    - API Logic
    - Serializadores
- `knox` para gestionar la autenticación de los usuarios a través de la API en conjunto con DRF

## Organización del proyecto

Este proyecto está modularizado bajo la siguiente estructura:
- `Gallery`: Contiene modelos y API asociada a:
    - Fotos
    - Álbumes
    - ~~Colecciones~~
    - Reportes
    - Comentarios

- `MemoriaFotografica`: Contiene los archivos de configuración del proyecto de **Django**

- `MetaData` Contiene modelos y API asociada a la metadata de las fotos (y sus IPTC Keywords)

- `Metrics` Contiene lógica para obtener diversos KPIs relevantes para el Curador o Administrador.

- `Users` Contiene el modelo de usuario, además de la API asociada y el _handler_ de autenticación del mismo.

- `WebAdmin` Contiene lógica de **envío de correos**, lógica para el curador; modelos+API para la gestión de:
    - Noticias del landing page
    - Peticiones de Imágenes
    - Solicitudes de Contacto

## ERD
Actualizado al **28/07/2020**

![](readme_media/ERD_LEIT_1.png)

### Anexo: IPTC Keywords

Estándar de metadatos de biblioteca, contempla la inclusión de información diversa y 
