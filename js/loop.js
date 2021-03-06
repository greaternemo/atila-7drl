// PLAY.Loop
// For doing loops

PLAY.Loop = function (procRef, procDelay) {
    // loopInterval holds the ID of your interval.
    // Specifically, when you start the loop, you set up
    // a timer that repeatedly checks if loopState is
    // true and conditionally calls loopProc.
    this.loopInterval = null;

    // loopState is whether or not the loop should
    // process its logic on a given iteration. It serves
    // as your primary lock flag.
    this.loopState = null;

    // loopFlags are custom flags that can be set on an
    // instance by instance basis.
    // WILL MESS WITH LATER
    this.loopFlags = new Map();

    // loopProc is a function reference that the loop
    // will call on each successful iteration.

    // OPTIMALLY, procRef should be an anonymous function
    // that uses a SIG() call to actually call the desired
    // function.
    this.loopProc = procRef;

    // loopDelay is the delay in ms between each time the
    // interval triggers.
    this.loopDelay = procDelay;
};

/*
PLAY.Loop.prototype
*/

PLAY.Loop.prototype.toggleLoop = function () {
    if (this.loopState) {
        this.loopState = false;
    } else {
        this.loopState = true;
    }
};



// Actually do the loop if it's okay to do the loop
PLAY.Loop.prototype.doTheLoop = function () {
    if (this.loopState && this.checkFlags()) {
        return this.loopProc();
    }
};

// Construct the interval
PLAY.Loop.prototype.engage = function () {
    this.loopInterval = setInterval(this.doTheLoop.bind(this), this.loopDelay);
    this.start();
};

// Flip the loopState to true
PLAY.Loop.prototype.start = function () {
    if (!this.loopState) {
        this.loopState = true;
    }
};

// Flip the loopState to false
PLAY.Loop.prototype.stop = function () {
    if (this.loopState) {
        this.loopState = false;
    }
};

PLAY.Loop.prototype.reset = function () {
    // clear the loop
    // null the loopState
    // call engage
    clearInterval(this.loopInterval);
    this.loopState = false;
    this.engage();
};

PLAY.Loop.prototype.hardReset = function () {
    // clear the loop
    // null the loopFlags
    // don't call engage
    clearInterval(this.loopInterval);
    this.loopState = false;
};

PLAY.Loop.prototype.changeDelay = function (nDelay) {
    this.loopDelay = nDelay;
    this.reset();
};

PLAY.Loop.prototype.addFlag = function (fName, fInitState) {
    if (!this.loopFlags.has(fName)) {
        let newFlag = {
            sValid: fInitState,
            sCurrent: fInitState,
        };
        this.loopFlags.set(fName, newFlag);
    }
};

PLAY.Loop.prototype.delFlag = function (fName) {
    if (this.loopFlags.has(fName)) {
        this.loopFlags.delete(fName);
    }
};

PLAY.Loop.prototype.togFlag = function (fName) {
    if (this.loopFlags.has(fName)) {
        if (this.loopFlags.get(fName).sCurrent) {
            this.loopFlags.get(fName).sCurrent = false;
        } else {
            this.loopFlags.get(fName).sCurrent = true;
        }
    }
};

PLAY.Loop.prototype.checkFlags = function () {
    let verdict = true;
    this.loopFlags.forEach(function(fKey, fVal) {
        if (fVal.sCurrent === fVal.sValid) {
            // we good
        } else {
            verdict = false;
        }
    });
    return verdict;
};

/*
PLAY.Loop.prototype.startGame = function () {
    SIG("clearFeed");
    this.gameState = true;
    this.playState = "READY";
    return this.startRound();
};

PLAY.Loop.prototype.startRound = function () {
    this.roundState = true;
    this.playState = "READY";

    if (this.loopSpeed === "SLOW") {
        this.loopInterval = setInterval(SIG, 500, "playTurn");
    } else if (this.loopSpeed === "FAST") {
        this.loopInterval = setInterval(SIG, (1000/30), "playTurn");
    }
};

PLAY.Loop.prototype.endRound = function () {
    clearInterval(this.loopInterval);
    this.roundState = false;
    this.loopState = false;
    this.ctrl.innerHTML = "Start Next Round";
};

PLAY.Loop.prototype.endGame = function () {
    clearInterval(this.loopInterval);
    this.gameState = false;
    this.loopState = false;
    this.ctrl.innerHTML = "Start Next Game";
};

PLAY.Loop.prototype.startNewGame = function () {
    return this.startGame();
};

PLAY.Loop.prototype.startNewRound = function () {
    this.ctrl.innerHTML = "Pause Round";
    this.loopState = true;
    SIG("clearFeed");
    return this.startRound();
};

PLAY.Loop.prototype.playTurn = function () {
    // Always update stats
    SIG('updateStats');

    if (!this.loopState) {
        return;
    }

    if (this.playState === "READY") {
        // We don't stop the loop, it keeps iterating.
        // We just set a flag to say "don't battle again
        // until the current battle is done and no player
        // has lost yet"
        this.playState = "PLAYING";

        let turnResult = SIG("nextTurn");
        SIG('updateStats');
        if (turnResult === "GAME_OVER") {
            this.playState = "GAME_OVER";
            return this.endGame();
        }
        else if (turnResult === "ROUND_OVER") {
            this.playState = "ROUND_OVER";
            return this.endRound();
        }
        else {
            this.playState = "READY";
            return;
        }
    }
    else {
        return;
    }
};
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