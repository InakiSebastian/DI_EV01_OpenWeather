jQuery(document).ready(function () {
  //CONTENEDORES
  var contenedorGps = $("#cajaBtnGps");
  var contenedorBuscar = $("#cajaBtnBuscar");
  var contenedorInputCiudad = $("#cajaInputCiudad");
  var contenedorBtnClose = $("#cajaBtnClose");
  var contenedorTiempoActual = $("#actual");
  var contenedorBtnPrevision = $("#cajaBtnPrevision");
  var contenedorPrevision = $("#cajaPrevision");
  var contenedorTitulo = $("#contenedorTitulo");

  //BOTONES
  var botonGps = $("#btnGps");
  var botonBuscar = $("#btnBuscar");
  var botonCerrar = $("#btnClose");
  var botonPrevision = $("#btnPrevision");

  //INPUT
  var inputCiudad = $("#inputCiudad");

  //CONSTANTES
  const API_KEY = "32703d44a00c89012175a9bb40b70da7";

  //VARIABLES
  var movimientoOBusqueda = false;
  var lat;
  var lon;
  var datosTiempoActual = {};

  //OCULTAR ELEMENTOS AL INICIAR WEB
  contenedorPrevision.hide();
  contenedorBtnPrevision.hide();
  contenedorInputCiudad.hide();
  contenedorBtnClose.hide();
  contenedorTiempoActual.hide();

  //FUNCIONES ON CLICK

  botonPrevision.on("click", function () {
    contenedorPrevision.show();
    contenedorBtnPrevision.hide();
    contenedorTiempoActual.hide();
    contenedorTitulo.removeClass("mt-1");
    contenedorTitulo.removeClass("mt-md-5");
    contenedorTitulo.addClass("mt-0");
    prevision();
  });

  botonCerrar.on("click", function () {
    inputCiudad.val("");
    contenedorGps.addClass("col-lg-6");
    contenedorBuscar.addClass("col-lg-6");
    contenedorGps.removeClass("col-lg-2");
    contenedorBuscar.removeClass("col-lg-2");
    contenedorBtnClose.hide();
    contenedorInputCiudad.hide();
    movimientoOBusqueda = false;
    contenedorTiempoActual.hide();
    contenedorBtnPrevision.hide();
    contenedorPrevision.hide();


    if (contenedorTitulo.hasClass("mt-md-5")) {
      contenedorTitulo.removeClass("mt-1");
      contenedorTitulo.removeClass("mt-md-5");
      contenedorTitulo.addClass("mt-5");
    }

    if (contenedorTitulo.hasClass("mt-0")) {
      contenedorTitulo.removeClass("mt-0");
      contenedorTitulo.addClass("mt-5");
    }

  });

  botonGps.on("click", function () {
    inputCiudad.val("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          $("#loadingGif1").show();

          lat = position.coords.latitude;
          lon = position.coords.longitude;
          busquedaPorCoordenadas();
          contenedorTiempoActual.show();
          contenedorBtnPrevision.show();

          contenedorGps.removeClass("col-lg-6");
          contenedorBuscar.removeClass("col-lg-6");
          contenedorGps.addClass("col-lg-2");
          contenedorBuscar.addClass("col-lg-2");
          contenedorInputCiudad.show();
          contenedorBtnClose.show();
          contenedorPrevision.hide();

          if (contenedorTitulo.hasClass("mt-5")) {
            contenedorTitulo.removeClass("mt-5");
            contenedorTitulo.addClass("mt-1");
            contenedorTitulo.addClass("mt-md-5");
          }

          if (contenedorTitulo.hasClass("mt-0")) {
            contenedorTitulo.removeClass("mt-0");
            contenedorTitulo.addClass("mt-1");
            contenedorTitulo.addClass("mt-md-5");
          }
          movimientoOBusqueda = true;

        },
        function (error) {
          alert("Permiso de geolocalización rechazada");
        }
      );
    } else {
      alert("La geolocalización no está soportada en este navegador.");
    }
  });

  botonBuscar.on("click", function () {
    if (movimientoOBusqueda) {
      if (inputCiudad.val() != "") {
        $("#loadingGif1").show();

        busquedaPorCiudad();


        if (contenedorTitulo.hasClass("mt-5")) {
          contenedorTitulo.removeClass("mt-5");
          contenedorTitulo.addClass("mt-1");
          contenedorTitulo.addClass("mt-md-5");
        }

       
      } else {
        alert("RELLENA LA CIUDAD ANTES DE HACER UNA BUSQUEDA");
      }
    } else {
      contenedorGps.removeClass("col-lg-6");
      contenedorBuscar.removeClass("col-lg-6");
      contenedorGps.addClass("col-lg-2");
      contenedorBuscar.addClass("col-lg-2");
      contenedorInputCiudad.show();
      contenedorBtnClose.show();
      contenedorPrevision.hide();

      movimientoOBusqueda = true;
    }
  });

  //FUNCIONES AÑADIR DATOS
  function anadirDatosActualesAWeb(datos) {
    $("#loadingGif1").hide();
    $("#tituloActual").empty();
    ciudad = datos["nombre"];

    $("#tituloActual").append(
      "<h4>TIEMPO EN " + ciudad.toUpperCase() + "</h4>"
    );

    var temperatura = Math.round(datos["tiempo"]);
    var iconoUrl =
      "https://openweathermap.org/img/wn/" + datos["icon"] + "@2x.png";

    $("#iconoActual").empty();
    $("#iconoActual").append($("<img  src='" + iconoUrl + "'></img>"));

    $("#temperaturaActual").empty();
    $("#temperaturaActual").append($("<h4>" + temperatura + "°C</h4>"));
  }

  function anadirPrevision(datos) {
    var hoy = new Date();
    var diasPrevision = [[],[],[],[]];

    datos.forEach((tiempo) => {
      if (tiempo["fecha"].getDate() == hoy.getDate() + 1) {
        diasPrevision[0].push(tiempo);
      } else if (tiempo["fecha"].getDate() == hoy.getDate() + 2) {
        diasPrevision[1].push(tiempo);
      } else if (tiempo["fecha"].getDate() == hoy.getDate() + 3) {
        diasPrevision[2].push(tiempo);
      } else if (tiempo["fecha"].getDate() == hoy.getDate() + 4) {
        diasPrevision[3].push(tiempo);
      }
    });

    imprimirPrevision(diasPrevision[0],"tituloDia1","bodyCarta1");
    imprimirPrevision(diasPrevision[1],"tituloDia2","bodyCarta2");
    imprimirPrevision(diasPrevision[2],"tituloDia3","bodyCarta3");
    imprimirPrevision(diasPrevision[3],"tituloDia4","bodyCarta4");
  
  }

  function imprimirPrevision(diaPrevision,idTitulo,idBody){
    var dias = [
      "DOMINGO",
      "LUNES",
      "MARTES",
      "MIERCOLES",
      "JUEVES",
      "VIERNES",
      "SABADO",
    ];
    $("#" + idTitulo).text(dias[diaPrevision[0]["fecha"].getDay()]);
    $("#" + idBody).find("p").remove();

    diaPrevision.forEach((franja) => {
      var iconoUrl =
        "https://openweathermap.org/img/wn/" + franja["icono"] + "@2x.png";

      $("#" + idBody).append(
        $(
          "<p>" +
            franja["fecha"].getHours() +
            ":" +
            String(franja["fecha"].getMinutes()).padStart(2, "0") +
            " " +
            Math.round(franja["temperatura"]) +
            'ºC<img class="img-fluid" style="height:50px;width:50px;" src="' +
            iconoUrl +
            '"></img></p>'
        )
      );
    });

  }

  //PETICIONES

  function prevision() {
    var url2 =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY +
      "&units=metric";

    $.ajax({
      // la URL para la petición
      url: url2,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json3) {
        var datosPrevision = [];

        json3.list.forEach((tiempo) => {
          var fecha = new Date(tiempo.dt * 1000);
          var datos = {
            fecha: fecha,
            temperatura: tiempo.main.temp,
            icono: tiempo.weather[0].icon,
          };
          datosPrevision.push(datos);
        });
        anadirPrevision(datosPrevision);
      },

      // código a ejecutar si la petición falla;
      error: function (xhr, status) {
        alert("Disculpe, existió un problema");
      },
    });
  }

  function busquedaPorCoordenadas() {
    var url2 =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY +
      "&units=metric";

    $.ajax({
      // la URL para la petición
      url: url2,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json2) {
        datosTiempoActual["nombre"] = json2.name;
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

  function busquedaPorCiudad() {
    var url1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputCiudad.val() +
      "&limit=1&appid=" +
      API_KEY +
      "&units=metric";

    $.ajax({
      // la URL para la petición
      url: url1,

      type: "GET",
      // el tipo de información que se espera de respuesta
      dataType: "json",
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (json) {
        lat = json.coord["lat"];
        lon = json.coord["lon"];
        datosTiempoActual["nombre"] = json.name;
        datosTiempoActual["icon"] = json.weather[0].icon;
        datosTiempoActual["tiempo"] = json.main.temp;
        contenedorPrevision.hide();
        contenedorTiempoActual.show();
        contenedorBtnPrevision.show();
        if ($("#contenedorTitulo").hasClass("mt-0")) {
          $("#contenedorTitulo").removeClass("mt-0");
          $("#contenedorTitulo").addClass("mt-1");
          $("#contenedorTitulo").addClass("mt-md-5");
        }
        anadirDatosActualesAWeb(datosTiempoActual);
      },
      // código a ejecutar si la petición falla;
      error: function (xhr, status) {
        if (xhr.status === 404) {
          alert("Ciudad no encontrada. Verifique el nombre de la ciudad.");
        } else {
          alert("Disculpe, existió un problema.");
        }

        $("#loadingGif1").hide();
        contenedorBtnPrevision.hide();
        contenedorTiempoActual.hide();
      },
    });
  }
});
