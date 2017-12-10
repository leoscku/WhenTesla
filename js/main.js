$(document).ready(function() {
  $('.parallax').parallax();
  priceLookUp();
});

function priceLookUp() {

  teslaPrice = 250000;

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(data) {

    //var result = $.parseJSON(data);
    btcPrice = parseFloat(data[0].price_usd);

    var btcNeed = teslaPrice / btcPrice;

    document.getElementById("btcPrice").innerHTML = btcPrice.toFixed(2);
    document.getElementById("btcNeed").innerHTML = btcNeed.toFixed(2);

  });

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/ethereum/", function(data) {

    //var result = $.parseJSON(data);
    ethPrice = parseFloat(data[0].price_usd);

    var ethNeed = teslaPrice / ethPrice;

    document.getElementById("ethPrice").innerHTML = ethPrice.toFixed(2);
    document.getElementById("ethNeed").innerHTML = ethNeed.toFixed(2);

  });

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/litecoin/", function(data) {

    //var result = $.parseJSON(data);
    ltcPrice = parseFloat(data[0].price_usd);

    var ltcNeed = teslaPrice / ltcPrice;

    document.getElementById("ltcPrice").innerHTML = ltcPrice.toFixed(2);
    document.getElementById("ltcNeed").innerHTML = ltcNeed.toFixed(2);

  });

}

function showPrice() {

  var elem = document.getElementById("index-parallax");
  elem.style.height = "500px";

  $("#price-parallax").show();

  var divHeight = document.getElementById("price-info").clientHeight;
  console.log(divHeight);
  var divParallax = document.getElementById("price-parallax");
  divParallax.style.height = divHeight + "px";


}
