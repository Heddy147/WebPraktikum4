# coding: utf-8
import cherrypy

class MhPflege_cl(object):

	def __init__(self):
		pass

	@cherrypy.expose
	def index(self):
		with open('content/mhpflege.html', 'r') as f:
			return f.read()

# EOF
