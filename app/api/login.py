import cherrypy
import json


class Login_cl:

	exposed = True

	def PUT(self, benutzername, passwort):
		print(benutzername, passwort)

		user = cherrypy.Application.db.load_user()
		if benutzername in user and user[benutzername]['passwort'] == passwort:
			cherrypy.Application.user.login_user(benutzername, user[benutzername])
			return json.dumps({'success': True, 'user': user[benutzername]})
		else:
			return json.dumps({'success': False})

# EOF
