"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = require("./../../../commonModules/localEvent");
const $ = require("./../../../commonModules/jquery");
var EventClient = Events.Client;
var body = $('body'), input = $('input'), menu = $('#menu'), options = $('.modal'), modal = $('#modal'), menu_open = false;
var external = {};
external.changeImg = (args) => {
    console.log(args);
};
function openMenu(x, y) {
    menu.css({ "display": "block", "top": `${y}px`, "left": `${y}px` });
}
function openModal() {
    modal.css("display", "block");
}
var cliked = (e) => {
    var x = e.screenX, y = e.screenY;
    return (e.which === 1) ? menu.removeAttr('style') : (e.which === 3) ? openMenu(x, y) : null;
};
body.on('mousedown', cliked);
$(options[0]).on('mousedown', openModal);
$(input[1]).on('mousedown', external.changeImg);
var comunication = new EventClient(external);
//# sourceMappingURL=main.js.map