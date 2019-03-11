// play.js
// That main shit

let PLAY = {
    // Core bits
    pRouter: null,
    pRegistry: null,
    
    // Systems
    pAuthor: null,
    pController: null,
    pFactory: null,
    pGame: null,
    pInput: null,
    pNarrator: null,
    pUtil: null,
    pView: null,
    
    // Classes
    // pLoop
    // pPlayer
    // pMob
    // pItem
    // pVignette
    // pStory
    
};

PLAY.init = function () {
    // Import order is VERY IMPORTANT here.
    PLAY.pRouter = new PLAY.Router(PLAY.BASE);

    PLAY.pRegistry = new PLAY.Registry(PLAY.BASE);
    PLAY.pRouter.import('Registry', PLAY.pRegistry);
    //console.log('Imported Registry');

    PLAY.pUtil = new PLAY.Util();
    PLAY.pRouter.import('Util', PLAY.pUtil);
    //console.log('Imported Util');

    PLAY.pNarrator = new PLAY.Narrator();
    PLAY.pRouter.import('Narrator', PLAY.pNarrator);
    //console.log('Imported Narrator');
    
    PLAY.pController = new PLAY.Controller();
    PLAY.pRouter.import('Controller', PLAY.pController);
    //console.log('Imported Player');
    
    //PLAY.pInput = new PLAY.Input();
    //PLAY.pRouter.import('Input', PLAY.pInput);
    //console.log('Imported Input');

    PLAY.pFactory = new PLAY.Factory();
    PLAY.pRouter.import('Factory', PLAY.pFactory);
    // PLAY.Factory includes our non-singleton modules, which is why we don't use them here:
    // PLAY.Item
    // PLAY.Mob
    // PLAY.Vignette
    // PLAY.Story

    PLAY.pAuthor = new PLAY.Author();
    PLAY.pRouter.import('Author', PLAY.pAuthor);
    //console.log('Imported Author');
    // SIG('buildLog');
    SIG('buildStory');
    //console.log(GCON('FINAL_LOG'));

    PLAY.pView = new PLAY.View();
    PLAY.pRouter.import('View', PLAY.pView);
    //console.log('Imported View');

    PLAY.pGame = new PLAY.Game();
    PLAY.pRouter.import('Game', PLAY.pGame);
    //console.log('Imported Game');
    
    //SIG('initGame');
    // DON'T FORGET TO DO THIS
    //PLAY.pInput.inputLoop.engage();
    PLAY.pView.viewLoop.engage();
    PLAY.pGame.gameLoop.engage();
    
    // More init bits that need to be done out of order
    //SIG('startListeningForInput');
    //console.log(PLAY);

    // mega debug bullshit
    /*
    let cnts = [0, 0, 0, 0];
    while (cnts[0] < 1000) {
        cnts[SIG('aDie', 3)] += 1;
        cnts[0] += 1;
    }
    CLOG('rolled 1 ' + cnts[1] + ' times');
    CLOG('rolled 2 ' + cnts[2] + ' times');
    CLOG('rolled 3 ' + cnts[3] + ' times');
    
    let cnts = [0, 0, 0, 0, 0, 0];
    let nmr = 0;
    let smol,
        bigg,
        int1,
        int2,
        diff;
    while (nmr < 1000) {
        int1 = SIG('d6');
        int2 = SIG('d6');
        if (int1 == int2) {
            cnts[0] += 1;
        }
        else {
            smol = SIG('intLesserOf', [int1, int2]);
            bigg = SIG('intGreaterOf', [int1, int2]);
            diff = bigg - smol;
            cnts[diff] += 1;
        }
        
        nmr += 1;
    }
    CLOG('diff was 0 ' + Math.floor(cnts[0]/10) + '%');
    CLOG('diff was 1 ' + Math.floor(cnts[1]/10) + '%');
    CLOG('diff was 2 ' + Math.floor(cnts[2]/10) + '%');
    CLOG('diff was 3 ' + Math.floor(cnts[3]/10) + '%');
    CLOG('diff was 4 ' + Math.floor(cnts[4]/10) + '%');
    CLOG('diff was 5 ' + Math.floor(cnts[5]/10) + '%');

    let cnt = 500;
    while (cnt > 0) {
        SIG('buildStory');
        cnt -= 1;
    }
    */
}

PLAY.restInPeace = function () {
    // stop handling input
    //SIG('stopListeningForInput');
    // stop the loops
    //PLAY.pInput.inputLoop.hardReset();
    PLAY.pView.viewLoop.hardReset();
    PLAY.pGame.gameLoop.hardReset();
    // clear anything relevant
    // we very do not need this anymore
    /*
    let mPanel = SIG('byId', 'map_panel');
    while (mPanel.hasChildNodes() === true) {
        mPanel.removeChild(mPanel.firstChild);
    }
    */
    SIG('clearMsgPanel');
    let loopSpeed = SIG('byId', 'loop_speed');
    loopSpeed.innerHTML = 'Speed Up';
    // and then do the whole thing all over again
    return PLAY.init();
};

function SIG(rSig, rParams) {
    return PLAY.pRouter.reroute(rSig, rParams);
}

function GCON(aConst) {
    // console.log('getting const');
    // console.log(aConst);
    return SIG('getConst', aConst);
}

function SCON(aConst, aValue) {
    // console.log('setting const');
    // console.log(aConst + ' set to ' + aValue);
    return SIG('setConst', [aConst, aValue]);
}

function GET(anEid) {
    return SIG('getEid', anEid);
}

function SET(anEid, aValue) {
    return SIG('setEid', [anEid, aValue]);
}

function CLOG(msg) {
    return console.log(msg);
}

function RIP() {
    return PLAY.restInPeace();
}

function KEYIN(aKey) {
    return SIG('parseRawKeydown', aKey);
}

function doWelcome () {
    return SIG('narrate', "WELCOME");
}

/*
let SCORE = {
    wins: 0,
    loss: 0,
};

function AWIN () {
    SCORE.wins += 1;
    CLOG(SCORE);
}

function ALOSS () {
    SCORE.loss += 1;
    CLOG(SCORE);
}
*/

// hurk



/*
*
*
*
* Courtesy Space
*
*
*
*/