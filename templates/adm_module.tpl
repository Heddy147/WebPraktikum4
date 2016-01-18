<button type='button' data-action='studiengang.list' data-rolle='admin'>Zu den Studiengängen</button>
<table>
	<tr>
		<th>Bezeichnnung</th>
		<th>Kurzbezeichnung</th>
		<th>Semesterwochenstunden</th>
		<th>Kreditpunkte</th>
		<th>Beschreibung</th>
		<th>Lehrveranstaltungen</th>
	</tr>
	@for var m_id in context@
	<tr class='modul function' data-function='selectModul' data-id='#m_id#'>
		<td>#context[m_id].bezeichnung#</td>
		<td>#context[m_id].kurzbezeichnung#</td>
		<td>#context[m_id].sws#</td>
		<td>#context[m_id].kreditpunkte#</td>
		<td>#context[m_id].beschreibung#</td>
		<td>
			@for var l_id in context[m_id].lehrveranstaltungen@
			<a data-rolle='admin' class='function' href='javascript:;' data-id='#l_id#' data-function='editLehrveranstaltung'>#context[m_id].lehrveranstaltungen[l_id].bezeichnung#</a>
			<span data-rolle='mod'>#context[m_id].lehrveranstaltungen[l_id].bezeichnung#</span>
			<br/>
			@endfor@
		</td>
	</tr>
	@endfor@
</table>
<button data-rolle='admin' type='button' data-action='modul.create'>Hinzufügen</button>
<button type='button' class='function' data-function='editModul'>Bearbeiten</button>
<button data-rolle='admin' type='button' class='function' data-function='deleteModul'>Löschen</button>
<button data-rolle='admin' type='button' class='function' data-function='addLehrveranstaltung'>Lehrveranstaltung hinzufügen</button>
