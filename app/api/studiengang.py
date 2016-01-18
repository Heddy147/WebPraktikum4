import cherrypy
import json


class Studiengang_cl:

	exposed = True

	def GET(self, id=None):
		if(id == None):
			return json.dumps(cherrypy.Application.db.load_studiengaenge())
		else:
			return json.dumps(cherrypy.Application.db.load_studiengang(id))

	def POST(self, bezeichnung, kurzbezeichnung, anzahlSemester):
		if cherrypy.Application.user.checkAccess('studiengang', 'POST') == False:
			return json.dumps({'login_failed': True})

		data = {
			'bezeichnung': bezeichnung,
			'kurzbezeichnung': kurzbezeichnung,
			'anzahlSemester': anzahlSemester
		}
		isCreated = cherrypy.Application.db.create_studiengang(data)
		if isCreated == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def PUT(self, id, bezeichnung, kurzbezeichnung, anzahlSemester):
		if cherrypy.Application.user.checkAccess('studiengang', 'PUT') == False:
			return json.dumps({'login_failed': True})

		data = {
			'bezeichnung': bezeichnung,
			'kurzbezeichnung': kurzbezeichnung,
			'anzahlSemester': anzahlSemester
		}
		isSaved = cherrypy.Application.db.save_studiengang(id, data)
		if isSaved == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

	def DELETE(self, id):
		if cherrypy.Application.user.checkAccess('studiengang', 'DELETE') == False:
			return json.dumps({'login_failed': True})

		isDeleted = cherrypy.Application.db.delete_studiengang(id)
		if isDeleted == True:
			return json.dumps({'success': True})
		else:
			return json.dumps({'success': False})

# EOF
