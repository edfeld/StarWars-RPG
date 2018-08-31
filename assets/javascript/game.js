// Star Wars JavaScript

let starWarsGame = {
    charactersToPick: {
        obiwan: {
            name: "Obi Wan",
            picture: "obi.jpg",
            healthPoints: 10,
            hitPoints: 5,
        },
        darthmaul: {
            name: "Darth Maul",
            picture: "darthmaul.jpg",
            healthPoints: 10,
            hitPoints: 5,
        },
        lukeskywalker: {
            name: "Luke Skywalker",
            picture: "luke.jpg",
            healthPoints: 10,
            hitPoints: 5,
        },
        darthsideous: {
            name: "Darth Sidious",
            picture: "darthsidious.jpg",
            healthPoints: 10,
            hitPoints: 5,
        },

      },
      isGameStart: false,
      arrSideline: [],


      setUpGame: function () {
            
            //  Load characters to the sideline array
            var sidelineObjKeys = Object.keys(this.charactersToPick);
            console.log(sidelineObjKeys[0]);

            console.log(this.charactersToPick[sidelineObjKeys[0]].name);
            $("#sideline").empty();
             //  Load characters to the sideline with JQuery
            sidelineObjKeys.forEach(element => {
                var character = $("<div>");
                character.addClass("character bg-light float-left");
                character.text(this.charactersToPick[element].name);
                character.attr("characterID", element);
                $("#sideline").append(character);
                
            });

      },

      choseHero: function () {
        console.log("chose Hero");
      }
      
};

if (!starWarsGame.isGameStart) {
    starWarsGame.setUpGame();
}

/* Move a selected Foe to the defender div*/
$("#enemy > .character").on("click", function () {
    console.log("character click", this);
    var theCharacter = $(this).clone();
    console.log("theCharacter", theCharacter);
    console.log("First Child", $("#enemy > .character"));
    /* Test for existing Defender before appending to Defender Div*/
    if ($("#defender > .character").text() == "") {
        $("#defender").append(theCharacter);
        this.remove();
    }
});

$("#sideline > .character").on("click", function () {
    // var theCharacter = $("<div>";)
    // theCharacter.addClass("character bg-light float-left");
    // theCharacter.text(($this).text());
    // theCharacter.attr();
    console.log("character click", this);

    var theCharacter = $(this).clone();
    console.log("theCharacter", theCharacter);
    console.log("First Child", $("#hero > .character"));
    if ($("#hero > .character").text() == "") {
        $("#hero").append(theCharacter);
        this.remove();
        /* move remaining characters to Enemy Div */
        $("#sideline > .character").each( function( index ) {
            $("#enemy").append($(this).clone());
            this.remove();
        });
    }
});

