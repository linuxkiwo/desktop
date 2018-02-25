import * as Events  from './../../../commonModules/localEvent';
import * as $ from "./../../../commonModules/jquery";
var EventClient: any = Events.Client;
/*variables globales*/
var body:any = $('body'),
	input:any = $('input'),
	menu:any = $('#menu'),
	options:any = $('.modal'),
	modal:any = $('#modal'),
	menu_open:boolean = false;

/*modulos externos*/
var external:any = {};


external.changeImg  = (args:ar)  => {
	console.log(args);
};
/*metodos locales*/

function openMenu(x:number, y:number) {
	/*
	 *Esta funcion se encarga de mostrar el menún de acciones,
	 *ya definido en el dom.
	 *int x, y -> Las coordenadas que en que se tiene que crear
	*/
	menu.css({"display": "block", "top": `${y}px`, "left": `${y}px`});
	//comunication.send()
}
function openModal(){
	/*
	 *Función encargada de mostrar el modal en la pantalla
	*/
	modal.css("display", "block");
}

/*metodos locales llamados por eventos*/
var cliked = (e:any) => {
	/*
	 *Se encarga de registrar los clicks que tiene lugar en el escritorio.
	 *Si es con el derecho, llama a openMenu, en caso de ser con el izquierdo
	 *lo oculta, sin necesidad de llamar a otra función que lo haga.
	 *x e y son las coordenadas en las que tiene que aparecer el menú
	*/
	var	x = e.screenX,
		y = e.screenY;	
	return (e.which === 1) ? menu.removeAttr('style') : (e.which === 3) ? openMenu(x, y) : null;
};
/*control de eventos*/
body.on('mousedown', cliked);
$(options[0]).on('mousedown', openModal);
$(input[1]).on('mousedown', external.changeImg);
var comunication = new EventClient(external);

