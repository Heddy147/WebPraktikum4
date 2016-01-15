# coding: utf-8
import cherrypy

class Studierender_cl(object):

	def __init__(self):
		pass

	@cherrypy.expose
	def index(self):
		# template = Template(filename="content/studierender/studierender.html")
		with open('content/studierender/studierender.html', 'r') as f:
			return f.read()

	def error(self, code="500"):
		template = Template(filename="content/error.html")
		return template.render(code=code)

# EOF