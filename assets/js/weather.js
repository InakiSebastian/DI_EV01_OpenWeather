jQuery(document).ready(function()
{
    var contenedorGps = $("#cajaBtnGps");
    var contenedorBuscar = $("#cajaBtnBuscar");
    var botonGps = $("#btnGps");
    var botonBuscar = $("#btnBuscar");
    var cajaInputCiudad = $("#cajaInputCiudad");
    cajaInputCiudad.hide()


    botonBuscar.on("click", function ()  {
        contenedorGps.hide();
        cajaInputCiudad.show();
    });


});