<button type='button' class='function' data-function='viewModules'>Zurück zu den Modulen</button>
<form id="form_modul_edit" action='' method='POST' data-id='#context.modulId#'>
	<p>
		<label for='bezeichnung'>Bezeichnung</label>
		<input type='text' required name='bezeichnung' id='bezeichnung' value='#context.modul.bezeichnung#' />
	</p>
	<p>
		<label for='kurzbezeichnung'>Kurzbezeichnung</label>
		<input type='text' required name='kurzbezeichnung' id='kurzbezeichnung' value='#context.modul.kurzbezeichnung#' />
	</p>
	<p>
		<label for='sws'>SWS</label>
		<input type='text' required name='sws' id='sws' value='#context.modul.sws#' />
	</p>
	<p>
		<label for='kreditpunkte'>Kreditpunkte</label>
		<input type='number' required name='kreditpunkte' id='kreditpunkte' value='#context.modul.kreditpunkte#' />
	</p>
	<p>
		<label for='beschreibung'>Beschreibung</label>
		<input type='text' required name='beschreibung' id='beschreibung' value='#context.modul.beschreibung#' />
	</p>
	<button type='submit' id='submit_modul_edit'>Speichern</button>
</form>