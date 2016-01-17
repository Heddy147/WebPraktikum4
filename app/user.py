# coding: utf-8
import cherrypy


class User_cl(object):

	user = None
	user_obj = None

	def __init__(self):
		pass

	def user_logged_in(self):
		cookie = cherrypy.request.cookie
		if "user" in cookie:
			username = cherrypy.request.cookie["user"]
			users = cherrypy.Application.db.load_user()

			if username.value in users:
				self.user = username.value
				self.user_obj = users[username.value]
			else:
				self.user = None
				self.user_obj = None
		else:
			self.user = None
			self.user_obj = None

	def login_user(self, username, user_obj):
		cherrypy.response.cookie["user"] = username
		cherrypy.response.cookie['user']['path'] = '/'
		cherrypy.response.cookie['user']['max-age'] = 3600
		cherrypy.response.cookie['user']['version'] = 1
		self.user = username
		self.user_obj = user_obj

	def is_logged_in(self):
		return self.user_obj != None

	def is_admin(self):
		if self.user_obj == None:
			return False

		if self.user_obj["rolle"] != "admin":
			return False

		return True

	def logout(self):
		cookie = cherrypy.request.cookie
		if "user" in cookie:
			cherrypy.response.cookie["user"] = ''
			cherrypy.response.cookie["user"]['expires'] = 0
			cherrypy.response.cookie['user']['path'] = '/'
			cherrypy.response.cookie['user']['max-age'] = -1
			cherrypy.response.cookie['user']['version'] = 1

			self.user = None
			self.user_obj = None

# EOF
