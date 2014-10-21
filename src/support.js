global.el = (element) => {
	if (element[0] == '#')
		return document.getElementById(element.slice(1));
	else if (element[0] == '.')
		return document.getElementsByClassName(element.slice(1));
	else
		return document.getElementsByTagName(element);
};

function Watcher() {
	var that = this;

	this._objects = new Array;
	this._watcher = function() {
		for (var i = 0; i < that._objects.length; i++) {
			var _object = that._objects[i];
			if (_object.last !== _object.DOM.value) {
				_object.callback(_object.DOM.value, _object.last);
				that._objects[i].last = _object.DOM.value;
			}
		}
	};
	var watch = function(element, callback) {
		this._objects.push({
			last: element.value,
			DOM: element,
			callback: callback
		});
	};
	setInterval(this._watcher, 10);
	return watch.bind(this); 
}

global.http = {
	_xml: function(method, uri, callback) {
		let xml = new XMLHttpRequest();
		xml.open(method, uri);
		xml.onreadystatechange = function() {
			if (xml.readyState !== 4)
				return;
			(callback !== undefined) ? callback( JSON.parse(xml.responseText) ) : void 0;
		};
		return xml;
	},

	/**
		http.get
		GET запрос на заданный URI
			@uri - String. Адрес страницы
			@data - Object. Данные для запроса (Необязательный параметр)
			@callback - Function(response String). (Необязательный параметр)
	*/
	get: function(uri, data, callback) {
		let querystring = require('querystring');
		let xml = this._xml('GET', uri + '?' + querystring.stringify(data), callback);
		xml.send(null);
	},

	/**
		http.post
		POST запрос на заданный URI
			@uri - String. Адрес страницы
			@data - Object. Данные для запроса (Необязательный параметр)
			@callback - Function(response String). (Необязательный параметр)
	*/
	post: function(uri, data, callback) {
		let querystring = require('querystring');
		let xml = this._xml('GET', uri, callback);
		xml.send(data);	
	}
};

global.watchDOM = new Watcher();