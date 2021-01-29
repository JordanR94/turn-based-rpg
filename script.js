
//calls function to hide elements immediatly
hideActions("actions");


//setting up base variables 
var charName = "Traveller";
var charHealth;
var charAttack;
var charMagic;
var charMana;
var bossHealth = 350;
var bossAttack = 25;
var potion = 35;
var potionUses = 3;
var battleLog = ["Welcome " + charName + "<br> Chose your weapon!"];

function hideActions(actions){
    var actions = document.getElementsByClassName("actions");
    for(let i = 0; i < actions.length; i++){
    actions[i].style.display = 'none';
}
    document.querySelector("#battleScene").style.display = "none";
}

function showActions(actions, stance){
    var actions = document.getElementsByClassName("actions");
    for(let i = 0; i < actions.length; i++){
    actions[i].style.display = 'inline';
    console.log("class test");
}
    document.querySelector("#battleScene").style.display = "grid";
    document.querySelector("#player").src = stance;
    document.querySelector("#beast").src = "images/beast.png";
}
//reset the game
document.querySelector("#reset").addEventListener('click', function(){
    location.reload();
});

//battle log for when the player interacts with the game
function battleLogLoop(){
    var logText = "";
    for(let i = 0; i < battleLog.length; i++){
        logText = battleLog[i] + "<br>";
    }
    document.querySelector("#battleLog p").innerHTML = logText;
    
}

//hides the buttons for weapons when the user choses one
function hideWeapons(){
    document.querySelector("#sword").style.display = "none";
    document.querySelector("#bow").style.display = "none";
    document.querySelector("#staff").style.display = "none";
}

//calling the battle log at the beginning to welcome the player
battleLogLoop();

// each function "sword", "bow", or "staff" will call the function "battle" and pass in the arguments

//function to activate the sword stats
function sword(){
    charHealth = 300;
    charAttack = 35;
    charMagic = 15;
    charMana = 100;
    weapon = "You sliced with your Sword!";
    staleMate = "Your weapons clashed together!";
    weaponStance = "images/sword_stance.png"
    battleAttack = "images/sword_slash.png";
    battlePotion = "images/sword_potion.png";
    battleMagic = "images/sword_magic.png";
    battleDeath = "images/sword_dead.png";
    battleLog.push("You chose the Sword!");
    battleLogLoop();
    showActions("actions", weaponStance);
    battle(weapon, staleMate, weaponStance, battleAttack, battlePotion, battleMagic, battleDeath);
}
//function to activate the bow stats
function bow(){
    charHealth = 250;
    charAttack = 25;
    charMagic = 25;
    charMana = 115;
    weapon = "You shot your Bow!";
    staleMate = "The beast parrys your arrow!";
    weaponStance = "images/bow_stance.png"
    battleAttack = "images/bow_fire.png";
    battlePotion = "images/bow_potion.png";
    battleMagic = "images/bow_magic.png";
    battleDeath = "images/bow_dead.png";
    battleLog.push("You chose the Bow!");
    battleLogLoop();
    showActions("actions", weaponStance);
    battle(weapon, staleMate, weaponStance, battleAttack, battlePotion, battleMagic, battleDeath);
}
//function to activate the staff stats
function staff(){
    charHealth = 350;
    charAttack = 15;
    charMagic = 30;
    charMana = 130;
    weapon = "You swung your Staff!";
    staleMate = "The beast dodges your staff!";
    weaponStance = "images/staff_stance.png"
    battleAttack = "images/staff_swing.png";
    battlePotion = "images/staff_potion.png";
    battleMagic = "images/staff_magic.png";
    battleDeath = "images/staff_dead.png";
    battleLog.push("You chose the Staff!");
    battleLogLoop();
    showActions("actions", weaponStance);
    battle(weapon, staleMate, weaponStance, battleAttack, battlePotion, battleMagic, battleDeath);
}
//button to call the sword function
document.querySelector("#sword").addEventListener('click', function(){
    sword();
    hideWeapons();
});
//button to call the bow function
document.querySelector("#bow").addEventListener('click', function(){
    bow();
    hideWeapons();
});
//button to call the staff function
document.querySelector("#staff").addEventListener('click', function(){
    staff();
    hideWeapons();
});

//function for the battle
function battle(weapon, staleMate, weaponStance, battleAttack, battlePotion, battleMagic, battleDeath){

    //sets the max health for the weapon the user has chosen
    var maxHealth = charHealth;
 
    console.log(charHealth, charAttack, bossAttack, bossHealth);
    document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
    document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
    document.querySelector("#bossHealthCol").style.color = "green";
    document.querySelector("#healthColour").style.color = "green";
    document.querySelector("#playerMana").innerHTML = "Mana: <strong id='manaBar'>" + charMana + "</strong>";
    document.querySelector("#manaBar").style.color = "blue";

    document.querySelector("#potion").addEventListener('click', function(){
       
        if(charHealth == maxHealth){
            battleLog.push("You are at max health");
            console.log("MAX HEALTH");
            battleLogLoop();
        }
        else{
            usePotion();
        }
});

function usePotion(){


    var bossAttChance = Math.floor(Math.random() * 3); //calculates bosses critical hits
    //sets the players image to an attacking image and changes its width
    document.querySelector("#player").src = battlePotion;
    //makes all action commands unavailable 
    document.querySelector("#attack").disabled = true;
    document.querySelector("#magic").disabled = true;
    document.querySelector("#potion").disabled = true;
    
        //determines how many potions are left
        //if zero then player unable to use potion but still cant attack or be hit 
        if(potionUses == 0){
            battleLog.push("You have no potions left!");
            console.log("NO POTIONS LEFT");
            document.querySelector("#potion").disabled = true;
            }else if(potionUses > 0 && bossAttChance == 0){
                potionUses--;
                battleLog.push("You used a potion! You regained " + potion + "HP! <br> You have " + potionUses +" Left" + "<br>Boss Missed!");
                console.log("MORE THAN 0 POTIONS PLUS BOSS MISS")
                charHealth = charHealth + potion;
                if(charHealth > maxHealth){
                    var healthDiff = charHealth - maxHealth;
                    var newPotionAmount = potion - healthDiff;
                    battleLog.push("You used a potion! You regained " + newPotionAmount + "HP!<br>You have " + potionUses +" Left<br>Boss Missed!");
                    console.log("MORE THAN 0 POTIONS PLUS BOSS HIT AND CHAR HEALTH WAS MORE THAN MAX HEALTH")
                    charHealth = charHealth - healthDiff;
                }
            }
            else if(charHealth + potion > maxHealth){
            healthDiff = maxHealth - charHealth;
            charHealth = maxHealth;
            potionUses--;
            console.log("CHAR HEALTH PLUS POTION IS MORE THAN MAX HEALTH")
            if(bossAttChance > 0){
                bossAttChance = bossAttChance + bossAttack;
                battleLog.push("You used a potion! You regained " + healthDiff + "HP!<br>You have " + potionUses +" Left<br>Boss hit you " + bossAttChance + "!");
                charHealth = charHealth - bossAttChance;
                console.log("CHAR HEALTH PLUS POTION IS MORE THAN MAX HEALTH AND BOSS HIT")
            }else{
                battleLog.push("You used a potion! You regained " + healthDiff + "HP!<br>You have " + potionUses +"  Left<br>Boss Missed!");
                console.log("CHAR HEALTH PLUS POTION IS MORE THAN MAX HEALTH AND BOSS MISS")
            }   
            }else{
                potionUses--
                bossAttChance = bossAttChance + bossAttack;
                battleLog.push("You used a potion! You regained " + potion + "HP! <br> You have " + potionUses +" Left<br>Boss hit you " + bossAttChance + "!");
                charHealth = charHealth + potion - bossAttChance;
                console.log("HEALTH PLUS POTION LESS THAN MAX PLUS BOSS HIT");
            }
           
        healthBars();
        battleLogLoop();
        setTimeout(function(){ 
            document.querySelector("#player").src = weaponStance;
            document.querySelector("#attack").disabled = false;
            document.querySelector("#magic").disabled = false;
            document.querySelector("#potion").disabled = false;
           }, 1000);
}


function healthBars(){
    //adds colours green, orange or red depending on the user and bosses health
        if(charHealth >= 50 && charHealth <= 100){
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "orange";
        }else if(charHealth >= 0 && charHealth < 50){
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "red";
        }else if(charHealth < 0){
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "red";
            document.querySelector("#attack").style.display = "none";
        }else{
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "green";
        };
    
        if(bossHealth >= 50 && bossHealth <= 100){
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#bossHealthCol").style.color = "orange";
        }else if(bossHealth >= 0 && bossHealth < 50){
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#bossHealthCol").style.color = "red";
        }else if(bossHealth < 0){
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#bossHealthCol").style.color = "red";
            document.querySelector("#attack").style.display = "none";
        }else{
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#bossHealthCol").style.color = "green";
        }

        console.log(charHealth, bossHealth);
        //if boss or characters health reach below zero then user updated with "Win" or "Lose" text
        var victoryMusic = document.querySelector("#victoryMusic");
        function playAudio() { 
            victoryMusic.play(); 
          } 

        if(bossHealth <= 0 && charHealth > 0){
            bossHealth = 0;
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#bossHealthCol").style.color = "red";
            document.querySelector("#battleLog p").style.display = "none";
            document.querySelector("#beast").src = "images/dead_beast.png";
            playAudio();
            document.querySelector("#result").innerHTML = "VICTORY!";
            document.querySelector("#attack").style.display = "none";
            document.querySelector("#magic").style.display = "none";
            document.querySelector("#potion").style.display = "none";
        }else if(charHealth <= 0 && bossHealth > 0){
            charHealth = 0;
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "red";
            document.querySelector("#battleLog p").style.display = "none";
            document.querySelector("#player").src = battleDeath;
            document.querySelector("#result").innerHTML = "DEFEATED!";
            document.querySelector("#attack").style.display = "none";
            document.querySelector("#magic").style.display = "none";
            document.querySelector("#potion").style.display = "none";
        }else if(charHealth <= 0 && bossHealth <= 0){
            charHealth = 0;
            bossHealth = 0;
            document.querySelector("#bossHealth").innerHTML = "Boss Health: <strong id='bossHealthCol'>" + bossHealth + "</strong>";
            document.querySelector("#playerHealth").innerHTML = "Health: <strong id='healthColour'>" + charHealth + "</strong>";
            document.querySelector("#healthColour").style.color = "red";
            document.querySelector("#bossHealthCol").style.color = "red";
            document.querySelector("#battleLog p").style.display = "none";
            document.querySelector("#player").src = battleDeath;
            document.querySelector("#beast").src = "images/dead_beast.png";
            document.querySelector("#result").innerHTML = "DRAW!";
            document.querySelector("#attack").style.display = "none";
            document.querySelector("#magic").style.display = "none";
            document.querySelector("#potion").style.display = "none";
        }

        if(charMana <= 0){
            charMana = 0;
            document.querySelector("#playerMana").innerHTML = "Mana: <strong id='manaBar'>" + charMana + "</strong>";
            document.querySelector("#manaBar").style.color = "red";
        }else{
            document.querySelector("#playerMana").innerHTML = "Mana: <strong id='manaBar'>" + charMana + "</strong>";
            document.querySelector("#manaBar").style.color = "blue";
        }
    }   

    //click event for attacking the boss
    document.querySelector("#attack").addEventListener('click', function(){

        //sets the players image to an attacking image and changes its width
        document.querySelector("#player").src = battleAttack;
        //makes all action commands unavailable 
        document.querySelector("#attack").disabled = true;
        document.querySelector("#magic").disabled = true;
        document.querySelector("#potion").disabled = true;

        var attackChance = Math.floor(Math.random() * 5); //calculates critical hits
        var bossAttChance = Math.floor(Math.random() * 5); //calculates bosses critical hits
        //below is the speed calculation to see who takes the turn first
        var charSpeed = Math.floor(Math.random() * 5); //calculates the speed of the player
        var bossSpeed = Math.floor(Math.random() * 5); // calculates the speed of the boss

        //calculates new health and battle log depending on the player and bosses critical hit/speed
        if(attackChance == 0 && bossAttChance > 0){
            bossAttChance = bossAttChance + bossAttack; 
            charHealth = charHealth - bossAttChance;
            battleLog.push(weapon + "<br>You Missed!<br>" + "Boss hit you " + bossAttChance + "!");
            battleLogLoop();
        }
        else if(bossAttChance == 0 && attackChance > 0){
            attackChance = attackChance + charAttack; 
            bossHealth = bossHealth - attackChance;
            battleLog.push(weapon + "<br>You hit " + attackChance + "!" + "<br>Boss Missed!");
            battleLogLoop();
        }
        else if(bossAttChance == 0 && attackChance == 0){
            battleLog.push(weapon + "<br> You both missed!");
            battleLogLoop();
        }
        else{
            attackChance = attackChance + charAttack; // adds critical hits on to base attack value
            bossAttChance = bossAttChance + bossAttack; // adds critical hits on to bosses attack value
            if(charSpeed > bossSpeed){
                charHealth = charHealth - bossAttChance; //takes the total attack damage away from characters health
                bossHealth = bossHealth - attackChance; //takes the total attack damage away from bosses health
                battleLog.push(weapon + "<br>You Hit " + attackChance + "!" + "<br>Boss hit you " + bossAttChance + "!");
                battleLogLoop();
            }else if(charSpeed < bossSpeed){
                bossHealth = bossHealth - attackChance; //takes the total attack damage away from bosses health
                charHealth = charHealth - bossAttChance; //takes the total attack damage away from characters health
                battleLog.push("Boss hit you " + bossAttChance + "!<br>" + weapon + "<br>You Hit " + attackChance + "!");
                battleLogLoop();
            }else{
                //do while loop makes sure that someone has to be faster to hit first
                do{
                    charSpeed = Math.floor(Math.random() * 5);
                    bossSpeed = Math.floor(Math.random() * 5);
                    battleLog.push(weapon + "<br>" + staleMate);
                    battleLogLoop();
                }while(charSpeed == bossSpeed); 
            }
        }
        //calls the health bars after to make sure the number doesnt show below zero
      healthBars();
      //calls battlelog to make sure it is updated
      battleLogLoop();

      //delays the time by 1 second to make sure the user can see they are attacking
      setTimeout(function(){ 
        if(charHealth > 0){
            document.querySelector("#player").src = weaponStance;
        }else{
            document.querySelector("#player").src = battleDeath;
        }
        document.querySelector("#attack").disabled = false;
        document.querySelector("#magic").disabled = false;
        document.querySelector("#potion").disabled = false;
       }, 1000);

    });

    

    document.querySelector("#magic").addEventListener('click', function(){

         //sets the players image to an attacking image and changes its width
         document.querySelector("#player").src = battleMagic;
         //makes all action commands unavailable 
         document.querySelector("#attack").disabled = true;
         document.querySelector("#magic").disabled = true;
         document.querySelector("#potion").disabled = true;

         var attackChance = Math.floor(Math.random() * 5); //calculates critical hits
         var bossAttChance = Math.floor(Math.random() * 5); //calculates bosses critical hits

         //below is the speed calculation to see who takes the turn first
         var charSpeed = Math.floor(Math.random() * 5); //calculates the speed of the player
         var bossSpeed = Math.floor(Math.random() * 5); // calculates the speed of the boss

         //makes sure the player has enough mana to continue with magic attacks
         //if no mana left then the user will need to pick another option
         if(charMana <= 0){
            document.querySelector("#player").src = weaponStance;
            battleLog.push("You have ran out of Mana!");
            document.querySelector("#magic").disabled = true;
            battleLogLoop();
         }else{
            if(attackChance == 0 && bossAttChance > 0){
                charMana = charMana - 15;
                bossAttChance = bossAttChance + bossAttack; 
                charHealth = charHealth - bossAttChance;
                battleLog.push("You cast a spell!" + "<br>You Missed!" + "<br>Boss hit you " + bossAttChance + "!");
                battleLogLoop();
            }
            else if(bossAttChance == 0 && attackChance > 0){
                charMana = charMana - 15;
                attackChance = attackChance + charMagic; 
                bossHealth = bossHealth - attackChance;
                battleLog.push("You cast a spell!" + "<br>You Hit " + attackChance + "!" + "<br>Boss Missed!");
                battleLogLoop();
            }
            else if(bossAttChance == 0 && attackChance == 0){
                charMana = charMana - 15;
                battleLog.push("You cast a spell!" + "<br>You both missed!");
                battleLogLoop();
            }
            else{
                attackChance = attackChance + charMagic; // adds critical hits on to base attack value
                bossAttChance = bossAttChance + bossAttack; // adds critical hits on to bosses attack value
                if(charSpeed > bossSpeed){
                    charHealth = charHealth - bossAttChance; //takes the total attack damage away from characters health
                    bossHealth = bossHealth - attackChance; //takes the total attack damage away from bosses health
                    charMana = charMana - 15;
                    battleLog.push("You cast a spell!" + "<br>You Hit " + attackChance + "!" + "<br>Boss hit you " + bossAttChance + "!");
                    battleLogLoop();
                }else if(charSpeed < bossSpeed){
                    bossHealth = bossHealth - attackChance; //takes the total attack damage away from bosses health
                    charHealth = charHealth - bossAttChance; //takes the total attack damage away from characters health
                    charMana = charMana - 15;
                    battleLog.push("Boss hit you " + bossAttChance + "!" + "<br>You cast a spell!" + "<br>You Hit " + attackChance + "!");
                    battleLogLoop();
                }else{
                    do{
                        charSpeed = Math.floor(Math.random() * 5);
                        bossSpeed = Math.floor(Math.random() * 5);
                        charMana = charMana - 15;
                        battleLog.push("You cast a spell!" + "<br>The beast deflects it!");
                        battleLogLoop();
                    }while(charSpeed == bossSpeed); 
            }
         }
    }
       healthBars();      
       battleLogLoop();

        setTimeout(function(){ 
            if(charHealth > 0){
                document.querySelector("#player").src = weaponStance;
            }else{
                document.querySelector("#player").src = battleDeath;
            }
            document.querySelector("#attack").disabled = false;
            document.querySelector("#magic").disabled = false;
            document.querySelector("#potion").disabled = false;
           }, 1000);
      
    });

    
}

