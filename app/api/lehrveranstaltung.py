import cherrypy
import json


class Lehrveranstaltung_cl:

	exposed = True

	def GET(self, id=None):
		if(id == None):
			return json.dumps(cherrypy.Application.db.load_lehrveranstaltungen())
		else:
			return json.dumps(cherrypy.Application.db.load_lehrveranstaltungen(id))

	def POST(self, studiengangId, modulId, bezeichnung, semester, studiengang):
		if cherrypy.Application.user.checkAccess('lehrveranstaltung', 'POST') == False:
			return json.dumps({'login_failed': True})

		data = {
			"bezeichnung": bezeichnung,
			"semester": semester,
			"modul": modulId
		}

		isAdded = cherrypy.Application.db.create_lehrveranstaltung(studiengangId, data)

		if isAdded == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def PUT(self, id, bezeichnung, semester):
		if cherrypy.Application.user.checkAccess('lehrveranstaltung', 'PUT') == False:
			return json.dumps({'login_failed': True})

		lv = cherrypy.Application.db.load_lehrveranstaltung(id)

		if lv == False:
			return json.dumps({'success': False})

		data = {
			"bezeichnung": bezeichnung,
			"semester": semester,
			"modul": lv['modul']
		}

		isSaved = cherrypy.Application.db.save_lehrveranstaltung(id, data)

		if isSaved == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def DELETE(self, lehrveranstaltungId):
		if cherrypy.Application.user.checkAccess('lehrveranstaltung', 'DELETE') == False:
			return json.dumps({'login_failed': True})

		isDeleted = cherrypy.Application.db.delete_lehrveranstaltung(lehrveranstaltungId)

		if isDeleted == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

# EOF
