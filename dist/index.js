'use strict';
/*Importación de módulos */
const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path');
const url = require('url');
const { exec } = require('child_process');
/*modulos propios*/
const EventServer = require('./../../commonModules/localEvent').Server;

/*Variables globales*/
var win,
	configFile = __dirname + '/../../commonModules/config.json',
	appsPath = __dirname + '/../../',
	json = {},
	user = 'lucas'; //Esto se deberá cambiar más adelante
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

/*Declaración de las funciones globales*/
var external = {};
external.openApps =  (args) => {
	var response,
		action;
	let p = exec(`electron ${appsPath}${args[0]} ${args[1]}`, (err, stdout, stderr) => {
		
		response = JSON.parse(stdout);
		action = toChange(response);		
		updatebackgroundImg();
	});	
	p.on('close', ()=>{
		comunication.send(win, action[0], action[1])
	});	
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
	let bkgrUri = json['deskop_image'];
	fs.readFile(__dirname+'/public/css/style.css', 'utf8', (err, data) => {
		data = data.replace('%backgroundUri%', bkgrUri);
		fs.writeFile(__dirname+'/public/css/style_tmp.css', data, (err) => {
			if (err) return console.log(err);
		});
	});
};
var updateConfig = (changes) => {
	let field = changes[0],
		value = changes[1];
	json[field] = value;
	fs.writeFile(configFile, JSON.stringify(json), (e) => {
		if (e) console.error(e)
	})
};
var toChange = (json) =>{
	let toReturn = []
	switch(json['action']){
		case 'changeImg':
			updateConfig(['deskop_image', json['message']]);
			toReturn.push(json['action']);
			toReturn.push(json['message']);
			break;
		default:
			break;
	}
	return toReturn;
};
/*ejecución de funciones inicales*/
loadConfig();
updatebackgroundImg();

/*metodos globales*/
var comunication = new EventServer(external);
/*eventos*/
app.on('ready', createWin);
app.on('window-all-closed', closeWin);