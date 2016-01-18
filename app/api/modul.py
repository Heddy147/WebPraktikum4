import cherrypy
import json


class Modul_cl:

	exposed = True

	def GET(self, id=None):
		if(id == None):
			return json.dumps(cherrypy.Application.db.load_modules())
		else:
			return json.dumps(cherrypy.Application.db.load_module(id))

	def POST(self, bezeichnung, kurzbezeichnung, sws, kreditpunkte, beschreibung):
		if cherrypy.Application.user.checkAccess('modul', 'POST') == False:
			return json.dumps({'login_failed': True})

		data = {
			'bezeichnung': bezeichnung,
			'kurzbezeichnung': kurzbezeichnung,
			'sws': sws,
			'kreditpunkte': int(kreditpunkte),
			'beschreibung': beschreibung
		}
		isCreated = cherrypy.Application.db.create_modul(data)
		if isCreated == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def PUT(self, id, bezeichnung, kurzbezeichnung, sws, kreditpunkte, beschreibung):
		if cherrypy.Application.user.checkAccess('modul', 'PUT', id) == False:
			return json.dumps({'login_failed': True})

		data = {
			'bezeichnung': bezeichnung,
			'kurzbezeichnung': kurzbezeichnung,
			'sws': sws,
			'kreditpunkte': int(kreditpunkte),
			'beschreibung': beschreibung
		}
		isSaved = cherrypy.Application.db.save_modul(id, data)
		if isSaved == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def DELETE(self, id):
		if cherrypy.Application.user.checkAccess('modul', 'DELETE') == False:
			return json.dumps({'login_failed': True})

		isDeleted = cherrypy.Application.db.delete_modul(id)
		if isDeleted == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

# EOF
