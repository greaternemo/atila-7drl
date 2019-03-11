// PLAY.Util

PLAY.Util = function (params) {};

/*
PLAY.Util.prototype
*/

// Randomization functions

// returns a random integer between 0 and max-1
PLAY.Util.prototype.rand = function (max) {
    return Math.floor(Math.random() * max);
};

// Returns a random integer between 0 and max-1
// But with heavier conditions to make it more random
PLAY.Util.prototype.rander = function (max) {
    // first we take the final digit of the current epoch time
    let dateStr = '' + Date.now();
    let dateStrArr = dateStr.split('');
    // we add 2 so we don't have to account for 0 or 1
    let finalDigit = parseInt(dateStrArr.pop) + 2;
    // this should give us a distance of either 1 or 2
    let distance = (finalDigit % 2) + 1;
    
    let keepLooping = true;
    let result = false;
    let testArr = [
        'dummy value',
        this.rand(max),
        this.rand(max),
    ];
    
    while (keepLooping) {
        testArr.shift();
        testArr.push(this.rand(max));
        if (testArr[0] != testArr[distance]) {
            result = testArr[0];
            keepLooping = false;
        }
    }
    
    return result;
}

/*  Returns a value from a weighted set.
    The set should be structured as an array.
    The array should contain arrays with 2 items:
    the option name as a string and
    the weight as a integer, which will become a percentage.
    wSet = [
        ['opt1', 10],
        ['opt2', 30],
        ['opt3', 60],
    ];
*/
PLAY.Util.prototype.weightedRand = function (wSet) {
    let setArr = [];
    let aCnt,
        aOpt;
    for (let aPair of wSet) {
        // shifting here breaks everything
        // you're passing in atomic values, just assign them
        // and it will clone them from the source array
        // idiot
        // aOpt = aPair.shift();
        // aCnt = aPair.shift();
        aOpt = aPair[0];
        aCnt = aPair[1];
        while (aCnt > 0) {
            setArr.push(aOpt);
            aCnt -= 1;
        }
    }
    return this.randFromArray(setArr);
}

// Separate random number function for die rolls
PLAY.Util.prototype.aDie = function (sides) {
    return this.rander(sides) + 1;
};

// Returns a 0 or 1
PLAY.Util.prototype.aCoin = function () {
    return this.aDie(2) - 1;
};

// Returns a 1 or 2
PLAY.Util.prototype.d2 = function () {
    return this.aDie(2);
};

PLAY.Util.prototype.d4 = function () {
    return this.aDie(4);
};

PLAY.Util.prototype.d6 = function () {
    return this.aDie(6);
};

PLAY.Util.prototype.d8 = function () {
    return this.aDie(8);
};

PLAY.Util.prototype.d10 = function () {
    return this.aDie(10);
};

PLAY.Util.prototype.d12 = function () {
    return this.aDie(12);
};

PLAY.Util.prototype.d20 = function () {
    return this.aDie(20);
};

// Constructs a random number <len> digits long, returns a string
// Mainly built for generating 10-digit ID strings for the registry
PLAY.Util.prototype.genNum = function (len) {
    let nLen = len ? len : 10;
    let nStr = '';
    let nCnt = 0;
    let nGen = '';
    for (nCnt; nCnt < nLen; nCnt++) {
        nGen = this.d10().toString();
        nStr += '' + nGen;
    }
    return nStr;
};

PLAY.Util.prototype.randomName = function (pNum) {
    let playerNames = [
        'Nemo', 'Shoag', 'Dooty', 'Dagmar', 'Tex',
        'Boo', 'Big Boo', 'King Boo', 'Lakitu', 'Shyguy',
        'Captain Toad', 'Dry Bones', 'BFB', 'Sex Bob-omb',
        'Puppycat', 'Zorbat', 'Dukburg', 'Garbador',
        'Tom Nook', 'DJ K.K.', 'Blathers', 'Waluigi',
        'Nolan', 'Hestu',
    ];
    let ourPlayers = [];
    let rIdx = 0;
    let playa = null;
    while (ourPlayers.length < pNum) {
        rIdx = this.rand(playerNames.length);
        playa = playerNames[rIdx];
        if (playa === 'Nolan') {
            ourPlayers.push(this.randomNolan());
        }
        else {
            ourPlayers.push(playa);
        }
        playerNames.splice(rIdx, 1);
    }
    return ourPlayers;
};

PLAY.Util.prototype.randomNolan = function () {
    let rareNolans = [
        'Gold Nolan',
        'Shiny Nolan',
        'Fat Nolan',
        'The Dreaded MEGA BACONOLAN',
        "A Wendy's Baconator",
        'Nolan, as played by Jeff',
        'Nolan, as played by Freddy',
        'Nolan, as played by James Franco',
        'A licened Nolan anime body pillow',
        'A Nolan voodoo doll',
        'Silver Nolan',
        'Tiny Nolan',
        '2 Tiny Nolans in a trenchcoat',
        'A vase or 2 Nolans',
        'Evil Nolan',
        'RoboNolan',
        "An alien in Nolan's skin",
    ];
    if (this.rand(25) === 0) {
        return rareNolans[this.rand(rareNolans.length)];
    }
    else {
        return 'Nolan';
    }
};

// Takes an array, creates a new array, adds the elements of the original
// array to the new array at random, returns the new array.
// Proper usage should look like:
// let xDeck = SIG("shuffle", yDeck);
PLAY.Util.prototype.shuffle = function (aDeck) {
    let newDeck = [];
    while (aDeck.length) {
        newDeck.push(aDeck.splice(this.rander(aDeck.length), 1)[0]);
    }
    return newDeck;
};

PLAY.Util.prototype.randFromArray = function (rSource) {
    let randSet = rSource.slice();
    if (randSet.length < 1) {
        console.log("Probably about to break due to passing an empty array into randFromArray, which returns undefined.");
    }
    return this.shuffle(randSet)[0];
};



// Miscellaneous functions

PLAY.Util.prototype.cap = function (nStr) {
    return nStr.charAt(0).toUpperCase() + nStr.slice(1);
};

PLAY.Util.prototype.byId = function (elemId) {
    return document.getElementById(elemId);
};

PLAY.Util.prototype.scrollToNew = function (panel) {
    panel.scrollTop = panel.scrollHeight - panel.clientHeight;
    return;
};

PLAY.Util.prototype.enpair = function (params) {
    let [dxv, dyv] = params;
    let pairStr = '';
    pairStr += dxv.toString() + ',' + dyv.toString();
    return pairStr;
};

PLAY.Util.prototype.depair = function (dxyv) {
    let pairXY = {};
    let pairList = dxyv.split(',');
    pairXY.x = parseInt(pairList[0]);
    pairXY.y = parseInt(pairList[1]);
    return pairXY;
};

PLAY.Util.prototype.entrio = function (params) {
    let [dxv, dyv, dzv] = params;
    let trioStr = '';
    trioStr += dxv.toString() + ',';
    trioStr += dyv.toString() + ',';
    trioStr += dzv.toString();
    return trioStr;
};

PLAY.Util.prototype.detrio = function (dxyzv) {
    let trioXYZ = {};
    let trioList = dxyzv.split(',');
    trioXYZ.x = parseInt(trioList[0]);
    trioXYZ.y = parseInt(trioList[1]);
    trioXYZ.z = parseInt(trioList[2]);
    return trioXYZ;
};

PLAY.Util.prototype.intGreaterOf = function(params) {
    let [intA, intB] = params;
    if (intA === intB) {
        return intB;
    } else if (intA > intB) {
        return intA;
    } else if (intA < intB) {
        return intB;
    }
};

PLAY.Util.prototype.intLesserOf = function(params) {
    let [intA, intB] = params;
    if (intA === intB) {
        return intB;
    } else if (intA > intB) {
        return intB;
    } else if (intA < intB) {
        return intA;
    }
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