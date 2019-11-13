/# zombie-smash
IMPORTANT: If you don't open this as an actual text file, the tables will be unreadable. Hit Open Raw or Edit on github to see this file as intended.

Day 1:	Create the player character (PC) represented by the given sprite, which can move and rotate.
Day 2:	Make sure the PC has a DNA counter, as well as his 4 stats, 3 weapon slots, and an indicator of which weapon is currently being used. Make sure that a button can change with weapon is being indicated.
Day 3:	Write the code for the weapons, which each have a class, a cooldown, a clip size, an ammo owned, an ammo left in clip, and a formula for their damage.
Day 4:	Catch up on the first 3 days. Display the player's HP, DNAcount, ammo left in clip, and ammo owned on screen, as well as the picture of the current weapon. (see concept sketch).
Day 5: 	Create a level variable and set it at 1 for now. Create the zombieArray, add zombies as specified on line 30 randomly over time as specified on line 97.
Day 6:	Continue yesterday's work. Now make the zombies move towards the player. Write an attack() function which uses the PC's currently indicated weapon and performs its attack so long as the weapon isn't on cooldown and has ammo left in its clip. Decrement the health of any zombies hit by the appropriate amount.
Day 7:	Give each weapon ammo. Have weapons not fire if they have no ammo left in clip. Create a reload key (r) that refills the clip and takes the weapon's appropriate amount of time to reload.
Day 8:	Make the zombies hurt the player if they are touching him (and not on cooldown). Have being hit by a weapon knock a zombie back by that weapon's knockback worth of distance.
Day 9:	Make sure that players die when their health is zero. When a zombie dies, make it have a Luck% chance to drop DNA at the location where it died (note that there are currently 2 different places in the code where it checks if a zombie has died. One in handleZombieAnimation and one in handleBulletAnimation). Make sure that when a player walks over a DNA, it disappears and his DNA count is incremented.
Day 10: Once all zombies are dead or the player is dead, end the level. If the player is dead, the game ends. Else, if all the zombies are dead, it's time for THE SHOP.
Day 11: Continue writing the shop, as described on line 36. Make sure a player can choose which weapons they bring with them into combat (if they have more than 3)
Day 12: When the player clicks a button to leave the shop, increment the level count and put the player back on screen to kill some more zombies.
Day 13(optional): Code in the Head Honcho as described on line 97.
Day 14(optional): Finish up with all the other stuff.  Get sounds to play when weapons are used, when zombies or players are damaged, when you win, when you lose, when you buy an upgrade, and so on. All sounds that should be implemented are in the Sounds file.
Day 15(optional): Add achievements that appear on screen when they are achieved, as described on line 99. Add the achievement sound.  




Design a game project, working title Zombie Smash.
In this game, you are an expert zombie hunter who is killing vast numbers of zombies. There will be several levels where wave after wave of zombies appear around you. The game has a top-down view with WASD controls to move, Q and E to rotate, and the spacebar to attack. The game can be played as multiplayer, in which case a second character will be on screen. The screen will not be split. The second character uses arrowkey controls to move, , and . to rotate, and option or COMMAND to attack. If players are playing multiplayer, spawn twice as many zombies per level and average the luck stats of the two players to determine the drop rate. If a player dies, they cannot play for the rest of the level. If all players die, the players lose the game. If there are two players, they CAN damage each other. The game should have all its essential data saved in a cookie so you can pick up where you left off if you close your browser.

Killing zombies has a chance to drop DNA. In between levels, there will be an upgrade screen in which various character traits can be upgraded by doing research spending zombie DNA. The traits are as follows: Strength (defines a damage multiplier, starts at 1. DEFINE A METER AS THE DISTANCE IT TAKES A CHARACTER WITH SPEED 1 CAN MOVE IN 1 SECOND), Speed(defines a move speed, starts at 1), HP (defines how many times you can be hit, starts at 100), and Luck (%chance for zombies drop DNA, starts at 10). A character also has a weapon. A weapon determines how much damage a character does. A character’s starting weapon is a club  (melee) , which deals 20*STR damage in a cone in front of player with radius 1 and angle 90°, knocks back all zombies hit,  and has a 1 second cooldown. Character has 3 weapon slots. They can cycle through them by pressing TAB. Player 2 can cycle between their weapons by pressing ENTER. The player’s current weapon, the amount of ammo it has, the amount of clips they have for it, their HP, and the amount of DNA they have should be displayed in the corner of the screen. A weapon which does not require ammo is assumed to have infinite ammo.



Zombies:
The zombies each have 100+2*level HP. When a zombie is hit, it is VeRy important to the fun of the game that they make an incredibly satisfying crunching sound, especially when they die. Preferably, they would also spray blood particles everywhere. Their weapon is their hands, which deals 20+1*level damage to a character upon hitting and has a 2 second cooldown. They have a speed of .25. Zombies will try to walk in the straightest path towards the player at all times. Zombies and characters cannot occupy the same space; if they attempt to move into a space occupied by a character, they don't.




Research/shop screen:
Player 1's research screen will be displayed first. When they click done, Player 2's will be displayed, if there is a player 2. The research shop is navigated by mouse.
Research must be purchased sequentially. Only the next upgrade need be displayed on the screen.
The research screen will have the following upgrades:

Name                              Effect                     Cost
Strength Level 2                  Strength x1.05             2
Strength Level 3                  Strength x1.05             3
Strength Level 4                  Strength x1.1              5
Strength Level 5                  Strength x1.1              8
Strength Level 6                  Strength x1.25             10
Strength Level 7                  Strength x1.5              20


Name                           Effect                  Cost
Speed Level 2                  Speed x1.05             2
Speed Level 3                  Speed x1.05             3
Speed Level 4                  Speed x1.1              5
Speed Level 5                  Speed x1.1              8
Speed Level 6                  Speed x1.25             10
Speed Level 7                  Speed x1.5              20


Name                        Effect                   Cost
HP Level 2                  HP 110                   2
HP Level 3                  HP 120                   3
HP Level 4                  HP 140                   5
HP Level 5                  HP 200                   8
HP Level 6                  HP 250                   10
HP Level 7                  HP 400                   20

Name                        Effect                      Cost
Luck Level 2                  Luck 11                   2
Luck Level 3                  Luck 12                   3
Luck Level 4                  Luck 15                   5
Luck Level 5                  Luck 20                   8
Luck Level 6                  Luck 30                   10
Luck Level 7                  Luck 50                   20




The player can also buy better weapons with DNA. All weapons must be available on screen in the research shop. The player can choose any (up to) 3 weapons they own to take into each level. If a player attempts to reload a weapon which needs ammo, and they own no ammo, they cannot reload it. The weapons are as follows:

Katana: (melee) Deals 25*STR in a cone in front of player with radius 1 and angle 100° square in front of character, has .7sec cooldown. Smaller knockback than club. Costs 3DNA.

Handgun: (ranged) Deals 35*sqrt(STR) when a bullet hits. When a bullet hits a zombie, it disappears. The bullet travels in a straight line at a speed of 10. Cooldown .5sec. No knockback. Clip size is 10. Pressing R causes a reload that takes 2 seconds. Costs 10DNA. Clips of ammo cost 1DNA.

Flamethrower: (melee) Deals 30*sqrt(STR)  per second in a cone in front of player with radius 1 and angle 45°. Cooldown 1/60 second. No knockback. Clip size is 500. Pressing R causes a reload that takes 2 seconds. Costs 20DNA. Clips of ammo cost 2DNA.

Semiautomatic: (ranged) Deals 20*sqrt(STR) when a bullet hits. When a bullet hits a zombie, it disappears. The bullet travels in a straight line at a speed of 10. Cooldown 0.1sec. No knockback. Clip size is 100. Pressing R causes a reload that takes 2 seconds. Costs 25 DNA. Clips of ammo cost 1DNA.

Sniper: (ranged) Deals 100*sqrt(STR) when a bullet hits. When a bullet hits a zombie, it DOES NOT DISAPPEAR. The bullet travels in a straight line at a speed of 20. Cooldown 1sec. Huge knockback. Clip size is 5. Pressing R causes a reload that takes 1 seconds. Costs 25 DNA. Clips of ammo cost 1DNA.

Excalibur:  (melee) Deals 100*STR^2 in a cone in front of player with radius 1 and angle 135°. Has .5sec cooldown. Costs 100DNA.






Levels: Each level should have between (20+5*level and  30+5*level) zombies that spawn randomly on the map at random times over the course of 2 minutes. There can be endless levels. A level ends when either all zombies or all players are dead. Starting at Level 21, there is a (-1000/(x-11)+100)% chance that the HEAD HONCHO will spawn after 2 minutes. This is a zombie with Speed .5, 1000 HP, And a melee attack that does 50 when it hits the player with a 2 second cooldown. HEAD HONCHO can also spawn 5 normal zombies in a circle around him every 10 seconds. When the players kills HEAD HONCHO, they win the game.

Achievements: A player will be alerted on screen when they achieve any of these things. Pressing the escape key will pause the game and bring up a menu, one of the options on which says achievements and when clicked shows a list of all achievements. The achievements are as follows:
	First blood! - Kill 1 zombie.
Novice Exterminator - Kill 100 zombies.
Professional Pest Control - Kill 1000 zombies.
Planet Cleanser - Kill 100,000 zombies.
Once and Future - Kill 1000 zombies with Excalibur.
Penny Pincher - Have 300 DNA at a time.
Traitor! - Kill another player.
Nice hit! - Hit 5 zombies with a single attack (only possible with melee or sniper).
Flame on! - Hit 5 zombies with the flamethrower at once.
