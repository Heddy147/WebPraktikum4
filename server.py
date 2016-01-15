# coding: utf-8
import os
import cherrypy
import imp
from app import application, studierender
# from app.api import studierender as studiengang_api
beitraege_api = imp.load_source("app.api", "app/api/studierender.py")

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

	cherrypy.tree.mount(studierender.Studierender_cl(), '/studierender', {
		'/': {
			'tools.staticdir.root': current_dir
		}
	})

	# Start server
	cherrypy.engine.start()
	cherrypy.engine.block()

# --------------------------------------
if __name__ == '__main__':
	# --------------------------------------
	main()
# EOF