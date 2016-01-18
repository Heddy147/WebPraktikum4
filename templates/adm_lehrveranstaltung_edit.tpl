<button type='button' class='function' data-function='viewModules'>Zurück zu den Modulen</button>
<form id="form_lehrveranstaltung_edit" action='' method='POST' data-id='#context.id#'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' value='#context.bezeichnung#' />
	</p>
	<p>
		<label for='semester'>Semester</label>
		<input type='number' required name='semester' id='semester' value='#context.semester#' />
	</p>
	<button type='submit'>Speichern</button>
	<button type='button' class='function' data-function='deleteLehrveranstaltung' data-id='#context.id#'>Löschen</button>
</form>