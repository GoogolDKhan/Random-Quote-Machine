let ayatsData;

var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

var currentSurahNumber = "";
var currentVerseNumber = "";
var currentText = "";
var currentTranslation = "";

function getAyats() {
  return $.ajax({
    headers: {
      Accept: "application/json",
    },
    url: "https://gist.githubusercontent.com/GoogolDKhan/cb020da00f64973da8f0d5b97ea68334/raw/6fc2af585bfea8b513f52bbb4a270d4c745a318f/quranayats.json",
    success: function (jsonAyats) {
      if (typeof jsonAyats === "string") {
        ayatsData = JSON.parse(jsonAyats);
        console.log("ayatsData");
        console.log(ayatsData);
      }
    },
  });
}

function getRandomAyat() {
  return ayatsData.ayats[Math.floor(Math.random() * ayatsData.ayats.length)];
}

function getAyat() {
  let randomAyat = getRandomAyat();

  currentSurahNumber = randomAyat.surah_number.toString();
  currentVerseNumber = randomAyat.verse_number.toString();
  currentText = randomAyat.text;
  currentTranslation = randomAyat.translation;

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=ayat&related=freecodecamp&text=" +
      encodeURIComponent(
        '"' +
          currentTranslation +
          '" ' +
          currentSurahNumber +
          " : " +
          currentVerseNumber
      )
  );

  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(currentText + currentTranslation);
  });

  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(currentSurahNumber + " : " + currentVerseNumber);
  });

  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color],
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color],
    },
    1000
  );
}

$(document).ready(function () {
  getAyats().then(() => {
    getAyat();
  });

  $("#new-quote").on("click", getAyat);
});
