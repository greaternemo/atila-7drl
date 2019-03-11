// PLAY.Controller
// The controller between the various loops

PLAY.Controller = function () {
    this.init();
};

/*
PLAY.Controller.prototype. = function () {};
*/

PLAY.Controller.prototype.init = function () {
    //filler
};

PLAY.Controller.prototype.handleCurrentTurn = function () {
    if (GCON('UNREAD_LOG').length > 0) {
        let unreadLog = [...GCON('UNREAD_LOG')];
        let turnMsg = unreadLog.shift();
        GCON('LOG_QUEUE').push(turnMsg);
        let readLog = [...GCON('READ_LOG')];
        readLog.push(turnMsg);
        SCON('UNREAD_LOG', unreadLog);
        SCON('READ_LOG', readLog);

        SCON('END_OF_TURN', true);

        // refactor this to be good
        // if (turnMsg == 'You died!' || turnMsg == 'You win!') {
        if (turnMsg == 'Player died!' || turnMsg == 'Player wins!') {
            SCON('GAME_OVER', true);
        }
    }
    else {
        // console.log('UNREAD_LOG is empty');
    }
};

PLAY.Controller.prototype.toggleGameLoopDelay = function () {
    let lDelay = GCON('GAME_LOOP_DELAY');
    let loopSpeed = SIG('byId', 'loop_speed');
    if (lDelay == GCON('LOOP_DELAY')) {
        SCON('GAME_LOOP_DELAY', GCON('FASTER_DELAY'));
        loopSpeed.innerHTML = 'Speed Down';
    }
    else {
        SCON('GAME_LOOP_DELAY', GCON('LOOP_DELAY'));
        loopSpeed.innerHTML = 'Speed Up';
    }
    SIG('changeGameLoopDelay');
};

PLAY.Controller.prototype.toggleViewLoopDelay = function () {
    let lDelay = GCON('VIEW_LOOP_DELAY');
    let loopSpeed = SIG('byId', 'loop_speed');
    if (lDelay == GCON('LOOP_DELAY')) {
        SCON('VIEW_LOOP_DELAY', GCON('FASTER_DELAY'));
        loopSpeed.innerHTML = 'Speed Down';
    }
    else {
        SCON('VIEW_LOOP_DELAY', GCON('LOOP_DELAY'));
        loopSpeed.innerHTML = 'Speed Up';
    }
    SIG('changeViewLoopDelay');
};

PLAY.Controller.prototype.toggleGameLoop = function () {
    let ctrlLoop = SIG('byId', 'ctrl_loop');
    let gamePaused = GCON('GAME_PAUSED');
    if (gamePaused) {
        SCON('GAME_PAUSED', false);
        ctrlLoop.innerHTML = 'Pause Game';
    }
    else {
        SCON('GAME_PAUSED', true);
        ctrlLoop.innerHTML = 'Unpause Game';
    }
}

/*
PLAY.Controller.prototype.endCurrentTurn = function () {
    //if (!GCON('GAME_OVER')) {
        //SIG('updateMobFovOnCurrentFloor');
    //}
    //if (GCON('DIRTY_LOAD').length > 0) {
        // shit damn this was a smart decision, thanks Neems
        //SIG('pushDirtyLoad');
    //}
    SCON('END_OF_TURN', true);
};

PLAY.Controller.prototype.makeMobPassTheTurn = function () {
    SIG('endCurrentTurn');
    // IT IS REALLY THAT EASY RIGHT NOW, LMAO
};
*/


// filler



/*
*
*
* Courtesy Spaces
*
*
*/