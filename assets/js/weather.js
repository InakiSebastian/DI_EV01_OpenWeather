jQuery(document).ready(function () {
  var contenedorGps = $("#cajaBtnGps");
  var contenedorBuscar = $("#cajaBtnBuscar");
  var botonGps = $("#btnGps");
  var botonBuscar = $("#btnBuscar");
  var botonCerrar = $("#btnClose");
  var cajaInputCiudad = $("#cajaInputCiudad");
  var inputCiudad = $("#inputCiudad");
  var cajaBtnClose = $("#cajaBtnClose");
  var cajaActual = $("#actual");
  const API_KEY = "32703d44a00c89012175a9bb40b70da7";
  var datosTiempoActual = {};

  var movimientoOBusqueda = false;
  cajaInputCiudad.hide();
  cajaBtnClose.hide();
  cajaActual.hide();
  var lat;
  var lon;

  botonCerrar.on("click", function () {
    inputCiudad.val("");
    contenedorGps.addClass("col-lg-6");
    contenedorBuscar.addClass("col-lg-6");
    contenedorGps.removeClass("col-lg-2");
    contenedorBuscar.removeClass("col-lg-2");
    cajaBtnClose.hide();
    cajaInputCiudad.hide();
    movimientoOBusqueda = false;
    cajaActual.hide();
  });

  $("#btnGps").on("click", function () {
    inputCiudad.val("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        busquedaPorCoordenadas();
        cajaActual.show();
        contenedorGps.removeClass("col-lg-6");
        contenedorBuscar.removeClass("col-lg-6");
        contenedorGps.addClass("col-lg-2");
        contenedorBuscar.addClass("col-lg-2");
        cajaBtnClose.show();
  
      });
    } else {
      alert("HAY PROBLEMAS CON LA GEOLOCALIZACIÓN. INTENTALO MAS TARDE");
    }
  });

  function añadirTituloNombre(name){
    $("#tituloActual").append("<h4>TIEMPO EN " + name + "</h4>");

  }

  function obtenerNombreCiudad() {
    var url2 =
      "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY;

    $.ajax({
      // la URL para la petición
      url: url2,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json3) {
        añadirTituloNombre(json3[0]["name"].toUpperCase());
      },

      // código a ejecutar si la petición falla;
      error: function (xhr, status) {
        alert("Disculpe, existió un problema");
      },
    });
  }

  botonBuscar.on("click", function () {

    if (movimientoOBusqueda) {
      if (inputCiudad.val() != "") {
        consultaActual();
        cajaActual.show();
      } else {
        alert("RELLENA LA CIUDAD ANTES DE HACER UNA BUSQUEDA");
      }
    } else {
      contenedorGps.removeClass("col-lg-6");
      contenedorBuscar.removeClass("col-lg-6");
      contenedorGps.addClass("col-lg-2");
      contenedorBuscar.addClass("col-lg-2");
      cajaInputCiudad.show();
      cajaBtnClose.show();

      movimientoOBusqueda = true;
    }
  });

  

  function anadirDatosActualesAWeb(datos) {
    $("#loadingGif1").hide();
    $("#tituloActual").empty();
    if (inputCiudad.val() == "") {
      
      obtenerNombreCiudad();
    } else {
      $("#tituloActual").append("<h4>TIEMPO EN " + inputCiudad.val().toUpperCase() + "</h4>");

    }
    var temperatura = Math.round(datos["tiempo"] - 273.15);
    var iconoUrl =
      "https://openweathermap.org/img/wn/" + datos["icon"] + "@2x.png";

    $("#iconoActual").empty();
    $("#iconoActual").append($("<img  src='" + iconoUrl + "'></img>"));

    $("#temperaturaActual").empty();
    $("#temperaturaActual").append($("<h4>" + temperatura + "°C</h4>"));
  }

  function busquedaPorCoordenadas() {
    var url2 =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY;

    $.ajax({
      // la URL para la petición
      url: url2,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json2) {
        datosTiempoActual["icon"] = json2.weather[0].icon;
        datosTiempoActual["tiempo"] = json2.main.temp;
        anadirDatosActualesAWeb(datosTiempoActual);
        inputCiudad.val("");
      },

      // código a ejecutar si la petición falla;
      error: function (xhr, status) {
        alert("Disculpe, existió un problema");
      },
    });
  }

  function consultaActual() {
    var url1 =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      inputCiudad.val() +
      "&limit=1&appid=" +
      API_KEY;

    $.ajax({
      // la URL para la petición
      url: url1,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json) {
        if (json.length == 0) {
          cajaActual.hide();
          alert("No se ha encontrado la ciudad " + inputCiudad.val());
        } else {
          json.forEach((ciudad) => {
            lat = ciudad["lat"];
            lon = ciudad["lon"];
            busquedaPorCoordenadas();
          });
        }
      },
      // código a ejecutar si la petición falla;
      error: function (xhr, status) {
        alert("Disculpe, existió un problema");
      },
    });
  }
});
