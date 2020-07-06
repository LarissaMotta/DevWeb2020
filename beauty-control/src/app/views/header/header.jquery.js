/*!
 * Contém métodos que utilizam Jquery como uma forma de "isolar" o componente de sua instância.
*/

const ID_SELECTOR = '#';

function initSideNav(id) {
	$(`${ID_SELECTOR}${id}`).sideNav();
}