var LITAPP = {};

LITAPP.Application_cl = Class.create({
	initialize: function () {
		var self = this;
		this.db = new Database(this);
		this.user = null;

		LITAPP.es_o.subscribe_px(this, 'app');
	},
	notify_px: function (self_opl, message_spl, data_apl) {
		switch (message_spl) {
			case 'app':
				switch (data_apl[0]) {
					case 'init':
						this.loadUser();
						LITAPP.tm_o = new TELIB.TemplateManager_cl();
						break;
					case 'templates.loaded':
						if(this.user !== null && this.user.rolle == 'admin') {
							self_opl.render_init_list();
						} else if(this.user !== null) {
							self_opl.viewModules();
						} else {
							self_opl.render_px('login', {});
						}
						break;
					default:
						console.warning('[Application_cl] unbekannte app-Notification: '+data_apl[0]);
						break;
				}
				break;
			default:
				console.warning('[Application_cl] unbekannte Notification: '+message_spl);
				break;
		}
	},
	render_init_list: function() {
		if(this.checkUser('adm_studiengaenge')) {
			this.db.getStudiengaenge(true);
		}
	},
	render_px: function(template_name, data) {
		var self = this;

		if(template_name != 'login' && !this.checkUser(template_name)) {
			return false;
		}
		$('#content').html(LITAPP.tm_o.execute_px(template_name + '.tpl', data));

		$('button:not([type="submit"]), .function').click(function() {
			var action = $(this).data('action');
			if($(this).is('.function')) {
				action = 'function';
			}

			switch(action) {
				case 'login':
					self.render_px("login", {});
					break;
				case 'studiengang.list':
					self.render_init_list();
					break;
				case 'studiengang.create':
					self.render_px("adm_studiengang_create", {});
					break;
				case 'modul.create':
					self.render_px("adm_modul_create", {});
					break;
				case 'function':
					var functionName = $(this).data('function');
					eval("self." + functionName + "(this);");
					break;
				default:
					console.log("Action unbekannt: " + action);
					break;
			}
		});

		if ($('#form_studiengang_edit').length > 0) {
			$('#form_studiengang_edit').submit(function(e) {
				var studiengangId = $(this).data('id');
				e.preventDefault();
				var values = {};
				$(this).find('input').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.saveStudiengang(studiengangId, values);
			});
		}

		if ($('#form_studiengang_create').length > 0) {
			$('#form_studiengang_create').submit(function(e) {
				e.preventDefault();
				var values = {};
				$(this).find('input').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.createStudiengang(values);
			});
		}

		if ($('#form_modul_edit').length > 0) {
			$('#form_modul_edit').submit(function(e) {
				var modulId = $(this).data('id');
				e.preventDefault();
				var values = {};
				$(this).find('input').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.saveModul(modulId, values);
			});
		}

		if ($('#form_modul_create').length > 0) {
			$('#form_modul_create').submit(function(e) {
				e.preventDefault();
				var values = {};
				$(this).find('input').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.createModul(values);
			});
		}

		if ($('#form_lehrveranstaltung_add').length > 0) {
			$('#form_lehrveranstaltung_add').submit(function(e) {
				e.preventDefault();
				var modulId = $(this).data('id');
				var values = {};
				$(this).find('input, select').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.addLehrveranstaltung(modulId, values);
			});
		}

		if ($('#form_lehrveranstaltung_edit').length > 0) {
			$('#form_lehrveranstaltung_edit').submit(function(e) {
				e.preventDefault();
				var lvId = $(this).data('id');
				var values = {};
				$(this).find('input, select').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.saveLehrveranstaltung(lvId, values);
			});
		}

		if ($('#form_login').length > 0) {
			$('#form_login').submit(function(e) {
				e.preventDefault();
				var values = {};
				$(this).find('input, select').each(function() {
					values[$(this).attr('name')] = $(this).val();
				});
				self.db.login(values);
			});
		}

		$('[data-rolle]').each(function() {
			if(self.user !== null && $(this).data('rolle') != self.user.rolle) {
				$(this).remove();
			}
		});
	},
	addLehrveranstaltung: function(elem) {
		var self = this;
		var modulId = $('.active').data('id');
		this.db.getStudiengaenge(true, true, modulId);
	},
	editLehrveranstaltung: function(elem) {
		var self = this;
		var lvId = $(elem).data('id');
		this.db.getLehrveranstaltung(lvId);
	},
	deleteLehrveranstaltung: function(elem) {
		var self = this;
		var lvId = $(elem).data('id');
		this.db.deleteLehrveranstaltung(lvId);
	},
	selectStudiengang: function(elem) {
		if(!$(elem).is('.active')) {
			$('.studiengang').removeClass('active');
			$(elem).addClass('active');
		} else {
			$('.studiengang').removeClass('active');
		}
	},
	editStudiengang: function(elem) {
		var self = this;
		var studiengangId = $('.active').data('id');
		this.db.getStudiengang(studiengangId, false, true);
	},
	deleteStudiengang: function(elem) {
		var self = this;
		var studiengangId = $('.active').data('id');
		this.db.deleteStudiengang(studiengangId);
	},
	viewModules: function(elem) {
		var self = this;
		this.db.getModule();
	},
	selectModul: function(elem) {
		if(!$(elem).is('.active')) {
			$('.modul').removeClass('active');
			$(elem).addClass('active');
		} else {
			$('.modul').removeClass('active');
		}
	},
	editModul: function(elem) {
		var self = this;
		var modulId = $('.active').data('id');
		this.db.getModul(modulId);
	},
	deleteModul: function(elem) {
		var self = this;
		var modulId = $('.active').data('id');
		this.db.deleteModul(modulId);
	},

	checkUser: function(tpl_name) {
		var adminTpls = [
			'adm_lehrveranstaltungen_add', 'adm_lehrveranstaltung_edit', 'adm_modul_create', 'adm_studiengaenge',
			'adm_studiengang_create', 'adm_studiengang_edit'
		];

		if(this.user === null || this.user.rolle != 'admin' && adminTpls.indexOf(tpl_name) > -1) {
			alert('Sie dürfen diese Seite nicht besuchen!');
			this.render_px('login', {});

			return false;
		}

		return true;
	},
	loadUser: function(data) {
		var cookie = this.getCookie('user');
		if(cookie === null) {
			return false;
		}

		console.log(cookie);

		this.user = JSON.parse(cookie);
	},

	setCookie: function(cname, cvalue) {
		var d = new Date();
		d.setTime(d.getTime() + 60*60*1000);
		var expires = "expires=" + d.toUTCString();

		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while(c.charAt(0) == '' && c != '') {
				c = c.substring(1);
			}
			if(c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}
});

$(document).ready(function(){
	LITAPP.es_o  = new EventService_cl();
	LITAPP.app_o = new LITAPP.Application_cl();

	LITAPP.es_o.publish_px('app', ['init', null]);

});
// EOF