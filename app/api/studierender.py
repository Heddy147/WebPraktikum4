import cherrypy
import json


class Studierender:

	exposed = True

	def GET(self, id=None):

		if id == None:
			print("Nichts")
		else:
			print(id)

		return id

	@cherrypy.tools.accept(media='plain/text')
	def POST(self):
		return "";

	def PUT(self):
		content = cherrypy.request.body.read().decode("utf-8")
		jsonContent = json.loads(content)
		themen_id = jsonContent['id']

		cherrypy.Application.user.user_logged_in()
		if cherrypy.Application.user.is_admin():
			if "name" in jsonContent and "beschreibung" in jsonContent:
				cherrypy.Application.db.edit_thema(jsonContent["name"], jsonContent["beschreibung"], themen_id)
				return "true"

			return "false_error"
		else:
			return "false_not_logged_in"


# EOF
