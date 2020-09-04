//page responsiveness


//INITALIally ASSIGNING VARIABLES--------------------------------------
//source for json
var pokeURL = "https://pokeapi.co/api/v2/pokemon/";
//
//high res img source
var pokeURL2 = "https://cdn.traction.one/pokedex/pokemon/"
//
//pokemon description
var pokeURL3 = "https://pokeapi.glitch.me/v1/pokemon/"
//
//counters
var guessNum = [];

var pokemonTypes = [];
var correctAns =[];

var type1 = document.getElementById("type1").innerText.toLowerCase();


//--------------------------------------------------------------------
//INIT FUNCTIONS---------------------------------------------------------------------------
// GO HOME FUNCTION=============
function goHome() {
  window.location.href = "pokeproject.html"
}
//

//page restructuring
function pageGame() {
  $('#game-div').attr("hidden", false);
  $("#lucky-div").attr("hidden", true);
  $("#num-type").attr("hidden", false);
  $(".guessDiv").attr("hidden", false);
  $("#pokeID").attr("hidden", true);
  $("#start-btn").attr("hidden", true);
  $("#poke-search").attr("hidden", true);
  $("#poke-ball").attr("hidden",true);
  $("#poke-img").attr("hidden",false);
  $(".typeDiv").attr('hidden',true);
}

//



// button comparison to type
function answerSubmit(num) {
  var answer = document.getElementById("t" + num).value;
  var name = document.getElementById("results").innerText;

  var type1 = document.getElementById("type1").innerText.toLowerCase();
  var type2 = document.getElementById("type2").innerText.toLowerCase();



  //used if theres only 1 type
  if (pokemonTypes.length == 1){
    if (guessNum.length <2){
      if (answer == pokemonTypes[0]){
        alert("Congrats!!");
        $(".guessDiv").attr('hidden',true);
        $(".typeDiv").attr('hidden',false);
      }
      else{
        alert("Wrong answer !!")
        guessNum.push("x");
        if (guessNum.length == 2){
          $("#guesses").html( "You have " + "<strong>"+ 1 + "</strong>"+ "wrong guess remaining!!!");
        }
        else{
          $("#guesses").html( "You have " + "<strong>" + (3 - guessNum.length) + "</strong>"+ " incorrect guesses");
        }
      }
    }

    else{
      if (answer == pokemonTypes[0]){
        alert("Congrats!!");
        $(".guessDiv").attr('hidden',true);
        $(".typeDiv").attr('hidden',false);
      }
      else{
        alert("You've ran out of guesses.... ");
        alert(name + "s "+ "missing type is " + type1.toUpperCase());
        $(".guessDiv").attr('hidden',true);
        $(".typeDiv").attr('hidden',false);
      }
    }
  }


  //used if there are two tyoes
  else{
    if (guessNum.length<2){


      if (answer == pokemonTypes[0]){
        alert("1 down 1 to go!!");
        correctAns.push("tick");
        $("#num-type").html("Pokemon Types:   " + "<strong>" + correctAns.length + "</strong> out of " + "<strong>" + 2 + "</strong>");
        pokemonTypes.shift();



      }
      else if (answer == pokemonTypes[1]){
        alert("guessed second type correctly")
        pokemonTypes.pop();
        correctAns.push("tick");
        $("#num-type").html("Pokemon Types:   " + "<strong>" + correctAns.length + "</strong> out of " + "<strong>" + 2 + "</strong>");

      }
      else{
        alert("Wrong answer !!")
        guessNum.push("x");
        if (guessNum.length==2){
          $("#guesses").html( "You have " + "<strong>"+ 1 + "</strong>"+ " wrong guess remaining!!!");
        }
        else{
          $("#guesses").html( "You have " + "<strong>" + (3 - guessNum.length) + "</strong>"+ " incorrect guesses");
        }

      }


    }
    else{
      if (answer == pokemonTypes[0]){
        alert("Congrats!!")
        $("#guessDiv").attr('hidden',true);
        $(".typeDiv").attr('hidden',false);
      }
      else{
        alert("You've ran out of guesses.... ");
        if (pokemonTypes.length == 1){
          alert(name + "s "+ "missing type is " + type1.toUpperCase());
          $(".guessDiv").attr('hidden',true);
          $(".typeDiv").attr('hidden',false);
        }
        else{
          alert(name + "s "+ "missing types are " + type1.toUpperCase() + " and " + type2.toUpperCase());
          $(".guessDiv").attr('hidden',true);
          $(".typeDiv").attr('hidden',false);
        }

      }
    }
  }
}
//
// INIT END ------------------------------------------------------------------------

// START GAME FUNCTION GETTING GENERATION CHOICE FROM USER
function startGame() {
  //rearrange page
  pageGame();
  //rearrange page end

  //match gen choice with random ID
  genPicker = prompt("Choose Generation Number Between 1-4");
  if (genPicker == "1") {
    var pokeID = randIdPicker(1);
  } else if (genPicker == "2") {
    var pokeID = randIdPicker(2);
  } else if (genPicker == "3") {
    var pokeID = randIdPicker(3);
  } else if (genPicker == "4") {
    var pokeID = randIdPicker(4);
  } else if (genPicker >= 5 || genPicker <= 1 || isNaN(genPicker)) {
    alert("Choose Between Generations 1, 2, 3 or 4");
    goHome();
  }
  //end..............

  pokeURLCom = pokeURL + pokeID;

  $.getJSON(pokeURLCom, function(data) {

    var pokeName = data.name;
    var pokeID = data.id;
    var pokeType1 = data.types[0].type.name;
    var typeNumber = data.types.length;

    $("#results").html(pokeName + "<p>National_ID:  " + pokeID + "</p>");
    console.log()
    $("#poke-img").attr("src", pokeURL2 + pokeID + ".png");
    $("#num-type").html("Pokemon Types:   " + "<strong>" + correctAns.length + "</strong> out of " + "<strong>" + typeNumber + "</strong>");
    $("#guesses").html( "You have " + "<strong>"+ (3 - guessNum.length) + "</strong>"+ " incorrect guesses");

    console.log(pokeType1);

    function typeNumCheck() {
      if (typeNumber == 1) {
        pokeType2 = "";
        pokemonTypes.push(pokeType1);
        console.log(pokemonTypes);
        $("#type1").html(pokeType1);
        $("#type2").html(pokeType2);

      } else {
        var pokeType2 = data.types[1].type.name;
        pokemonTypes.push(pokeType1,pokeType2);
        console.log(pokemonTypes);
        $("#type1").html(pokeType1);
        $("#type2").html(pokeType2);
      }
    }

    typeNumCheck();

  })
}
// END OF STARTGAME FUNCTION

//random number genrator
function getRandomInt(min, max) {
  result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result
}
//

//INIT GEN TO RANDOM ID from NUM
function randIdPicker(num) {
  if (num == "1") {
    return getRandomInt(1, 151);
  } else if (num == "2") {
    return getRandomInt(152, 251);
  } else if (num == "3") {
    return getRandomInt(252, 386);
  } else if (num == "4") {
    return getRandomInt(387, 493);
  }
}
//


// random GEN PICKER FROM LUCKY
function genPicker(num) {
  if (num == 1) {
    return getRandomInt(1, 151);

  } else if (num == 2) {
    return getRandomInt(152, 251);
  } else if (num == 3) {
    return getRandomInt(252, 386);
  } else if (num == 4) {
    return getRandomInt(387, 493);
  }

}
//rand INT FUNCTION end


// feeling lucky function
function feelingLucky(i) {
  var param = genPicker(i);

  var pokeURLCom = pokeURL + param
  $("#poke-ball").attr('hidden', true);
  $("#poke-img").attr('hidden',false);
  $(".typeDiv").attr('hidden',false);
  $.getJSON(pokeURLCom, function(data) {

    var pokeID = data.id;
    var pokeName = data.name;
    var pokeType1 = data.types[0].type.name;

    $("#poke-img").attr("src", pokeURL2 + pokeID + ".png");


    var typeNum = data.types.length;

    if (typeNum == 1) {
      var pokeType2 = ""


    } else {
      var pokeType2 = data.types[1].type.name;
    }

    $("#results").html(pokeName + "<p>National_ID:  " + pokeID + "</p>");


    $("#type1").html(pokeType1);
    $("#type2").html(pokeType2);
    return pokeName
  });



}
// feeling lucky end


// Recall data from user input pokeID num value. START//
function pokeSubmit() {
  var param = document.getElementById("pokeID").value;
  var pokeURLCom = pokeURL + param
  console.log(pokeURLCom)

  $(".guessDiv").attr('hidden', true);
  $(".typeDiv").attr('hidden', false);
  $("#lucky-div").attr('hidden', false);
  $('#game-div').attr('hidden', true);
  $("#poke-ball").attr('hidden',true);
  $("#poke-img").attr('hidden',false);



  $.getJSON(pokeURLCom, function(data) {

    var pokeID = data.id;
    var pokeName = data.name;
    var pokeType1 = data.types[0].type.name;
    var pokeImg = data.sprites.front_default;

    $("#poke-img").attr("src", pokeURL2 + pokeID + ".png");

    var typeNum = data.types.length;

    if (typeNum == 1) {
      var pokeType2 = ""
      $("#type2").html(pokeType2);


    } else {
      var pokeType2 = data.types[1].type.name;
      $("#type2").html(pokeType2);
    }

    $("#results").html(pokeName);
    $("#results").html(pokeName + "<p>National_ID:  " + pokeID + "</p>");
    $("#type1").html(pokeType1);

  });

};
// END
$(document).on("keypress", "input", function(e){
     if(e.which == 13){
         var inputVal = $(this).val();
         pokeSubmit();
     }
 });

// known bugs
// pokemon 487, 492 has no image
