# Weather App by Iñaki Cabrera

## Descripción

Esta es una aplicación web que proporciona información meteorológica actual y predicciones para los próximos 4 días, utilizando la API de OpenWeather.  [LINK A LA WEB](https://inakisebastian.github.io/DI_EV01_OpenWeather/)	

### Funciones:
- Obtener el tiempo actual basado en la localización actual.
- Buscar el tiempo de una ciudad mediante un formulario de búsqueda por nombre.
- Obtener la predicción para los próximos 4 días.



## Estructura del Proyecto

- `index.html`               - Página principal de la aplicación
- `assets/`
  - `bootstrap/`              - Archivos de Bootstrap
  - `css/`
    - `custom.css`            - Estilos CSS compilados desde custom.scss
  - `js/`
    - `weather.js`            - Archivo principal de JavaScript
  - `scss/`
    - `custom.scss`           - Archivo SCSS fuente

## Archivos Principales

- **`index.html`**: Es el archivo HTML principal de la aplicación. Aquí se cargan los elementos de la interfaz y los scripts.
  
- **`assets/js/weather.js`**: Este archivo contiene la lógica principal para interactuar con la API de OpenWeatherMap y actualizar la interfaz con la información del clima.

- **`assets/scss/custom.scss`**: Archivo SCSS que contiene los estilos personalizados para la aplicación, que se compilan en el archivo CSS. También se incluye variables para modificar algunos parametros de bootstrap como el color primario y el spacer de los margins
- **`assets/css/custom.css`**: Archivo CSS compilado a partir de `custom.scss`, que contiene los estilos finales de la aplicación.

## Metodos Implementados

### Para buscar datos del tiempo actual

- **`busquedaPorCoordenadas()`**
  - Obtiene el clima actual utilizando las coordenadas geográficas (latitud y longitud) del usuario, obtenidas a través de la geolocalización.
  - Realiza una solicitud AJAX a la API de OpenWeatherMap para obtener los datos y los muestra en la página.

- **`busquedaPorCiudad()`**
  - Permite al usuario buscar el clima de una ciudad introduciendo su nombre.
  - Realiza una solicitud AJAX a la API de OpenWeatherMap y maneja errores en caso de que la ciudad no sea encontrada o haya problemas con la solicitud.

### Previsión

- **`prevision()`**
  - Obtiene la previsión meteorológica para los próximos 4 días basándose en las coordenadas actuales o las de obtenidas a través de la peticion de busqueda por ciudad (latitud y longitud).
  - Realiza una solicitud AJAX a la API de OpenWeatherMap para obtener los datos de la previsión y los muestra en la página.

### Funciones de Actualización

- **`anadirDatosActualesAWeb()`**
  - Esta función actualiza los elementos de la página con los datos del clima actual, como la temperatura, el nombre de la ciudad y el icono correspondiente al clima.

- **`anadirPrevision()`**
  - Actualiza la página con la previsión del clima para los próximos 4 días. Organiza los datos por día y los muestra junto con las temperaturas y los iconos correspondientes al clima.

## API

La aplicación utiliza la API de OpenWeatherMap para obtener los datos del clima actual y las previsiones meteorológicas.

- **OpenWeatherMap**
  - URL: [https://openweathermap.org/](https://openweathermap.org/)
  - Proporciona datos meteorológicos actuales, previsiones y más a través de su API.
  - Se requiere una clave de API para realizar solicitudes a su servicio.

## Métodos de la API

- **GET /weather**
  - Obtiene el clima actual para una ciudad o coordenadas geográficas.
  - Ejemplo de URL: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=API_KEY&units=metric`

- **GET /forecast**
  - Obtiene la previsión meteorológica para los próximos 5 días en intervalos de 3 horas.
  - Ejemplo de URL: `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=API_KEY&units=metric`

## Uso

1. Abre la aplicación en tu navegador.
2. Puedes obtener el clima actual utilizando tu ubicación o buscando por el nombre de una ciudad.
3. La previsión del clima para los próximos 4 días estará disponible después de realizar la búsqueda.


