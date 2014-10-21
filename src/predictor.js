class Predictor {
	constructor() {
		this.translateKey = 'trnsl.1.1.20140816T144947Z.6f4f01b819e0f7af.f0f9347affe1dafd80e3f58ef95fe1c1530c2eb5';
		this.predictorKey = 'pdct.1.1.20140821T134751Z.ecb045aaae06111a.cc517f69b8c3e268d187e3fa1f576976fe19cabf';
	}

	/**
		Predictor.language
		Получает язык написанного текста
			@words - Array. Массив слов
			@callback - Function(error Object, lang String).
	*/
	language(words, callback) {
		let that = this;
		http.get('https://translate.yandex.net/api/v1.5/tr.json/detect', {
				key: that.translateKey,
				text: words.join(' ')
			}, data => (data.code === 200) ? callback(null, data.lang) : callback(new Error(`Сервер при переводе вернул код ${data.code}`))
		);
	}

	/**
		Predictor.predict
		Предугадывает написание следующего слова
			@words - Array.
			@callback - Function(error Error, predict Array).
	*/
	predict(words, callback) {
		let that = this;
		this.language(words, function(error, result) {
			if (error != null)
				callback(error);
			else {
				let language = result;

				http.get('https://predictor.yandex.net/api/v1/predict.json/complete', {
					key: that.predictorKey,
					q: words.join(' '),
					lang: language,
					limit: 5
				}, function(data) {
					if (data.text == undefined || data.text.length < 1)
						callback(new Error(`Сервер при продолжении фразы вернул код ${data.code}`));
					else {
						let complete = new Array;

						for (let i = 0; i < data.text.length; i++) {
							complete.push( (data.pos == 1) ? ` ${data.text[i]}` : data.text[i].substr(data.pos * -1) );
						}

						callback(null, complete);
					}
				});
			}
		});
	}
}

export let predictor = new Predictor;