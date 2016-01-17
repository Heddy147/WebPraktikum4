var LITAPP = {};

LITAPP.Application_cl = Class.create({
	initialize: function () {
		var self = this;
		this.db = new Database(this);

		LITAPP.es_o.subscribe_px(this, 'app');
	},
	notify_px: function (self_opl, message_spl, data_apl) {
		switch (message_spl) {
			case 'app':
				switch (data_apl[0]) {
					case 'init':
						LITAPP.tm_o = new TELIB.TemplateManager_cl();
						break;
					case 'templates.loaded':
						self_opl.render_init_list();
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
		this.db.getStudiengaenge(true);
	},
	render_px: function(template_name, data) {
		var self = this;

		$('#content').html(LITAPP.tm_o.execute_px(template_name + '.tpl', data));

		$('button, .function').click(function() {
			var action = $(this).data('action');
			if($(this).is('.function')) {
				action = 'function';
			}

			switch(action) {
				case 'login':
					self.render_px("login", {});
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
		var studiengangId = $('.active').data('id');
		this.db.getStudiengang(studiengangId);
	}
});

$(document).ready(function(){
	LITAPP.es_o  = new EventService_cl();
	LITAPP.app_o = new LITAPP.Application_cl();

	LITAPP.es_o.publish_px('app', ['init', null]);

});
// EOF