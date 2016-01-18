<button type='button' class='function' data-function='render_init_list'>Zurück zu den Studiengängen</button>
<form id="form_studiengang_create" action='' method='POST'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' />
	</p>
	<p>
		<label for='kurzbezeichnung'>Kurzbezeichnung</label>
		<input type='text' required name='kurzbezeichnung' id='kurzbezeichnung' />
	</p>
	<p>
		<label for='anzahlSemester'>Anzahl Semester</label>
		<input type='text' required name='anzahlSemester' id='anzahlSemester' />
	</p>
	<button type='submit' id='submit_studiengang_edit'>Speichern</button>
</form>