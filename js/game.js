// PLAY.Game
// Do the game

PLAY.Game = function () {
    this.gameLoop = null;

    this.init();
};

/*
PLAY.Game.prototype
*/

PLAY.Game.prototype.init = function () {
    // build the world
    // build the scheduler
    // build the turn loop
    // ok go

    this.gameLoop = new PLAY.Loop(function () {
        return SIG('doTheGame');
    }, GCON('GAME_LOOP_DELAY'));
    SCON('GAME_OVER', false);
    
    // ARE YOU READYYYYY
    // YES I'M READYYYYY
    SCON('READY_FOR_TURN', true);
};

PLAY.Game.prototype.doTheGame = function () {
    if (GCON('READY_FOR_TURN') === true &&
        GCON('GAME_PAUSED') === false) {
        // lock the game loop
        SCON('READY_FOR_TURN', false);
        // make the turn happen
        SIG('doNextTurn');
        // check for win/loss?
        // do that here
    }
    // we'll do this here to integrate it into the existing loop
    if (GCON('END_OF_TURN') === true && GCON('READY_FOR_TURN') === false) {
        // unlock the game loop
        SCON('PLAYER_TURN', false);
        SCON('END_OF_TURN', false);
        SCON('READY_FOR_TURN', true);
    }
};

PLAY.Game.prototype.doNextTurn = function () {
    // console.log('doing next turn');
    SIG('handleCurrentTurn');
};

PLAY.Game.prototype.changeGameLoopDelay = function () {
    let gLoopDelay = GCON('GAME_LOOP_DELAY');
    this.gameLoop.changeDelay(gLoopDelay);
};




/*
*
*
*
* Courtesy Space
*
*
*
*/



/*
*
*
*
* Courtesy Space
*
*
*
*/