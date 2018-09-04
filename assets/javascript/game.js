// Star Wars JavaScript
$(document).ready(function() {

    let starWarsGame = {
        charactersToPick: {
            obiwan: {
                name: "Obi Wan",
                picture: "obiwan.jpg",
                healthPoints: 60,
                hitPoints: 3,
                counterAttackPoints: 5,
            },
            darthmaul: {
                name: "Darth Maul",
                picture: "darthmaul.jpg",
                healthPoints: 20,
                hitPoints: 5,
                counterAttackPoints: 5,
            },
            lukeskywalker: {
                name: "Luke Skywalker",
                picture: "luke.jpg",
                healthPoints: 10,
                hitPoints: 5,
                counterAttackPoints: 10,
            },
            darthsideous: {
                name: "Darth Sidious",
                picture: "darthsidious.jpg",
                healthPoints: 30,
                hitPoints: 5,
                counterAttackPoints: 12,
            },

        },
        isGameStart: false,

        setUpGame: function () {
                // empty Divs
                $("#hero").empty();
                $("#enemy").empty();
                $("#defender").empty();
                //  Load characters to the sideline array
                var sidelineObjKeys = Object.keys(this.charactersToPick);
                console.log(sidelineObjKeys[0]);
                console.log(this.charactersToPick[sidelineObjKeys[0]].name);
                $("#sideline").empty();
                //  Load characters to the sideline with JQuery
                sidelineObjKeys.forEach(element => {
                    $("#sideline").append(this.buildCharacter(element));
                });
        },

        buildCharacter: function (objKey) {
            console.log("User chose a Hero");

            var characterDiv = $("<div>");
            characterDiv.addClass("character bg-light float-left text-center border border-secondary");
            characterDiv.attr("characterID", objKey.toString());
            var charNameDiv = $("<div>");
            charNameDiv.addClass("text-center");
            charNameDiv.text(this.charactersToPick[objKey].name);
            characterDiv.append(charNameDiv);
            var charImage = $("<img>");
            // charImage.addClass("px-auto");
            charImage.attr({"src": "assets/images/" + this.charactersToPick[objKey].picture, "alt": "picture of " + this.charactersToPick[objKey].name, "height": "100px" });
            characterDiv.append(charImage);
            var characterHPDiv = $("<div>");
            characterHPDiv.addClass("healthPoints text-center");
            characterHPDiv.text(this.charactersToPick[objKey].healthPoints);
            characterDiv.append(characterHPDiv);

            return characterDiv;

            // let characterHTML = "<div class='character bg-light float-left text-center' characterID='<characterID>'><div class='text-center'><name></div><img class='px-auto' src='assets/images/<imgName>.jpg' alt='character picture' height='100px'><div class='healthPoints text-center'>50</div></div>";

        },

        isEnemies: function () {
            var enemy = $("#enemy > .character")
            if (enemy.length > 0) {
                return true;
            } else {
                return false;
            }
        },

        isAlive ( character ) {
            // var hero = $("#hero > .character");
            var healthPoints;
            var charName
            if((character !== "") && (character !== null)) { 
                if( character.length) {
                    charName = this.charactersToPick[character.attr("characterid")].name;
                    healthPoints = this.charactersToPick[character.attr("characterid")].healthPoints;
                    if (healthPoints > 0) {
                        console.log("64. character is alive!!", charName);
                        return true;
                    }
                }
            }
            console.log("102. character is dead!!:", character);
            return false;
        },

        decrementHeroHP ( hero, defender ) {
            var heroID = hero.attr("characterid");
            var defenderID = defender.attr("characterid");
            this.charactersToPick[heroID].healthPoints -= this.charactersToPick[defenderID].counterAttackPoints;
            /* Update Hero HP in browser */
            $("#hero .healthPoints").text(this.charactersToPick[heroID].healthPoints);
            
            
        },

        /* ATTACK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        attack: function() {
            var hero;
            var defender;
            var heroHealthPoints = 0;
            var heroHitPoints = 0;
            var defenderHealthPoints = 0;
            var defenderCounterPoints = 0; 
            var gameResponse = "";
            var gameResponseTwo = "";
            // var HeroObjKeys = Object.keys(this.charactersToPick);
            var heroID;
            var defenderID
            console.log("65 Hero length ", $("#hero > .character").length);
            
            hero = $("#hero > .character");
            if( hero.length ) {
                console.log("66 characterId: ", $("#hero > .character").attr("characterID"));
                heroID = hero.attr("characterID");
                heroHealthPoints = this.charactersToPick[heroID].healthPoints;
                heroHitPoints = this.charactersToPick[heroID].hitPoints;
                console.log("72 Hero Health: ", heroHealthPoints);
                console.log("73 Hero Hit Points; ", heroHitPoints);
            }
            defender = $("#defender > .character");

            if( defender.length ) {
                console.log("77 characterId: ", $("#defender > .character").attr("characterID"));
                defenderID = defender.attr("characterID");
                defenderHealthPoints = this.charactersToPick[defenderID].healthPoints;
                defenderCounterPoints = this.charactersToPick[defenderID].hitPoints;
                console.log("72 defender Health: ", defenderHealthPoints);
                console.log("73 defender Counter Attack Points; ", defenderCounterPoints);
            }

                /* if heroIsAlive && defenderIsAlive { */
            if ((this.isAlive(hero)) && (this.isAlive(defender))) {
                /* Hero attacks */
                console.log("147 Hero attacks!");
                /* GameResponse Output - Hero attacks with hit points */
                gameResponse = "Hero attacks with " + heroHitPoints + " hit points. "
                // $(".gameResponse").text("Hero attacks with " + heroHitPoints + " hit points.");
                // $(".gameResponseTwo").text(" ");
                /* decrement DefenderHP */
                this.charactersToPick[defender.attr("characterid")].healthPoints = defenderHealthPoints - heroHitPoints; 
                /* Power up Hero Hit points*/           
                this.charactersToPick[heroID].hitPoints += this.charactersToPick[heroID].hitPoints;
                console.log("168. Hero hit points bumped to ", this.charactersToPick[heroID].hitPoints);
                /*display DefenderHP to console.log */
                console.log("108. Defender HP: ", this.charactersToPick[defender.attr("characterid")].healthPoints);
                /* Update Defender div with new HP value */
                $("#defender .healthPoints").text(this.charactersToPick[defender.attr("characterid")].healthPoints);

                if(this.isAlive(defender)) {
                    $(".gameResponse").text(gameResponse);
                } else {
                    /* Update Defender HealthPoints even though dead */
                    // $("#defender .healthPoints").text(this.charactersToPick[defender.attr("characterid")].healthPoints);
                    $("#defender").fadeTo( "slow", 0.33 );
                    var delayButtonAlert = setTimeout(function() {
                        $("#defender > .character").remove();
                    }, 3000);
                    
                    if(this.isEnemies()) {
                        $(".gameResponse").text(gameResponse + " - Defender is Dead!! Chose a new defender");
                    } else {
                        $(".gameResponse").text(gameResponse + " - Defender is Dead!! Game over.  All Enemies defeated!!");
                        $("#attack").attr("disabled"); // disable the attack button
                    }

                }

                /* Defender attacks */
                // log defender attacks
                console.log("194. Defender  counterattacks with " + defenderCounterPoints + " hit points!");
                // Decrement Hero Health Points
                this.decrementHeroHP( hero, defender );
                // set game status
                gameResponseTwo = "Defender counterattacks with " + this.charactersToPick[defender.attr("characterid")].counterAttackPoints + " counter attack points."
            
                if (this.isAlive(hero)) {
                    // if hero is alive post defender attack status: 
                    $(".gameResponseTwo").text(gameResponseTwo);
                } else {
                    // disable attack button
                    $("#attack").attr("disabled", " ");
                    // fade hero
                    $("#hero").fadeTo( "slow", 0.33 );
                    // post game status for Defender attack
                    $(".gameResponseTwo").text(gameResponseTwo + " - Hero is Dead!! Play again?");
                    $("#attack").attr("disabled");
                }
            }
        } //attack method

    };

    if (!starWarsGame.isGameStart) {
        starWarsGame.setUpGame();
    }

    $(".character").on("click", function(){
        console.log("we have an enemy click:", this);
    });

    /* Move the selected Hero to the Hero div and move the rest of the characters
    to the enemy div */
    $("#sideline > .character").on("click", function () {

        // console.log("character click", this);
        // clone the character
        var theCharacter = $(this).clone();
        // log the character
        console.log("theCharacter", theCharacter);
        console.log("First Child", $("#hero > .character"));
        // if no character is loaded to hero append the character selected.  Remove it from the sideline
        if ($("#hero > .character").text() == "") {
            $("#hero").append(theCharacter);
            this.remove();
            /* move remaining characters to Enemy Div */
            $("#sideline > .character").each( function( index ) {
                console.log("97 this text: ", $(this).text());

                var theEnemy = $(this).clone();
                theEnemy.on("click", function(){
                   console.log("109 click this enemy: ", this);
                   console.log("110 isDefenderExist: ", $("#defender > .character"));
                   if($("#defender > .character").text() == ""){
                        $("#defender").fadeTo( "fast", 1.0); // Undo Fadeto()
                        $("#defender").append($(this).clone());
                        $(this).remove();
                    }
                });
                $("#enemy").append(theEnemy);
                this.remove();
                $("#sidelineHeader").text(""); // clear sideline text
            });

        }
    });

    /* Move a selected Foe to the defender div */
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

    $("#hero").on("click", function (){
        console.log("117 Hero context click");
    });

    $("button#attack").on("click", function (){
        console.log("165 attack button clicked");
        starWarsGame.attack();
    });

    $("#restart").on("click", function(){
        location.reload();
    });

});