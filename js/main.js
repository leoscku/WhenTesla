$(document).ready(function() {
  $('.parallax').parallax();
  priceLookUp();
});

function priceLookUp() {

  teslaPrice = 250000;
  numCurrency = 15;

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=" + numCurrency, function(data) {

    var currencyList = [];
    var priceList = [];
    var currencyName = [];
    var currencyid = [];

    for (var i = 0; i < numCurrency; i++) {

      currencyid.push(data[i].id);
      currencyName.push(data[i].name)
      currencyList.push(data[i].symbol);
      priceList.push(data[i].price_usd);

    }

    for (var i = 0; i < numCurrency; i++) {

      //creating card api results
      var br = document.createElement('br');

      var colDiv = document.createElement('div');
      colDiv.className = "col s12 m4";

      var cardDiv = document.createElement('div');
      cardDiv.className = "card blue-grey darken-1";

      var contentDiv = document.createElement('div');
      contentDiv.className = "card-content white-text center";

      var titleSpan = document.createElement('span');
      titleSpan.className = "card-title";

      var currName = document.createTextNode(" " + currencyName[i]);
      var image = document.createElement('img');
      image.src = "https://files.coinmarketcap.com/static/img/coins/32x32/" + currencyid[i] + ".png";
      image.className = "icon";

      titleSpan.appendChild(image);
      titleSpan.appendChild(currName)
      contentDiv.appendChild(titleSpan);


      contentDiv.appendChild(br);
      contentDiv.appendChild(document.createTextNode(currencyName[i] + " Price: "));

      var priceSpan = document.createElement('span');
      priceSpan.id = currencyList[i] + "Price";

      contentDiv.appendChild(priceSpan);

      contentDiv.appendChild(br);
      contentDiv.appendChild(document.createTextNode(currencyName[i] + " Needed: "));

      var needSpan = document.createElement('span');
      needSpan.id = currencyList[i] + "Need";
      contentDiv.appendChild(needSpan);

      cardDiv.appendChild(contentDiv);
      colDiv.appendChild(cardDiv);

      // add created card to body
      document.getElementById("price-container").appendChild(colDiv);

      //parse price and amount needed
      var price = parseFloat(priceList[i]);
      var coinNeed = teslaPrice / price;

      document.getElementById(currencyList[i] + "Price").innerHTML = price.toFixed(2) + " USD";
      document.getElementById( currencyList[i] + "Need").innerHTML = coinNeed.toFixed(2);
    }


  });

}

function showPrice() {

  document.getElementById("pricebtn").classList.add('disabled');

  var elem = document.getElementById("index-parallax");
  elem.style.height = "500px";

  $("#price-parallax").show();

  var divHeight = document.getElementById("price-info").clientHeight;
  console.log(divHeight);
  var divParallax = document.getElementById("price-parallax");
  divParallax.style.height = divHeight + "px";


}
