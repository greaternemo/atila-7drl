// PLAY.Narrator

PLAY.Narrator = function (params) {
    this.init();
};

PLAY.Narrator.prototype.init = function () {
    let msgPanel = SIG('byId', 'msg_panel');
    let aMsg = document.createElement('code');
    let bDesc = this.getDescriptor('WELCOME');
    let bMsg = bDesc + "'All that is lies ahead.'";
    aMsg.appendChild(document.createTextNode(bMsg));
    msgPanel.appendChild(aMsg);
};

//

PLAY.Narrator.prototype.narrate = function(aLine) {
    //this.buildMsg();
    this.addLine(aLine);
};

//

PLAY.Narrator.prototype.colorrate = function (nData) {
    this.addColorLine(nData);
};

//

PLAY.Narrator.prototype.clearMsgPanel = function () {
    let msgPanel = SIG('byId', 'msg_panel');
    while (msgPanel.hasChildNodes() === true) {
        msgPanel.removeChild(msgPanel.firstChild);
    }
    // let aMsg = document.createElement('code');
    // aMsg.className = "msg_feed";
    // aMsg.appendChild(document.createTextNode('Starting new game!'));
    // msgPanel.appendChild(aMsg);
    // SIG('lineBreak');
};

//

PLAY.Narrator.prototype.lineBreak = function () {
    let msgPanel = SIG('byId', 'msg_panel');
    msgPanel.appendChild(document.createElement('br'));
};

//

PLAY.Narrator.prototype.addLine = function (aLine) {
    SIG('lineBreak');
    let msgPanel = SIG('byId', 'msg_panel');
    let aMsg = document.createElement('code');
    aMsg.appendChild(document.createTextNode(aLine));
    msgPanel.appendChild(aMsg);
    SIG("scrollToNew", msgPanel);
};

//

PLAY.Narrator.prototype.addColorLine = function (nData) {
    let [aLine, aColor] = nData;
    SIG('lineBreak');
    let msgPanel = SIG('byId', 'msg_panel');
    let aMsg = document.createElement('code');
    aMsg.appendChild(document.createTextNode(aLine));
    aMsg.className = aColor;
    msgPanel.appendChild(aMsg);
    SIG('scrollToNew', msgPanel);
};

//

PLAY.Narrator.prototype.narrateAction = function(params) {
    // This is going to be a new routing point where we'll push individual calls through
    // to functions that will build the narration messages for individual actions
    let[origAction, theDetails] = params;
    let theAction = 'narrate' + origAction;
    SIG(theAction, theDetails);
};


PLAY.Narrator.prototype.getDescriptor = function (aTerm) {
    let narratorBase = GCON('NARRATOR_BASE');
    let descriptors = narratorBase.descriptors;
    let possibles = [...descriptors[aTerm]];
    let final = SIG('randFromArray', possibles);
    return final;
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