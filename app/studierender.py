# coding: utf-8
import cherrypy

class Studierender_cl(object):

	def __init__(self):
		pass

	@cherrypy.expose
	def index(self):
		with open('content/studierender.html', 'r') as f:
			return f.read()

# EOF
