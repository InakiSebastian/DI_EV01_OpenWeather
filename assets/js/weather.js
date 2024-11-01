jQuery(document).ready(function () {
  var contenedorGps = $("#cajaBtnGps");
  var contenedorBuscar = $("#cajaBtnBuscar");
  var botonGps = $("#btnGps");
  var botonBuscar = $("#btnBuscar");
  var cajaInputCiudad = $("#cajaInputCiudad");
  var movimientoOBusqueda = false;
  cajaInputCiudad.hide();

  botonBuscar.on("click", function () {
    if (movimientoOBusqueda) {
    } else {
      //  contenedorGps.hide();
      contenedorGps.removeClass("col-lg-6");
      contenedorBuscar.removeClass("col-lg-6");
      contenedorGps.addClass("col-lg-3");
      contenedorBuscar.removeAttr("col-lg-3");
      cajaInputCiudad.show();
      movimientoOBusqueda = true;
    }
  });
});
