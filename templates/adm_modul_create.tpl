<button type='button' class='function' data-function='viewModules'>Zurück zu den Modulen</button>
<form id="form_modul_create" action='' method='POST'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' />
	</p>
	<p>
		<label for='kurzbezeichnung'>Kurzbezeichnung</label>
		<input type='text' required name='kurzbezeichnung' id='kurzbezeichnung' />
	</p>
	<p>
		<label for='sws'>SWS</label>
		<input type='text' required name='sws' id='sws' />
	</p>
	<p>
		<label for='kreditpunkte'>Kreditpunkte</label>
		<input type='number' required name='kreditpunkte' id='kreditpunkte' />
	</p>
	<p>
		<label for='beschreibung'>Beschreibung</label>
		<input type='text' required name='beschreibung' id='beschreibung' />
	</p>
	<button type='submit' id='submit_modul_create'>Speichern</button>
</form>