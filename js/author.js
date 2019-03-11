// PLAY.Author
// Let's write a story together.

PLAY.Author = function () {
    this.init();
};

/*
PLAY.Author.prototype. = function () {};
*/

PLAY.Author.prototype.init = function () {
    // sup
};

PLAY.Author.prototype.enscribe = function (aMsg) {
    // CLOG('logging msg: ' + aMsg);
    let rawStory = [...GCON('RAW_STORY')];
    rawStory.push(aMsg);
    SCON('RAW_STORY', rawStory);
};

PLAY.Author.prototype.addTag = function (aTag) {
    let stressTags = [...GCON('STRESS_TAGS')];
    stressTags.push(aTag);
    SCON('STRESS_TAGS', stressTags);
};

PLAY.Author.prototype.clearTags = function () {
    SCON('STRESS_TAGS', []);
};

PLAY.Author.prototype.clearEvent = function () {
    SCON('CURRENT_EVENT', '');
    SCON('CURRENT_TARGET', '');
    SCON('CURRENT_ITEM', '');
};

PLAY.Author.prototype.clearAllStory = function () {
    SCON('RAW_STORY', []);
    SCON('FINAL_LOG', []);
    SCON('READ_LOG', []);
    SCON('LOG_QUEUE', []);
};

PLAY.Author.prototype.buildStory = function () {
    // CLOG('building story');
    SIG('clearAllStory');
    SIG('buildPlayer');
    // CLOG(GCON('OVER_PLAYER'));
    SIG('buildLog');
};

PLAY.Author.prototype.buildPlayer = function () {
    // We don't need to pass anything around here because
    // as part of makePlayer, the new player object is registered
    // to the OVER_PLAYER constant.
    SIG('clearTags');
    SIG('makePlayer');
    SCON('PLAYER_SCORE', 0);
    SCON('IS_PLAYER_DEAD', false);
    SCON('HAS_PLAYER_WON', false);
    SIG('randomizePlayerStats');
    SIG('randomizePlayerKit');
    // CLOG('built player');
};

PLAY.Author.prototype.randomizePlayerStats = function () {
    let newStats = SIG('randFromArray', GCON('PLAYER_BASE').possibleStats);
    return SIG('setPlayerStats', newStats);
};

PLAY.Author.prototype.randomizePlayerKit = function () {
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let gearSlots = playerBase.gearSlots;
    player.items = SIG('aDie', 3);
    let aSlot = SIG('randFromArray', [...gearSlots]);
    player.gear[aSlot] = SIG('randomStat');    
};
    
PLAY.Author.prototype.randomStat = function () {
    return SIG('randFromArray', [...GCON('PLAYER_BASE').statNames]);
}

PLAY.Author.prototype.setPlayerStats = function (statArr) {
    // CLOG('setting player stats');
    // CLOG(statArr);
    let statSet = [...statArr];
    let player = GCON('OVER_PLAYER');
    player.grit = statSet.shift();
    player.luck = statSet.shift();
    player.nosy = statSet.shift();
    player.rash = statSet.shift(); 
    player.want = statSet.shift();
    player.core.grit = player.grit;
    player.core.luck = player.luck;
    player.core.nosy = player.nosy;
    player.core.rash = player.rash;
    player.core.want = player.want;
};

PLAY.Author.prototype.buildLog = function () {
    // This is hacky as fuck right now,
    
    SIG('tribulate');
    
    /*
    let outcomes = [
        'Nothing happens',
        'You get into a scuffle but run away',
        'You get jumped and vanquish your attackers',
        'You find a treasure',
        'You get bit by a bug (regular sized)',
        'You died!'
    ];
    let thisTurn,
        newLog = [],
        turnsTaken = 0,
        endGame = false,
        keepPlaying = true;
    
    while (keepPlaying) {
        thisTurn = SIG('randFromArray', outcomes);
        newLog.push(thisTurn);
        if (thisTurn == 'You died!') {
            keepPlaying = false;
        }
        else if (turnsTaken >= 10) {
            newLog.push('You win!');
            keepPlaying = false;
        }
        else {
            turnsTaken += 1;
        }
    }
    */
    
    
    // this will need to be... spruced up later.
    SCON('FINAL_LOG', [...GCON('RAW_STORY')]);
    SCON('UNREAD_LOG', [...GCON('RAW_STORY')]);
};

PLAY.Author.prototype.tribulate = function () {
    // oh we in it now
    SCON('RAW_STORY', []);
    // CLOG('tribulating');
    while (!GCON('IS_PLAYER_DEAD') && !GCON('HAS_PLAYER_WON')) {
        SIG('clearEvent');
        // CLOG('deciding next event');
        SIG('decideNextEvent');
        // CLOG('event decided and executed');
        SIG('resolveEvent');
        // CLOG('event resolved');
    }
    // CLOG('resolved all tribulation');
};

PLAY.Author.prototype.decideNextEvent = function () {
    // SIG('enscribe', 'Deciding next event');
    SIG('enscribe', SIG('getDescriptor', 'MOVING_ON'));
    // CLOG('player stress: ' + GCON('OVER_PLAYER').stress);
    
    // We can bias our event rolls to build tension according to player stress
    let authorBase = GCON('AUTHOR_BASE');
    // CLOG('defined authorBase');
    let weightedSets = authorBase.weightedSets;
    // CLOG('defined weightedSets');
    let stressMod = SIG('assessStress');
    // CLOG('defined stressMod: ' + stressMod);
    let chosenSet = weightedSets[stressMod];
    // CLOG('defined chosenSet');
    // CLOG(chosenSet);
    let nextEvent = SIG('weightedRand', [...chosenSet]);
    // CLOG('firing off next event: ' + nextEvent);
    SIG(nextEvent);
};

PLAY.Author.prototype.recoveryEvent = function () {
    // How the player recovers depends on how exhausted they are.
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let gearSlots = playerBase.gearSlots;
    SIG('enscribe', SIG('getDescriptor', 'RECOVERY_EVENT'));
    
    // First, we eliminate all the player's stress.
    player.stress = 0;
    SIG('enscribe', SIG('getDescriptor', 'STRESS_RELIEF'));
    
    // Then we check their stats
    let belowZero = false;
    // If any stat is below zero, we'll heal those up
    for (let aStat of [...statNames]) {
        if (player[aStat] < 0) {
            belowZero = true;
        }
    }
    if (belowZero === true) {
        SIG('healUpToZero');
    }
    else {
        // Once all their stats are at least 0, we heal their main stats
        // We only do either/or because doing both is OP
        SIG('healUpToBase');
    }
    
    // Then we give them any gear bonuses
    let aMsg;
    for (let aGear of [...gearSlots]) {
        if (player.gear[aGear] != 'empty') {
            player[player.gear[aGear]] += 1;
        }
    }
    
    // Then we give them an item because we're nice
    SIG('getItems', 1);
    
    // I think that's it
    
};

PLAY.Author.prototype.healUpToZero = function () {
    SIG('enscribe', SIG('getDescriptor', 'HEAL_TO_ZERO'));
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let aMsg;
    
    for (let aStat of [...statNames]) {
        if (player[aStat] < 0) {
            player[aStat] = 0;
            //aMsg = 'Player ' + aStat + ' is now ' + player[aStat];
            //SIG('enscribe', aMsg);            
        }
    }    
};

PLAY.Author.prototype.healUpToBase = function () {
    SIG('enscribe', SIG('getDescriptor', 'HEAL_TO_BASE'));
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let aMsg,
        bMsg;
    
    for (let aStat of [...statNames]) {
        if (player.core[aStat] == 1) {
            player[aStat] += 1;
            // aMsg = 'Player gained 1 point of ' + aStat;
            // SIG('enscribe', aMsg);
            // bMsg = 'Player ' + aStat + ' is now ' + player[aStat];
            // SIG('enscribe', bMsg);            
        }
    }    
};

PLAY.Author.prototype.getItems = function (aNum) {
    let aMsg;
    if (aNum == 1) {
        aMsg = 'You find a useful item and stuff it in your pocket.';
    }
    else {
        aMsg = 'You find a small pack of items and pull out a couple useful things.';
    }
    GCON('OVER_PLAYER').items += aNum;
    SIG('enscribe', aMsg);
};

PLAY.Author.prototype.spendItems = function (aNum) {
    let player = GCON('OVER_PLAYER');
    SIG('addTag', 'spentItems');
    // let aMsg = 'Player spent ' + aNum + ' items';
    let aMsg;
    aMsg = SIG('getDescriptor', 'USED_' + aNum + '_ITEMS'),
    SIG('enscribe', aMsg);
    player.items -= aNum;

};

PLAY.Author.prototype.getEmptyGearSlots = function () {
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let gearSlots = [...playerBase.gearSlots];
    let emptySlots = [];
    
    for (let aSlot of [...gearSlots]) {
        if (player.gear[aSlot] == 'empty') {
            emptySlots.push(aSlot);
        }
    }
    
    return emptySlots;
}

PLAY.Author.prototype.getFullGearSlots = function () {
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let gearSlots = [...playerBase.gearSlots];
    let fullSlots = [];
    
    for (let aSlot of [...gearSlots]) {
        if (player.gear[aSlot] != 'empty') {
            fullSlots.push(aSlot);
        }
    }
    
    return fullSlots;
}

PLAY.Author.prototype.getRandomGear = function () {
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let chosenStat = SIG('randFromArray', [...statNames]);
    let emptySlots = SIG('getEmptyGearSlots');
    let chosenSlot = SIG('randFromArray', emptySlots);
    
    let aMsg = 'You find a nice-looking ' + chosenSlot + ' and take it along with you.';
    SIG('enscribe', aMsg);
    player.gear[chosenSlot] = chosenStat;    
}

PLAY.Author.prototype.loseRandomGear = function () {
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let fullSlots = SIG('getFullGearSlots');
    let chosenSlot = SIG('randFromArray', fullSlots);
    
    let aMsg = 'You feel your ' + chosenSlot + ' break and you discard it before it gets you into trouble.';
    SIG('enscribe', aMsg);
    player.gear[chosenSlot] = 'empty';
}

PLAY.Author.prototype.trialEventDiff0 = function () {
    // return SIG('handleTrial', 0);
    // this will almost certainly get changed
    return SIG('recoveryEvent', 0);
};

PLAY.Author.prototype.trialEventDiff1 = function () {
    return SIG('handleTrial', 1);
};

PLAY.Author.prototype.trialEventDiff2 = function () {
    return SIG('handleTrial', 2);
};

PLAY.Author.prototype.trialEventDiff3 = function () {
    return SIG('handleTrial', 3);
};


PLAY.Author.prototype.handleTrial = function (diffMod) {
    // CLOG('handling trial');
    let toBeat = diffMod;
    let authorBase = GCON('AUTHOR_BASE');
    let eventThemes = [...authorBase.eventThemes];
    let thisEvent = SIG('randFromArray', eventThemes);
    let eventDesc = 'MOD' + diffMod + '_' + thisEvent;
    // SCON('CURRENT_EVENT', eventDesc);
    SCON('CURRENT_EVENT', thisEvent.toLowerCase());
    SIG('enscribe', SIG('getDescriptor', eventDesc));
    
    let player = GCON('OVER_PLAYER');
    let playerBase = GCON('PLAYER_BASE');
    let statNames = playerBase.statNames;
    let gearSlots = playerBase.gearSlots;
    let shuffledStats = SIG('shuffle', [...statNames]);
    let testedStats = [];
    while (testedStats.length < diffMod) {
        testedStats.push(shuffledStats.shift());
    }
    
    for (let aStat of testedStats) {
        // SIG('enscribe', 'Player faces a ' + aStat + ' test');
    }
    
    // we flip a coin to see if we award gear bonuses in this trial
    let gearTested = 'none';
    if (SIG('aCoin')) {
        gearTested = SIG('randFromArray', [...gearSlots]);
        // CLOG('testing gear: ' + gearTested);
        // if we're awarding gear bonuses, we add those to temp
        if (player.gear[gearTested] != 'empty') {
            player.temp[player.gear[gearTested]] += 1;
        }
    }
    
    // hoo boy
    // wew lad
    // here we go
    
    /* There are 4 potential outcomes for a trial,
       with each one having a different symbolic meaning.
       The difference between 'success' and 'failure' here
       is entirely based on how cleanly the trial was overcome.
       Autosuccess is an easy clear.
       Success is a win, but a bit more stressful.
       Failure means the player really had to get their hands dirty.
       Direfailure means the encounter was perilous and the player might
       not have actually made it out.
    */
    let outcome;
    let calculatedStats = {
        grit: null,
        luck: null,
        nosy: null,
        rash: null,
        want: null,
    }
    for (let aStat of statNames) {
        calculatedStats[aStat] = player[aStat] + player.temp[aStat];
        // if you have a piece of gear, you always have at least 0 for that stat
        if (calculatedStats[aStat] < 0 &&
            gearTested != 'none' &&
            player.gear[gearTested] == aStat) {
            calculatedStats[aStat] = 0;
        }
    }
    
    // yeet
    // First we check to see if the player has at least 1 in all the tested stats.
    let goodStatCnt = 0;
    for (let aStat of testedStats) {
        if (calculatedStats[aStat] >= 1) {
            goodStatCnt += 1;
        }
    }
    if (goodStatCnt == testedStats.length) {
        return SIG('handleTrialAutosuccess', [diffMod, testedStats]);
    }
    // CLOG('not autosuccess');
    
    // If they don't clear that bar, we see if they can cover the difference with items
    let playerAttempt = 0;
    let playerItems = player.items;
    let spentItems = 0;
    for (let aStat of testedStats) {
        if (calculatedStats[aStat] > 0) {
            playerAttempt += 1;
        }
    }
    while (playerAttempt < toBeat && playerItems > 0) {
        spentItems += 1;
        playerItems -= 1;
        playerAttempt += 1;
    }
    if (playerAttempt == toBeat) {
        SIG('spendItems', spentItems);
        return SIG('handleTrialSuccess', [diffMod, testedStats]);
    }
    // CLOG('not success');
    
    // If they can't, we don't penalize them by eating their items anyway (?)
    
    // If they don't clear that bar, we see if they have less than zero in any tested stat
    let underZero = 0;
    for (let aStat of testedStats) {
        if (calculatedStats[aStat] < 0) {
            underZero += 1;
        }
    }
    if (underZero == 0) {
        return SIG('handleTrialFailure', [diffMod, testedStats]);
    }
    else {
        // CLOG('not failure');
        return SIG('handleTrialDireFailure', [diffMod, testedStats]);
    }    
};

PLAY.Author.prototype.exhaustStat = function (aStat) {
    let player = GCON('OVER_PLAYER');
    // let aMsg = 'Player exhausts ' + aStat;
    // SIG('enscribe', aMsg);
    player[aStat] -= 1;
    // let bMsg = 'Player now has ' + player[aStat] + ' ' + aStat
    // SIG('enscribe', bMsg);
    SIG('addTag', 'exhaustedStat');
};

PLAY.Author.prototype.handleTrialAutosuccess = function (aArr) {
    let [diffMod, testedStats] = aArr;
    let player = GCON('OVER_PLAYER');
    // For autosucceeding a trial, you exhaust a single stat point.
    // You also gain a minimal amount of stress.
    let aMsg = 'You breeze through the ' + GCON('CURRENT_EVENT') + ' without hesitation.'
    SIG('enscribe', aMsg);
    SIG('addTag', 'autosuccess');
    
    let aStat = SIG('randFromArray', testedStats);
    SIG('exhaustStat', aStat);
};

PLAY.Author.prototype.handleTrialSuccess = function (aArr) {
    let [diffMod, testedStats] = aArr;
    let player = GCON('OVER_PLAYER');
    // For succeeding in a trial, you exhaust 1-2 stat points.
    // You also gain a small amount of stress.
    // You could also find an item.
    let aMsg = 'You take a calculated risk, but you make it through the ' + GCON('CURRENT_EVENT') + ' unscathed.';
    SIG('enscribe', aMsg);
    SIG('addTag', 'success');
    
    let exhaust;
    if (testedStats.length == 1) {
        exhaust = 1;
    }
    else {
        exhaust = 1 + SIG('aCoin');
    }
    
    let aStat;
    let shuffled = SIG('shuffle', [...testedStats])
    while (exhaust > 0) {
        aStat = shuffled.shift();
        SIG('exhaustStat', aStat);
        exhaust -= 1;
    }
    
    // Let's say the item drop rate here is 50%, and the gear drop rate is 12.5%
    let dropRoll = SIG('d8');
    if (dropRoll == 8 && SIG('getEmptyGearSlots').length > 0) {
        // gear GET
        SIG('getRandomGear');
    }
    else if (dropRoll > 4) {
        SIG('getItems', 1);
    }
};

PLAY.Author.prototype.handleTrialFailure = function (aArr) {
    let [diffMod, testedStats] = aArr;
    let player = GCON('OVER_PLAYER');
    // For failing a trial, you exhaust 1-2 stat points.
    // You also gain a moderate amount of stress.
    // You could also find an item.
    // You could also take a penalty.
    let aMsg = 'Things look bad for a moment, but you try to power through the ' + GCON('CURRENT_EVENT') + '.'
    SIG('enscribe', aMsg);
    SIG('addTag', 'failure');
    
    let exhaust;
    if (testedStats.length == 1) {
        exhaust = 1;
    }
    else {
        exhaust = 1 + SIG('aCoin');
    }
    
    let aStat;
    while (exhaust > 0) {
        aStat = SIG('randFromArray', testedStats);
        SIG('exhaustStat', aStat);
        exhaust -= 1;
    }
    
    // Let's say the item drop rate here is 50%, and the gear drop rate is 12.5%
    let dropRoll = SIG('d8');
    if (dropRoll == 8 && SIG('getEmptyGearSlots').length > 0) {
        // gear GET
        SIG('getRandomGear');
    }
    else if (dropRoll > 4) {
        SIG('getItems', 1);
    }
    
    // Let's say the penalty rate here is based on the difficulty modifier
    let authorBase = GCON('AUTHOR_BASE');
    let weightedSets = authorBase.weightedSets;
    let failMod = 'failureMod' + diffMod;
    let penalty = SIG('weightedRand', [...weightedSets[failMod]]);
    if (penalty != 'nothing') {
        SIG('handlePenalty', penalty);
    }
};

PLAY.Author.prototype.handleTrialDireFailure = function (aArr) {
    let [diffMod, testedStats] = aArr;
    let player = GCON('OVER_PLAYER');
    // For direfailing a trial, you exhaust no stat points.
    // You also gain a significant amount of stress.
    // You also roll to take a penalty.
    let aMsg = 'You thought you were handling the ' + GCON('CURRENT_EVENT') + ' well enough, but things go suddenly and terribly wrong.'
    SIG('enscribe', aMsg);
    SIG('addTag', 'direfailure');
    
    // Let's say the penalty rate here is based on the difficulty modifier
    let authorBase = GCON('AUTHOR_BASE');
    let weightedSets = authorBase.weightedSets;
    let direfailMod = 'direfailureMod' + diffMod;
    let penalty = SIG('weightedRand', [...weightedSets[direfailMod]]);
    if (penalty != 'nothing') {
        SIG('handlePenalty', penalty);
    }
};

PLAY.Author.prototype.handlePenalty = function (aPen) {
    let aMsg = false;
    switch (aPen) {
        case 'loseGear': 
            if (SIG('getFullGearSlots').length > 0) {
                SIG('loseRandomGear');
            }
            // else you dodged a bullet there, brother
            break;
        case 'lilStress':
            aMsg = 'You feel your heart skip a beat and pause.';
            SIG('addTag', aPen);
            break;
        case 'bigStress':
            aMsg = 'You struggle to regain your bearings.';
            SIG('addTag', aPen);
            break;
        case 'direStress':
            aMsg = 'You wonder if this is the end for you.';
            SIG('addTag', aPen);
            break;
    }
    if (aMsg) {
        SIG('enscribe', aMsg);
    }
};

PLAY.Author.prototype.assessStress = function () {
    let player = GCON('OVER_PLAYER');
    let curStress = player.stress;
    // Player stress can be anywhere between 0 and 99.
    // Once it hits 100, you lose and die.
    
    // Let's say there are 4 levels.
    let stressLevel = 'stressMod';
    if (curStress <= 25) {
        // Minimal stress, we try to build it.
        stressLevel += 0;
    }
    else if (curStress <= 35) {
        // Rising stress, we try to spike it.
        stressLevel += 1;
    }
    else if (curStress <= 85) {
        // Serious stress, we build to that peak.
        stressLevel += 2;
    }
    else {
        // High stress, we give them a release.
        stressLevel += 3;
    }
    
    return stressLevel;
};

PLAY.Author.prototype.resolveEvent = function () {
    // this is where we do stress calculation and win/loss calc
    SIG('calculateStress');
    // right now we're just gonna say any trial you clear is 1 point.
    let player = GCON('OVER_PLAYER');
    let score;
    if (player.stress >= player.stressCap) {
        SIG('playerLoses');
    }
    else {
        score = GCON('PLAYER_SCORE');
        SCON('PLAYER_SCORE', score + 1);
        if (GCON('PLAYER_SCORE') >= GCON('POINTS_TO_WIN')) {
            SIG('playerWins');
        }
    }
};

PLAY.Author.prototype.calculateStress = function () {
    let player = GCON('OVER_PLAYER');
    let stressTags = GCON('STRESS_TAGS');
    let authorBase = GCON('AUTHOR_BASE');
    let tagValues = authorBase.tagValues;
    
    for (let aTag of [...stressTags]) {
        player.stress += tagValues[aTag];
    }
    SIG('clearTags');
    // let aMsg = 'Player stress is now ' + player.stress;
    // SIG('enscribe', aMsg);
};

PLAY.Author.prototype.playerLoses = function () {
    // idk what else I might need to do here
    SCON('IS_PLAYER_DEAD', true);
    aMsg = 'You feel the darkness closing in, and soon you are dead.';
    SIG('enscribe', aMsg);
    // CLOG('Player loses');
    // ALOSS();
};

PLAY.Author.prototype.playerWins = function () {
    // idk what else I might need to do here
    SCON('HAS_PLAYER_WON', true);
    aMsg = 'As you round the corner, you see the object of your quest, and you smile. You have won.';
    SIG('enscribe', aMsg);
    // CLOG('Player wins');
    // AWIN();
};
    



/*
*
*
* Courtesy Spaces
*
*
*/