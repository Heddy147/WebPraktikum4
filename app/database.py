# coding: utf-8
import json
import cherrypy
import time


class Database_cl(object):

	def __init__(self):
		pass

	def load_user(self):
		user_file = open("data/benutzer.json", "r")
		user_data = json.load(user_file)

		return user_data

	def load_studiengaenge(self):
		file = open("data/studiengaenge.json", "r")
		data = json.load(file)

		for sg in data:
			module = self.load_modules(sg)
			kreditpunkte = 0
			for m in module:
				kreditpunkte += module[m]['kreditpunkte']

			data[sg].update({'kreditpunkteges': kreditpunkte})

		return data

	def load_modules(self, studiengangId=None):
		if studiengangId != None:
			lvs = self.load_lehrveranstaltungen(studiengangId)

			modules = {}

			for lv_id in lvs:
				modules[lvs[lv_id]['modul']] = self.load_module(lvs[lv_id]['modul'])

			return modules
			# modules = {}
			#
			# lvIds = []
			# lvs = self.load_lehrveranstaltungen(studiengangId)
			#
			# for lv_id in lvs:
			# 	lvIds.append(lv_id)
			#
			# for mod_id in data:
			# 	intersection = [val for val in lvIds if val in data[mod_id]['lehrveranstaltungen']]
			# 	if len(intersection) > 0:
			# 		modules[mod_id] = data[mod_id]
			#
			# return modules
		else:
			file = open("data/module.json", "r")
			data = json.load(file)

			return data

	def load_module(self, module_id):
		file = open("data/module.json", "r")
		data = json.load(file)

		if module_id in data:
			return data[module_id]

		return None

	def load_lehrveranstaltungen(self, studiengangId=None):
		file = open("data/lehrveranstaltungen.json", "r")
		data = json.load(file)

		if studiengangId != None:
			if(studiengangId in data):
				return data[studiengangId]
			else:
				return {}

		return data

# EOF
