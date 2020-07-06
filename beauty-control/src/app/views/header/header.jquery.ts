/*!
 * Contém métodos que utilizam Jquery como uma forma de "isolar" o componente de sua instância.
*/

import * as $ from 'jquery';

const ID_SELECTOR = '#';

export const commonFunctions = {
	initSideNav: (id: string) => { initSideNav(id); }
}

function initSideNav(id: string) {
	$(`${ID_SELECTOR}${id}`).sidenav();
}