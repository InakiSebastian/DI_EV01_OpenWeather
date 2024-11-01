jQuery(document).ready(function () {
  var contenedorGps = $("#cajaBtnGps");
  var contenedorBuscar = $("#cajaBtnBuscar");
  var botonGps = $("#btnGps");
  var botonBuscar = $("#btnBuscar");
  var botonCerrar = $("#btnClose");
  var cajaInputCiudad = $("#cajaInputCiudad");
  var cajaBtnClose = $("#cajaBtnClose");
  var movimientoOBusqueda = false;
  cajaInputCiudad.hide();
  cajaBtnClose.hide();

 botonCerrar.on("click", function () {
    contenedorGps.addClass("col-lg-6");
    contenedorBuscar.addClass("col-lg-6");
    contenedorGps.removeClass("col-lg-2");
    contenedorBuscar.removeClass("col-lg-2");
    cajaBtnClose.hide();
    cajaInputCiudad.hide();
    movimientoOBusqueda = false;
  });

  botonBuscar.on("click", function () {
    if (movimientoOBusqueda) {
    } else {
      //  contenedorGps.hide();
      contenedorGps.removeClass("col-lg-6");
      contenedorBuscar.removeClass("col-lg-6");
      contenedorGps.addClass("col-lg-2");
      contenedorBuscar.addClass("col-lg-2");
      cajaInputCiudad.show();
      cajaBtnClose.show();

      movimientoOBusqueda = true;
    }
  });
});

