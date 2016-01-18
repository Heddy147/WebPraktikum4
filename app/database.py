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

	def create_studiengang(self, data):
		studiengaenge = self.load_studiengaenge()
		lastId = 0

		for sg in studiengaenge:
			if lastId < int(sg):
				lastId = int(sg)

		lastId = lastId + 1
		studiengaenge[lastId] = data

		self.save_studiengaenge_file(studiengaenge)

		return True

	def load_studiengang(self, id):
		studiengaenge = self.load_studiengaenge()

		if id in studiengaenge:
			return studiengaenge[id]
		else:
			return False

	def save_studiengang(self, id, data):
		studiengaenge = self.load_studiengaenge()

		if id not in studiengaenge:
			return False

		studiengaenge[id] = data

		self.save_studiengaenge_file(studiengaenge)
		return True

	def delete_studiengang(self, id):
		studiengaenge = self.load_studiengaenge()

		if id not in studiengaenge:
			return False

		del studiengaenge[id]

		self.save_studiengaenge_file(studiengaenge)
		return True

	def save_studiengaenge_file(self, data):
		file = open("data/studiengaenge.json", "w")
		json.dump(data, file)

	def load_modules(self, studiengangId=None):
		if studiengangId != None:
			lvs = self.load_lehrveranstaltungen(studiengangId)

			modules = {}

			for lv_id in lvs:
				modules[lvs[lv_id]['modul']] = self.load_module(lvs[lv_id]['modul'])

			return modules
		else:
			file = open("data/module.json", "r")
			data = json.load(file)

			for m_id in data:
				data[m_id].update({'lehrveranstaltungen': self.load_lehrveranstaltung_by_module(m_id)})

			return data

	def load_module(self, module_id):
		data = self.load_modules()

		if module_id in data:
			data[module_id].update({'lehrveranstaltungen': self.load_lehrveranstaltung_by_module(module_id)})
			return data[module_id]

		return None

	def create_modul(self, data):
		module = self.load_modules()
		lastId = 0

		for sg in module:
			if lastId < int(sg):
				lastId = int(sg)

		lastId = lastId + 1
		module[lastId] = data

		self.save_module_file(module)

		return True

	def delete_modul(self, id):
		module = self.load_modules()

		if id not in module:
			return False

		del module[id]

		self.save_module_file(module)
		return True

	def save_modul(self, id, data):
		module = self.load_modules()

		if id not in module:
			return False

		module[id] = data

		self.save_module_file(module)
		return True

	def save_module_file(self, data):
		file = open("data/module.json", "w")
		json.dump(data, file)

	def load_lehrveranstaltungen(self, studiengangId=None):
		file = open("data/lehrveranstaltungen.json", "r")
		data = json.load(file)

		if studiengangId != None:
			if(studiengangId in data):
				return data[studiengangId]
			else:
				return {}

		return data

	def load_lehrveranstaltung(self, id):
		lvs = self.load_lehrveranstaltungen()

		for sg in lvs:
			if id in lvs[sg]:
				return lvs[sg][id]

		return False

	def load_lehrveranstaltung_by_module(self, m_id):
		data = self.load_lehrveranstaltungen()

		lvs = {}

		for sg_id in data:
			for lv_id in data[sg_id]:
				if int(data[sg_id][lv_id]['modul']) == int(m_id):
					lvs[lv_id] = data[sg_id][lv_id]

		return lvs

	def create_lehrveranstaltung(self, studiengangId, data):
		lvs = self.load_lehrveranstaltungen()

		if studiengangId not in lvs:
			lvs[studiengangId] = {}

		lastId = 0;
		for sg in lvs:
			for lv_id in lvs[sg]:
				if int(lv_id) > int(lastId):
					lastId = int(lv_id)

		lastId = lastId + 1
		lvs[studiengangId][lastId] = data

		self.save_lehrveranstaltungen_file(lvs)

		return True

	def save_lehrveranstaltung(self, id, data):
		lvs = self.load_lehrveranstaltungen()

		founded = False
		for sg in lvs:
			if id in lvs[sg]:
				founded = True
				lvs[sg][id] = data

		if founded == False:
			return False

		self.save_lehrveranstaltungen_file(lvs)

		return True


	def delete_lehrveranstaltung(self, lvId):
		lvs = self.load_lehrveranstaltungen()

		founded = False

		for sg in lvs:
			if lvId in lvs[sg]:
				founded = True
				del lvs[sg][lvId]

		if founded == False:
			return False

		self.save_lehrveranstaltungen_file(lvs)

		return True

	def save_lehrveranstaltungen_file(self, data):
		file = open("data/lehrveranstaltungen.json", "w")
		json.dump(data, file)

# EOF
