import { win } from './app';
//import { Modules } from './modules';

let exec = require('child_process').exec;
let querystring = require('querystring');

let URLRegExp = /^(http(s?):\/\/[\wа-я]+\.[\wа-я]+)/;
let shortURLRegExp = /([\wа-я]+\.[\wа-я]{2,})(\/|$)/;

let onkeyup = (event) => {
	if (event.keyCode === 27) // Escape -> Скрываем окно
		win.hide();
	if (event.keyCode === 13) {
		// Enter
		let command = el('#search').value;
		let escapeURL = querystring.escape(command);

		if (shortURLRegExp.test(command)) {
			if (URLRegExp.test(command))
				exec(`start ${escapeURL}`);
			else
				exec(`start http://${escapeURL}`);
		} 
		else /* TODO: Добавить выбор поискового сервиса
			Поиск в выбранном поисковом сервисе (Пока что только Google) */
			exec(`start http://google.com/search?q=${escapeURL}`);

		win.hide();
	}
};

document.onkeyup = onkeyup;