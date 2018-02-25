'use strict';
/*Importación de módulos */
const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path');
const url = require('url');

/*modulos propios*/
const EventServer = require('./../../commonModules/localEvent').Server;

/*Variables globales*/
var win,
	configFile = __dirname + '/../../commonModules/config.json',
	json = {},
	user = 'lucas'; //Esto se deberá cambiar más adelante

/*Declaración de las funciones globales*/
var external = {};
external.changeImg = () => {

};


/*metodos locales*/
var createWin = () => {
	win = new BrowserWindow({fullscreen: false, frame: true});
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'public/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	win.webContents.openDevTools();
	win.on('closed', function () {
		win = null
	})
};
var closeWin = () => app.quit();

var loadConfig = ()=>{
	let data = fs.readFileSync(configFile)
	json = JSON.parse(data);	
};
var updatebackgroundImg = () =>{	
	let bkgrUri = json[user]['deskop-image'];	
	fs.readFile(__dirname+'/public/css/style.css', 'utf8', (err, data) => {
		data = data.replace('%backgroundUri%', bkgrUri);
		fs.writeFile(__dirname+'/public/css/style_tmp.css', data, (err) => {
			if (err) return console.log(err);
		});
	});
};
var updateConfig = (changes) => {
	let field = change[0],
		value = change[1];
	json['user'][field] = value;	
};

/*ejecución de funciones inicales*/
loadConfig();
updatebackgroundImg();

/*metodos globales*/
var comunication = new EventServer(external);
/*eventos*/
app.on('ready', createWin);
app.on('window-all-closed', closeWin);