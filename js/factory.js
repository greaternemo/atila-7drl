// PLAY.Factory
// Big ol' factory for generating non-system objects

PLAY.Factory = function () {};

/*
PLAY.Factory.prototype. = function () {};
*/

PLAY.Factory.prototype.makePlayer = function () {
    let newPlayer = new PLAY.Player();
    let newEid = SIG('registerEntity', newPlayer);
    SCON('OVER_PLAYER', newEid);
    return newEid;
};

PLAY.Factory.prototype.makeItem = function () {};

PLAY.Factory.prototype.makeMob = function () {};

PLAY.Factory.prototype.makeVignette = function () {};

PLAY.Factory.prototype.makeStory = function () {};

/*
*
*
* Courtesy Spaces
*
*
*/