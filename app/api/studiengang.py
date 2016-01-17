import cherrypy
import json


class Studiengang_cl:

	exposed = True

	def GET(self, id=None):
		if(id == None):
			return json.dumps(cherrypy.Application.db.load_studiengaenge())
		else:
			return json.dumps(cherrypy.Application.db.load_studiengaenge()[id])

	def POST(self):
		pass

	def PUT(self):
		pass

	def DELETE(self):
		pass

# EOF
