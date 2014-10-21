import { predictor } from './predictor';

class Results {
	constructor() {
		this.main = el('#results');
	}
	/**
		Results.appendResult
		Добавляет подсказки к запросу поиска

			@mainText - String. Строка с основным текстом
			@predict - Array. Массив до пяти элементов с подсказками результатов. 
	*/
	appendResult(mainText, predicts) {
		if (predicts != null) {
			for (let predict of predicts) {
				this._createElement(mainText, predict);
			}
		}
	}

	/**
		Results.removeResults
		Очистка подсказок для запроса
	*/
	removeResults() {
		let results = el('.result');
		while (results.length !== 0) {
			this.main.removeChild(results[0]);
		}
	}

	_createElement(text, predict) {
		let DOM = {
			result: document.createElement('div'),
			p: document.createElement('p'),
			span: document.createElement('span')
		};

		DOM.result.className = 'result';
		DOM.p.innerText = text;
		DOM.span.innerText = predict;
		DOM.p.appendChild(DOM.span);
		DOM.result.appendChild(DOM.p);

		this.main.appendChild(DOM.result);
	}
}

var results = new Results;

results.appendResult('Мой до', ['машний номер', 'рогой человек']);

watchDOM(el('#search'), (value, last) => {

	if (value.length > 0) {
		let words = value.split(' ');
		let unused = (words.length >= 2) ? words.splice(0, words.length - 2) : new Array;

		predictor.predict(words, (error, result) => {
			results.removeResults();
			results.appendResult(value, result);	
		});
	}
	else
		results.removeResults();
});