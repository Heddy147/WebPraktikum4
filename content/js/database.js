function Database(app) {
	this.app = app;
	var self = this;

	this.getStudiengaenge = function(isAdmin = false, forLehrveranstaltungen = false, modulId = null) {
		$.ajax({
			dataType: "json",
			url: '/studiengang',
			type: 'GET'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(forLehrveranstaltungen) {
				data = {
					"modulId": modulId,
					"studiengaenge": data
				};
				self.app.render_px('adm_lehrveranstaltung_add', data);
			} else if(isAdmin) {
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
			if(!self.checkAccess(data)) {
				return false;
			}
			if(isAdmin) {
				data = {
					"studiengangId": studiengangId,
					"studiengang": data
				};
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

	this.saveStudiengang = function(studiengangId, data) {
		$.ajax({
			dataType: "json",
			url: '/studiengang/' + studiengangId,
			data: data,
			type: 'PUT'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert("Erfolgreich gespeichert!");
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.createStudiengang = function(data) {
		$.ajax({
			dataType: "json",
			url: '/studiengang',
			data: data,
			type: 'POST'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				$('form').find('input').val('');
				alert("Erfolgreich hinzugefügt!");
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.deleteStudiengang = function(studiengangId) {
		$.ajax({
			dataType: "json",
			url: '/studiengang/' + studiengangId,
			type: 'DELETE'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert('Erfolgreich gelöscht!');
				self.getStudiengaenge(true);
			} else {
				alert('Fehler aufgetreten!');
			}
		});
	}

	this.getModul = function(modulId) {
		$.ajax({
			dataType: "json",
			url: '/modul/' + modulId,
			type: 'GET'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			data = {
				'modulId': modulId,
				'modul': data
			};
			self.app.render_px('adm_modul_edit', data);
		});
	};

	this.getModule = function() {
		$.ajax({
			dataType: "json",
			url: '/modul',
			type: 'GET'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			self.app.render_px('adm_module', data);
		});
	};

	this.saveModul = function(modulId, data) {
		$.ajax({
			dataType: "json",
			url: '/modul/' + modulId,
			data: data,
			type: 'PUT'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert("Erfolgreich gespeichert!");
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.createModul = function(data) {
		$.ajax({
			dataType: "json",
			url: '/modul',
			data: data,
			type: 'POST'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				$('form').find('input').val('');
				alert("Erfolgreich hinzugefügt!");
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.deleteModul = function(modulId) {
		$.ajax({
			dataType: "json",
			url: '/modul/' + modulId,
			type: 'DELETE'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert('Erfolgreich gelöscht!');
				self.getModule();
			} else {
				alert('Fehler aufgetreten!');
			}
		});
	}

	this.getModulesOfStudiengang = function(studiengangId, studiengangInfos) {
		$.ajax({
			dataType: "json",
			url: '/modulhandbuch/' + studiengangId,
			type: 'GET'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			var module = data;
			$.ajax({
				dataType: "json",
				url: "/lehrveranstaltung/" + studiengangId
			}).done(function(data2) {
				if(!self.checkAccess(data2)) {
					return false;
				}
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

				console.log(data2, lehrveranstaltungen);

				var data = {
					"studiengang": studiengangInfos,
					"module": module,
					"lehrveranstaltungen": lehrveranstaltungen
				};
				self.app.render_px('modulhandbuch', data);
			});
		});
	};

	this.addLehrveranstaltung = function(modulId, data) {
		if(typeof data.studiengang == 'undefined' || isNaN(Number(data.studiengang))) {
			alert("Fehler aufgetreten!");
		} else {
			$.ajax({
				dataType: "json",
				url: '/lehrveranstaltung/' + data.studiengang + '/' + modulId,
				type: 'POST',
				data: data
			}).done(function(data) {
				if(!self.checkAccess(data)) {
					return false;
				}
				if(data.success) {
					alert("Erfolgreich hinzugefügt!");
				} else {
					alert("Fehler aufgetreten!");
				}
			});
		}
	};

	this.getLehrveranstaltung = function(id) {
		$.ajax({
			dataType: "json",
			url: '/lehrveranstaltung/',
			type: 'GET'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			var lehrveranstaltung = null;
			for(var sg in data) {
				if(typeof data[sg][id] != 'undefined') {
					lehrveranstaltung = data[sg][id];
					lehrveranstaltung.id = id;
					break;
				}
			}

			if(lehrveranstaltung === null) {
				alert('Lehrveranstaltung nicht gefunden!');
				self.app.viewModules(null);
			} else {
				self.app.render_px('adm_lehrveranstaltung_edit', lehrveranstaltung);
			}
		});
	};

	this.saveLehrveranstaltung = function(id, data) {
		$.ajax({
			dataType: "json",
			url: '/lehrveranstaltung/' + id,
			type: 'PUT',
			data: data
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert("Erfolgreich gespeichert!");
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.deleteLehrveranstaltung = function(id, data) {
		$.ajax({
			dataType: "json",
			url: '/lehrveranstaltung/' + id,
			type: 'DELETE'
		}).done(function(data) {
			if(!self.checkAccess(data)) {
				return false;
			}
			if(data.success) {
				alert("Erfolgreich gelöscht!");
				self.app.viewModules();
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.login = function(values) {
		$.ajax({
			dataType: "json",
			url: '/login/',
			type: 'PUT',
			data: values
		}).done(function(data) {
			if(data.success) {
				self.app.user = data.user;
				self.app.setCookie('user', JSON.stringify(data.user));
				if(data.user.rolle == 'admin') {
					self.app.render_init_list();
				} else {
					self.app.viewModules();
				}
			} else {
				alert("Fehler aufgetreten!");
			}
		});
	};

	this.checkAccess = function(data) {
		if(typeof data.login_failed != 'undefined') {
			alert("Sie dürfen diese Aktion nicht durchführen!");
			//self.app.render_px('login', {});

			return false;
		}

		return true;
	}
}