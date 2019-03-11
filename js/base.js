// PLAY.BASE
// Template and reference data

PLAY.BASE = {

    Routes: {
        Author: [
            // filler line
            'enscribe',
            'addTag',
            'clearTags',
            'clearEvent',
            'clearAllStory',
            'buildStory',
            'buildPlayer',
            'randomizePlayerStats',
            'randomizePlayerKit',
            'randomStat',
            'setPlayerStats',
            'buildLog',
            'tribulate',
            'decideNextEvent',
            'recoveryEvent',
            'healUpToZero',
            'healUpToBase',
            'getItems',
            'spendItems',
            'getEmptyGearSlots',
            'getFullGearSlots',
            'getRandomGear',
            'loseRandomGear',
            'trialEventDiff0',
            'trialEventDiff1',
            'trialEventDiff2',
            'trialEventDiff3',
            'handleTrial',
            'exhaustStat',
            'handleTrialAutosuccess',
            'handleTrialSuccess',
            'handleTrialFailure',
            'handleTrialDireFailure',
            'handlePenalty',
            'assessStress',
            'resolveEvent',
            'calculateStress',
            'playerLoses',
            'playerWins',
        ],
        Controller: [
            // filler line
            'handleCurrentTurn',
            'endCurrentTurn',
            'toggleGameLoopDelay',
            'toggleViewLoopDelay',
            'toggleGameLoop',
        ],
        Factory: [
            // filler line
            'makePlayer',
            'makeItem',
            'makeMob',
            'makeStory',
            'makeVignette',
        ],
        Game: [
            // filler line
            'doTheGame',
            'doNextTurn',
            'changeGameLoopDelay',
        ],
        Input: [
            // filler line
            'startListeningForInput',
            'stopListeningForInput',
            'startNewInputContext',
            'endCurrentInputContext',
            'parseRawKeydown',
            'queueInput',
            'handleInput',
            'pressButton',
            'numpad1',
            'numpad2',
            'numpad3',
            'numpad4',
            'numpad5',
            'numpad6',
            'numpad7',
            'numpad8',
            'numpad9',
            'keyarrowup',
            'keyarrowright',
            'keyarrowdown',
            'keyarrowleft',
            'keyspace',
            'keyescape',
            'keyf',
        ],
        /*
        Item: [
            // filler line
        ],
        */
        /*
        Mob: [
            // filler line
        ],
        */
        Narrator: [
            'narrate',
            'colorrate',
            'clearMsgPanel',
            'lineBreak',
            'addLine',
            'addColorLine',
            'narrateAction',
            'getDescriptor',
        ],
        Player: [
            // filler line
        ],
        Registry: [
            'getEid',
            'setEid',
            'getConst',
            'setConst',
            'importConstants',
            'registerEntity',
            'generateUeid',
            'chaseDown',
            'destroyEntity',
        ],
        /*
        Story: [
            // filler line
        ],
        */
        Util: [
            'rand',
            'rander',
            'weightedRand',
            'aDie',
            'aCoin',
            'd2',
            'd4',
            'd6',
            'd8',
            'd10',
            'd12',
            'd20',
            'genNum',
            'randomName',
            'randomNolan',
            'shuffle',
            'randFromArray',
            'cap',
            'byId',
            'scrollToNew',
            'enpair',
            'depair',
            'entrio',
            'detrio',
            'intGreaterOf',
            'intLesserOf',
        ],
        View: [
            'drawNextLine',
            'changeViewLoopDelay',
        ],
        /*
        Vignette: [
            // filler line
        ],
        */
    },

    RefData: {
        // 30 fps gets really bogged down with multiple mobs, let's try faster
        // loopDelay: (1000/30),
        // loopDelay: (1000/60),
        // loopDelay: (1000/120),
        loopDelay: 1000,
        fasterDelay: (1000/30),
        gamePaused: false,
        
        // Flags
        listenNumpad: true,
        playerTurn: false,
        readyForTurn: false,
        
        isPlayerDead: false,
        hasPlayerWon: false,
        // pointsToWin: 10,
        
        // 125 ptw creates about a 495:5 loss/win ratio
        // pointsToWin: 125,

        // 100 ptw creates about a 485:15 loss/win ratio
        // pointsToWin: 100,

        // 75 ptw creates something between a 465:35 and 450:50 loss/win ratio
        // pointsToWin: 75,

        // 65 feels about right
        // 65 ptw creates about a 445:55 loss/win ratio
        pointsToWin: 65,

        rawStory: [],
        stressTags: [],
        finalLog: [],
        readLog: [],
        unreadLog: [],
        logQueue: [],
        
        // Base data
        
        authorList: [],
        
        authorBase: {
            // tests
            weightedSets: {
                tests: [
                    ['trialEventDiff0', 5],
                    ['trialEventDiff1', 45],
                    ['trialEventDiff2', 35],
                    ['trialEventDiff3', 15],
                ],
                stressMod0: [
                    // ['trialEventDiff0', 5],
                    ['trialEventDiff1', 55],
                    ['trialEventDiff2', 35],
                    ['trialEventDiff3', 10],
                ],
                // bad place to be, right here
                stressMod1: [
                    // ['trialEventDiff0', 5],
                    ['trialEventDiff1', 10],
                    ['trialEventDiff2', 10],
                    ['trialEventDiff3', 80],
                ],
                stressMod2: [
                    ['trialEventDiff0', 15],
                    ['trialEventDiff1', 25],
                    ['trialEventDiff2', 50],
                    ['trialEventDiff3', 15],
                ],
                stressMod3: [
                    ['trialEventDiff0', 100],
                    // ['trialEventDiff1', 45],
                    // ['trialEventDiff2', 35],
                    // ['trialEventDiff3', 15],
                ],
                failureMod1: [
                    ['nothing', 80],
                    ['loseGear', 10],
                    ['lilStress', 10],
                ],
                failureMod2: [
                    ['nothing', 70],
                    ['loseGear', 15],
                    ['lilStress', 15],
                ],
                failureMod3: [
                    ['nothing', 60],
                    ['loseGear', 20],
                    ['lilStress', 25],
                    ['bigStress', 5],
                ],
                direfailureMod1: [
                    ['loseGear', 9],
                    ['lilStress', 69], // nice
                    ['bigStress', 19],
                    ['direStress', 3],
                ],
                direfailureMod2: [
                    ['loseGear', 15],
                    ['lilStress', 50],
                    ['bigStress', 25],
                    ['direStress', 10],
                ],
                direfailureMod3: [
                    ['loseGear', 25],
                    ['lilStress', 25],
                    ['bigStress', 35],
                    ['direStress', 15],
                ],
                
            },
            tagValues: {
                autosuccess: 0,
                success: 3,
                failure: 7,
                direfailure: 15,
                spentItems: 5,
                exhaustedStat: 5,
                lilStress: 5,
                bigStress: 10,
                direStress: 20,
            },
            eventThemes: [
                'TRAP',
                'CLIMB',
                'FIGHT',
                'PUZZLE',
            ]
        },

        floorList: [
            'floor1',
            'floor2',
            'floor3',
            'floor4',
            'floor5',
        ],

        floorBase: {
            floor1: {
            },
            floor2: {
            },
            floor3: {
            },
            floor4: {
            },
            floor5: {
            },
        },
        
        inputBase: {
            knownKeys: [
                /*
                'numpad1',
                'numpad2',
                'numpad3',
                'numpad4',
                'numpad5',
                'numpad6',
                'numpad7',
                'numpad8',
                'numpad9',
                'keyarrowup',
                'keyarrowright',
                'keyarrowdown',
                'keyarrowleft',
                'keyspace',
                'keyescape',
                'keyf',
                */
            ],
            inputContext: {
                allContexts: [
                ],
                transitions: {
                },
            },
        },
        
        mobList: [
            'player',
            'gobbo',
        ],

        mobBase: {
            player: {
            },
            gobbo: {
            },
        },
        
        narratorBase: {
            descriptors: {
                WELCOME: [
                    'You hear the door slam behind you. You see, scrawled on the floor, ',
                    'The cave-in leaves the route behind you blocked. Nearby you see, smeared on the wall in black, ',
                    'You awaken in a room with a single door. A note slides under the door. It reads, ',
                    'You come tumbling to a stop next to a well-worn trail. A signpost nearby says, ',
                    "The elevator reaches the end of the shaft. You whisper to the statue your grandfather's last words: ",
                ],
                MOVING_ON: [
                    'You gather your wits and move onward.',
                    'You steel your nerves and proceed.',
                    'You sigh and start walking.',
                    'You pick a direction and go that way.',
                    'You follow a sound in the distance.',
                ],
                RECOVERY_EVENT: [
                    'You find a glowing spring and sip from it.',
                    'You stop for a moment and tend to your wounds.',
                    'You find a quiet place to meditate for a moment.',
                    'You find a snack in your pocket and stop for a bite.',
                ],
                STRESS_RELIEF: [
                    'Your aching muscles start to relax.',
                    'Your heartbeat steadies and you feel a bit better.',
                    'You doze briefly and have a much-needed power nap.',
                    'You sip from a canteen and the water is heavenly.',
                    'You sip from a flask and everything is a bit less awful.',
                    'You whisper a prayer and catch a second wind.'
                ],
                HEAL_TO_ZERO: [
                    'You feel pretty rough but you resolve to go on.',
                    'You bandage up a cut and you feel well enough to keep going.',
                    'Your stomach burbles and you vomit, but feel better afterward.',
                    'You fix your hair and shake the stones from your shoes, and it does the trick.',
                ],
                HEAL_TO_BASE: [
                    'You manage to pop your back and you immediately feel as good as you did when you got here.',
                    'You reflect on your journey and gain some insight to help you keep going.',
                    'You find some gum in your pocket and the small comfort helps perk you up.',
                    'You take stock of your gear and your wits and you feel ready for whatever comes.'
                ],
                USED_1_ITEMS: [
                    'You feel something slip from your pocket and break on the floor.'
                ],
                USED_2_ITEMS: [
                    'You look for something useful in your pack and fumble a couple things out, which break on the floor.'
                ],
                USED_3_ITEMS: [
                    'You realize your pack feels lighter, and you find a small hole. You realize a few things are missing.'
                ],
                MOD1_TRAP: [
                    'You feel a click underfoot and freeze.',
                ],
                MOD2_TRAP: [
                    'You notice a number of skeletons nearby with arrows piercing them.'
                ],
                MOD3_TRAP: [
                    'You feel the floor beneath you rumble and immediately break into a run.'
                ],
                MOD1_CLIMB: [
                    'You see the way forward is over a low wall.'
                ],
                MOD2_CLIMB: [
                    'You find a rotting wooden ladder that appears to be the way forward.'
                ],
                MOD3_CLIMB: [
                    'You enter a dead end and see an old-looking rope tied off and running down into a well.'
                ],
                MOD1_FIGHT: [
                    'You hear a loud squawk and realize there is a large bird guarding its nest nearby.'
                ],
                MOD2_FIGHT: [
                    'You hear some loud chittering and notice a goblin asserting a claim on the floor beneath your feet. They approach you with teeth bared.'
                ],
                MOD3_FIGHT: [
                    'There is a gnashing of gears behind you as what looked like a statue becomes animate and approaches you threateningly.'
                ],
                MOD1_PUZZLE: [
                    'You find a wooden puzzle box with the handle of a key sticking out of it.'
                ],
                MOD2_PUZZLE: [
                    'You approach a large combination lock, pushing charred skeletons aside.'
                ],
                MOD3_PUZZLE: [
                    'A sphinx blocks your path and smiles slyly at you as it recites a riddle.'
                ],
            },
        },

        
        playerBase: {
            statNames: [
                'grit',
                'luck',
                'nosy',
                'rash',
                'want',
            ],
            gearSlots: [
                'armor',
                'weapon',
                'shield',
                'tool',
                'trinket',
            ],
            possibleStats: [
                [1, 1, 1, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 1, 1],
                [1, 0, 0, 1, 1],
                [1, 1, 0, 0, 1],
            ],
        },
        
        cardBase: {
            stdDeck: [
              "1,S", "2,S", "3,S", "4,S", "5,S",
              "6,S", "7,S", "8,S", "9,S", "0,S",
              "J,S", "Q,S", "K,S",
              "1,C", "2,C", "3,C", "4,C", "5,C",
              "6,C", "7,C", "8,C", "9,C", "0,C",
              "J,C", "Q,C", "K,C",
              "1,D", "2,D", "3,D", "4,D", "5,D",
              "6,D", "7,D", "8,D", "9,D", "0,D",
              "J,D", "Q,D", "K,D",
              "1,H", "2,H", "3,H", "4,H", "5,H",
              "6,H", "7,H", "8,H", "9,H", "0,H",
              "J,H", "Q,H", "K,H"
            ],
            // the 4 suits are courage, effort, force, and guile
            tarotDeck: [
              "1,C", "2,C", "3,C", "4,C", "5,C",
              "6,C", "7,C", "8,C", "9,C", "A,C",
              "B,C", "C,C", "D,C", "E,C",
              "1,E", "2,E", "3,E", "4,E", "5,E",
              "6,E", "7,E", "8,E", "9,E", "A,E",
              "B,E", "C,E", "D,E", "E,E",
              "1,F", "2,F", "3,F", "4,F", "5,F",
              "6,F", "7,F", "8,F", "9,F", "A,F",
              "B,F", "C,F", "D,F", "E,F",
              "1,G", "2,G", "3,G", "4,G", "5,G",
              "6,G", "7,G", "8,G", "9,G", "A,G",
              "B,G", "C,G", "D,G", "E,G",
              "1,A", "2,A", "3,A", "4,A", "5,A",
              "6,A", "7,A", "8,A", "9,A", "A,A",
              "B,A", "C,A", "D,A", "E,A", "F,A",
              "G,A", "H,A", "I,A", "J,A", "K,A",
              "L,A", "M,A",
            ],
        },
        
        // base data for our VIEW_MAP
        viewBase: {
        },

    },

    /*
    
    Constant naming conventions:
    
    dir: A direction. Includes cardinal directions and up/down.
    loc: A location, as coordinates. Generally a string in the form 'X,Y' or 'X,Y,Z'.
    map: An abstraction meant as a collection of generated and/or state data.
    
    <>_LIST: An array containing all the keys for the corresponding BASE table.
    <>_BASE: A table containing base data for object generation.
    <>_LOCS: An array containing all relevant locs for a specific map.
    <>_MAP: A table containing generated and/or state data
    
    */
    
    Constants: [
        // filler line
        'LOOP_DELAY',       // ro, float, standard loop delay in ms
        'FASTER_DELAY',     // ro, float, faster loop delay in ms
        'GAME_PAUSED',      // rw, bool, flag to tell if the game loop is paused
        'VIEW_LOOP_DELAY',  // rw, float, the view loop delay in ms
        'GAME_LOOP_DELAY',  // rw, float, the game loop delay in ms

        'INPUT_BASE',       // ro, table, base data for our input system
        'INPUT_CONTEXT',    // rw, array, a list of input layers from current to deepest

        'AUTHOR_BASE',      // ro, table, base data for our author system
        'RAW_STORY',        // ro, array, compilation of symbols that become the story proper
        'IS_PLAYER_DEAD',   // rw, bool, has the player died in the story
        'HAS_PLAYER_WON',   // rw, bool, has the player won in the story
        'POINTS_TO_WIN',    // ro, int, score the player must meet to win
        'PLAYER_SCORE',     // rw, int, current player score
        'STRESS_TAGS',      // rw, array, tags from each encounter for adding stress

        'NARRATOR_BASE',    // ro, table, base data for our narrator system
        'CURRENT_EVENT',    // rw, str, the descriptor for the current event
        'CURRENT_TARGET',   // rw, str, the descriptor for the current event target
        'CURRENT_ITEM',     // rw, str, the descriptor for the current event item

        'FINAL_LOG',        // ro, array, complete list of log messages for the current story
        'READ_LOG',         // rw, array, list of log messages that have been written to the screen
        'UNREAD_LOG',       // rw, array, list of log messages that have not yet been queued to be written
        'LOG_QUEUE',        // rw, array, list of log messages that are ready to be written to the screen

        'VIEW_BASE',        // ro, table, tables of view map base data
        'READY_TO_DRAW',    // rw, bool, is the map ready to attempt a redraw

        'CURRENT_FLOOR',    // rw, string, name of the floor the player is on
        'FLOOR_LIST',       // ro, array, floor names as strings
        'FLOOR_BASE',       // ro, table, tables of floor base data, keyed by floor name

        'PLAYER_BASE',      // ro, table, tables of mob data, keyed by mob type
        'OVER_PLAYER',      // rw, int, eid for the player object

        'MOB_LIST',         // ro, array, mob types as strings
        'MOB_BASE',         // ro, table, tables of mob data, keyed by mob type
        'ALL_MOBS',         // rw, array, eids for all mobs
        'PLAYER_MOB',       // rw, int, eid for the player mob

        'GAME_OVER',        // rw, bool, is the player dead and do we need to start a new game
        'INPUT_BUFFER',     // rw, array, signals waiting to be processed
        'LISTEN_NUMPAD',    // rw, bool, are we accepting numpad input
        'PLAYER_TURN',      // rw, bool, is it the player's turn
        'END_OF_TURN',      // rw, bool, is it time for end of turn cleanup
        'READY_FOR_TURN',   // rw, bool, has the last turn completed
    ],
    
    /*
    Additional details for Constants
    
    A)
    GRID_MAP was a table with values keyed to grid locs.
    The values in GRID_MAP are also tables.
    Each of those tables have node locs as the keys and the related phys locs as the values.
    GRID_MAP: {
        '0,0': {
            '0,0': '0,0',
            '1,0': '1,0',
            ...
        },
        '1,0': {
            '0,0': '10,0',
            '1,0': '11,0',
            '2,0': '12,0',
            ...
        },
        ...
    }
    
    B)
    GRID_SIDE_REFS is redundant, all of the locs it contains should be in SIDE_REFS, but it's just way,
    WAY less of a hassle to build a separate table of side refs for a smaller grid size than testing everything
    against the grid dimensions any time we try to do grid math.
    It's just cleaner this way.
    
    */

    // The Schema table establishes default values for constants.
    Schema: {
        // filler line
        LOOP_DELAY:         'loopDelay',
        FASTER_DELAY:       'fasterDelay',
        GAME_PAUSED:        'gamePaused',
        VIEW_LOOP_DELAY:    'fasterDelay',
        GAME_LOOP_DELAY:    'loopDelay',

        AUTHOR_BASE:        'authorBase',
        RAW_STORY:          'rawStory',
        IS_PLAYER_DEAD:     'isPlayerDead',
        HAS_PLAYER_WON:     'hasPlayerWon',
        POINTS_TO_WIN:      'pointsToWin',
        STRESS_TAGS:        'stressTags',
        
        NARRATOR_BASE:      'narratorBase',
        FINAL_LOG:          'finalLog',
        READ_LOG:           'readLog',
        UNREAD_LOG:         'unreadLog',
        LOG_QUEUE:          'logQueue',

        INPUT_BASE:         'inputBase',

        VIEW_BASE:          'viewBase',
        VIEW_LOCS:          'viewLocs',

        FLOOR_LIST:         'floorList',
        FLOOR_BASE:         'floorBase',

        PLAYER_BASE:        'playerBase',

        MOB_LIST:           'mobList',
        MOB_BASE:           'mobBase',

        LISTEN_NUMPAD:      'listenNumpad',
        PLAYER_TURN:        'playerTurn',
        READY_FOR_TURN:     'readyForTurn',
    },

};



/*
 *
 *
 *
 * Courtesy Spaces
 *
 *
 *
 */