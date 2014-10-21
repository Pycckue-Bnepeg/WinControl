class Window {
	constructor() {
		this.gui = nwrequire('nw.gui');
		this.win = this.gui.Window.get();

		this.createTray();
		this.binding();

		this.gui.Screen.Init();
		let height = this.gui.Screen.screens[0].work_area.height;
		this.win.moveBy(0, -parseInt((height / 2.5) - 200));
	}
	/**
		Window.binding
		Добавление горячих клавиш
	*/
	binding() {
		let that = this;
		let shortcutOpen = new this.gui.Shortcut({
			key: 'Ctrl+Alt+W',
			active: () => that.show()
		});
		this.gui.App.registerGlobalHotKey(shortcutOpen);
	}

	/**
		Window.show
		Разворачивание окна поиска
	*/
	show() {
		this.win.show();
		this.win.focus();
		el('#search').focus();
	}

	/**
		Window.hide
		Прячет окно поиска
			@clear - Boolean. Очищать строку поиска и результаты.
	*/
	hide(clear = true) {
		this.win.hide();
		if (clear) {
			el('#search').value = '';
		}
	}

	/**
		Window.close
		Закрывает приложение.
	*/
	close() {
		this.win.close();
	}

	/**
		Window.createTray
		Создает трей с функциями управления
	*/
	createTray() {
		let onClickSettings = () => {};

		let tray = new this.gui.Tray({
			title: 'WinControl',
			icon: './src/images/icon.png'
		});

		let trayMenu = new this.gui.Menu;
		trayMenu.append( new this.gui.MenuItem({ label: 'Open', click: () => this.show() }) );
		trayMenu.append( new this.gui.MenuItem({ label: 'Settings', click: onClickSettings }) );
		trayMenu.append( new this.gui.MenuItem({ type: 'separator' }) );
		trayMenu.append( new this.gui.MenuItem({ label: 'Close', click: () => this.close() }) );

		tray.menu = trayMenu;
	}
}

export let win = new Window();