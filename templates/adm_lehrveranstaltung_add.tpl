<button type='button' class='function' data-function='viewModules'>Zurück zu den Modulen</button>
<form id="form_lehrveranstaltung_add" action='' method='POST' data-id='#context.modulId#'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' />
	</p>
	<p>
		<label for='semester'>Semester</label>
		<input type='number' required name='semester' id='semester' />
	</p>
	<p>
		<label for='modul'>Studiengang</label>
		<select name='studiengang'>
			@for sg in context.studiengaenge@
				<option value="#sg#">#context.studiengaenge[sg].bezeichnung#</option>
			@endfor@
		</select>

	</p>
	<button type='submit'>Speichern</button>
</form>