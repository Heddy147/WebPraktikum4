function Database(app) {
	this.app = app;
	var self = this;

	this.getStudiengaenge = function(isAdmin = false) {
		$.ajax({
			dataType: "json",
			url: '/studiengang',
			type: 'GET'
		}).done(function(data) {
			if(isAdmin) {
				self.app.render_px('adm_studiengaenge', data);
			} else {
				self.app.render_px('studiengaenge', data);
			}
		});
	};

	this.getStudiengang = function(studiengangId, withModules = false, isAdmin = false) {
		$.ajax({
			dataType: "json",
			url: '/studiengang/' + studiengangId,
			type: 'GET'
		}).done(function(data) {
			if(isAdmin) {
				self.app.render_px('adm_studiengang_edit', data);
			} else {
				if(withModules) {
					self.getModulesOfStudiengang(studiengangId, data);
				} else {
					self.app.render_px('studiengang', data);
				}
			}
		});
	};

	this.getModulesOfStudiengang = function(studiengangId, studiengangInfos) {
		$.ajax({
			dataType: "json",
			url: '/modulhandbuch/' + studiengangId,
			type: 'GET'
		}).done(function(data) {
			var module = data;
			$.ajax({
				dataType: "json",
				url: "/lehrveranstaltung/" + studiengangId
			}).done(function(data2) {
				var lehrveranstaltungen = [];
				for(var lv in data2) {
					data2[lv].id = lv;
					lehrveranstaltungen.push(data2[lv]);
				}

				lehrveranstaltungen.sort(function(val1, val2) {
					if(val1.semester > val2.semester) {
						return 1;
					} else if(val1.semester < val2.semester) {
						return -1;
					}

					if(val1.bezeichnung.localeCompare(val2.bezeichnung) == -1) {
						return -1;
					} else if(val1.bezeichnung.localeCompare(val2.bezeichnung) != -1) {
						return 1;
					}

					return 0;
				});

				var data = {
					"studiengang": studiengangInfos,
					"module": module,
					"lehrveranstaltungen": lehrveranstaltungen
				};
				self.app.render_px('modulhandbuch', data);
			});
		});
	};

	this.getModul = function(modul_id) {
		//AJAX-REQUEST
//		.done(function(data) {
//			self.app.render_px('module', data);
//		});
	}
}