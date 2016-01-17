# coding: utf-8
import os
import cherrypy
from app import application, studierender, template, user, database, mhpflege
from app.api import studiengang, modulhandbuch, lehrveranstaltung, login, modul

def validate_password(realm, username, password):
	users = application.db.load_user()
	if username in users and users[username]["password"] == password:
		application.user = username
		return True
	return False


def main():
	# --------------------------------------
	# Get current directory
	try:
		current_dir = os.path.dirname(os.path.abspath(__file__))
	except:
		current_dir = os.path.dirname(os.path.abspath(sys.executable))

	cherrypy.Application.currentDir = current_dir

	# disable autoreload and timeout_monitor
	cherrypy.engine.autoreload.unsubscribe()
	cherrypy.engine.timeout_monitor.unsubscribe()

	cherrypy.tree.mount(application.Application_cl(), '/', {"/": {}})

	css_handler = cherrypy.tools.staticdir.handler(section="/", dir='/content/css')
	cherrypy.tree.mount(css_handler, '/css', {
		'/': {
			'tools.staticdir.root': current_dir,
			'tools.staticdir.on': True,
			'tools.staticdir.dir': 'content/css'
		}
	})
	js_handler = cherrypy.tools.staticdir.handler(section="/", dir='/content/js')
	cherrypy.tree.mount(js_handler, '/js', {
		'/': {
			'tools.staticdir.root': current_dir,
			'tools.staticdir.on': True,
			'tools.staticdir.dir': 'content/js'
		}
	})

	cherrypy.tree.mount(studierender.Studierender_cl(), '/studierender', {"/": {}})
	cherrypy.tree.mount(mhpflege.MhPflege_cl(), '/mhpflege', {"/": {}})

	cherrypy.tree.mount(studiengang.Studiengang_cl(), '/studiengang', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.tree.mount(modulhandbuch.Modulhandbuch_cl(), '/modulhandbuch', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.tree.mount(lehrveranstaltung.Lehrveranstaltung_cl(), '/lehrveranstaltung', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.tree.mount(modul.Modul_cl(), '/modul', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.tree.mount(login.Login_cl(), '/login', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.tree.mount(template.Template_cl(), '/template', {
		'/': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher()
		}
	})

	cherrypy.Application.db = database.Database_cl()
	cherrypy.Application.user = user.User_cl()

	# Start server
	cherrypy.engine.start()
	cherrypy.engine.block()

# --------------------------------------
if __name__ == '__main__':
	# --------------------------------------
	main()
# EOF