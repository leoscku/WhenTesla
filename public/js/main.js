var currencyList = [];
var priceList = [];
var currencyName = [];
var currencyid = [];
teslaPrice = 250000;
numCurrency = 15;

var config = {
  apiKey: "AIzaSyDn3AmJ0batXNaJsTzktk7begpyTVR3rVQ",
  authDomain: "whentesla.firebaseapp.com",
  databaseURL: "https://whentesla.firebaseio.com",
  projectId: "whentesla",
  storageBucket: "whentesla.appspot.com",
  messagingSenderId: "900128579744"
};
firebase.initializeApp(config);

var db = firebase.firestore();

$(document).ready(function() {
  $('.parallax').parallax();
  init();

});

function init() {

  console.log("init");

  $.getJSON("https://api.coinmarketcap.com/v2/ticker/?start=1&limit=" + numCurrency, function(data) {
      console.log(data.data);

      $.each(data.data , function (index, value){
        console.log(value);
        currencyid.push(value.website_slug);

        db.collection("CryptoData").doc(value.website_slug).set({
            id: value.id,
            name: value.name,
            symbol: value.symbol,
            price_usd: value.quotes.USD.price,
            rank: value.rank
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      });

    })
    .then(function() {
      createCards();
    })


}

function updatePrice() {

  console.log("update Price");

  for (var i = 0; i < numCurrency; i++) {

    db.collection("CryptoData").doc(currencyid[i]).get().then(function(doc) {
      if (doc.exists) {
        var price = parseFloat(doc.data().price_usd);
        var coinNeed = teslaPrice / price;

        document.getElementById(doc.data().symbol + "Price").innerHTML = price.toFixed(2) + " USD";
        document.getElementById(doc.data().symbol + "Need").innerHTML = coinNeed.toFixed(2);
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });



  }


}

function getPrice() {

  $.getJSON("https://api.coinmarketcap.com/v2/ticker/?limit=" + numCurrency, function(data) {

    $.each(data.data , function (index, value){
      console.log(value);
      currencyid.push(value.website_slug);

      db.collection("CryptoData").doc(value.website_slug).update({
          price_usd: value.quotes.USD.price,
          rank: value.rank
        })
        .then(function() {
          console.log("Document successfully updated!");
        });
    });



  });

}

function createCards() {

  console.log("create Card");

  db.collection("CryptoData").orderBy("rank").limit(numCurrency)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            currID = doc.data().id;
            name = doc.data().name;
            symbol = doc.data().symbol;

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

            var currName = document.createTextNode(" " + doc.data().name);
            var image = document.createElement('img');
            image.src = "https://s2.coinmarketcap.com/static/img/coins/32x32/" + doc.data().id + ".png";
            image.className = "icon";

            titleSpan.appendChild(image);
            titleSpan.appendChild(currName)
            contentDiv.appendChild(titleSpan);


            contentDiv.appendChild(br);
            contentDiv.appendChild(document.createTextNode(doc.data().name + " Price: "));

            var priceSpan = document.createElement('span');
            priceSpan.id = doc.data().symbol + "Price";

            contentDiv.appendChild(priceSpan);

            contentDiv.appendChild(br);
            contentDiv.appendChild(document.createTextNode(doc.data().name + " Needed: "));

            var needSpan = document.createElement('span');
            needSpan.id = doc.data().symbol + "Need";
            contentDiv.appendChild(needSpan);

            cardDiv.appendChild(contentDiv);
            colDiv.appendChild(cardDiv);

            // add created card to body
            document.getElementById("price-container").appendChild(colDiv);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  getPrice();

}

function showPrice() {

  updatePrice();

  document.getElementById("pricebtn").classList.add('disabled');

  var elem = document.getElementById("index-parallax");
  elem.style.height = "500px";

  $("#price-parallax").show();

  var divHeight = document.getElementById("price-info").clientHeight;
  var divParallax = document.getElementById("price-parallax");
  divParallax.style.height = divHeight + "px";


}
