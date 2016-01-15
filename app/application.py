# coding: utf-8
import cherrypy

class Application_cl(object):
	def __init__(self):
		pass

	@cherrypy.expose
	def default(self, *arglist, **kwargs):
		raise cherrypy.HTTPRedirect("/studierender/index")

# EOF
