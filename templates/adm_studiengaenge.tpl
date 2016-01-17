<a href='/studierender'>Zur Übersicht</a>
<table>
	<tr>
		<th>Name</th>
		<th>Kurzname</th>
		<th>Semester</th>
	</tr>

	@for sg in context@
	<tr class='studiengang function' data-function='selectStudiengang' data-id='#sg#'>
		<td>#context[sg].bezeichnung#</td>
		<td>#context[sg].kurzbezeichnung#</td>
		<td>#context[sg].anzahlSemester#</td>
	</tr>
	@endfor@
</table>
<button type='button' class='function' data-function='editStudiengang'>Bearbeiten</button>
<button type='button' class='function' data-function='deleteStudiengang'>Löschen</button>
<button type='button' class='function' data-function='viewModules'>Module</button>