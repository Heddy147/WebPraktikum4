<button type='button' class='function' data-function='render_init_list'>Zurück zu den Studiengängen</button>
<form id="form_studiengang_edit" action='' method='POST' data-id='#context.studiengangId#'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' value='#context.studiengang.bezeichnung#' />
	</p>
	<p>
		<label for='kurzbezeichnung'>Kurzbezeichnung</label>
		<input type='text' required name='kurzbezeichnung' id='kurzbezeichnung' value='#context.studiengang.kurzbezeichnung#' />
	</p>
	<p>
		<label for='anzahlSemester'>Anzahl Semester</label>
		<input type='text' required name='anzahlSemester' id='anzahlSemester' value='#context.studiengang.anzahlSemester#' />
	</p>
	<button type='submit' id='submit_studiengang_edit'>Speichern</button>
</form>