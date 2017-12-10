$(document).ready(function() {
  $('.parallax').parallax();
  priceLookUp();
});

function priceLookUp() {

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(data) {

    //var result = $.parseJSON(data);
    btcPrice = parseInt(data[0].price_usd);
    teslaPrice = 250000;

    var btcNeed = teslaPrice / btcPrice;


    document.getElementById("btcPrice").innerHTML = btcPrice;
    document.getElementById("teslaPrice").innerHTML = teslaPrice;
    document.getElementById("btcNeed").innerHTML = btcNeed;

  });

}
