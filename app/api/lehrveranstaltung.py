import cherrypy
import json


class Lehrveranstaltung_cl:

	exposed = True

	def GET(self, id=None):
		return json.dumps(cherrypy.Application.db.load_lehrveranstaltungen(id))

	def POST(self):
		pass

	def PUT(self):
		pass

	def DELETE(self):
		pass

# EOF
