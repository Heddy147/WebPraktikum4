import cherrypy
import json


class Modulhandbuch_cl:

	exposed = True

	def GET(self, id):
		return json.dumps(cherrypy.Application.db.load_modules(id))

# EOF
