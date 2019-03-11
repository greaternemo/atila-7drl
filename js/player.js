// PLAY.Player
// The player avatar, but not like you think

/*
* One of the core conceits of playify is that the person playing the game
* is not "the player" as much as they are "the over-player" or similar.
* This means we need to clarify some terminology here.
* HENCEFORTH THE FOLLOWING TERMS AND ABBREVIATIONS SHALL BE USED:
* "the over-player" aka "OP" - this refers to the literal person playing the game.
* "the player avatar" aka "PA" - this refers to the character "the player" who
* is fictionally playing the game whose log you're seeing, and whose stats affect
* the choices they make in-game.
* "the player character" aka "PC" - this is the character being played by the
* player avatar and whose actions are playing out in the game's log.
*/

PLAY.Player = function () {
    this.init();
}

/*
PLAY.Player.prototype. = function () {};
*/

PLAY.Player.prototype.init = function () {
    // grit (stubbornness) affects how much the PA is motivated to finish what they start.
    this.grit = 0;
    // luck (luck) affects whether things go well or don't.
    this.luck = 0;
    // nosy (curiosity) affects how much the PA is motivated by novelty and discovery.
    this.nosy = 0;
    // rash (recklessness) affects how much the PA is deterred by danger and risk.
    this.rash = 0;
    // want (greed) affects how much the PA is motivated by money and item acquisition.
    this.want = 0;
    
    // this.pack = 0;

    this.core = {
        grit: 0,
        luck: 0,
        nosy: 0,
        rash: 0,
        want: 0,
    };
    
    this.temp = {
        grit: 0,
        luck: 0,
        nosy: 0,
        rash: 0,
        want: 0,
    };
    
    this.gear = {
        armor: 'empty',
        weapon: 'empty',
        shield: 'empty',
        tool: 'empty',
        trinket: 'empty',
    };
    
    this.items = 0;
    
    this.stress = 0;
    this.stressCap = 100;
    
    // add KNOWN_MOBS and KNOWN_ITEMS consts
    
};

// PLAY.Player.prototype.




/*
*
*
* Courtesy Spaces
*
*
*/