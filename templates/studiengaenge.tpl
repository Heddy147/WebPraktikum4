<a href='/mhpflege'>Pflegen</a>
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
<button class='function' type="button" id="betreten" data-function="viewStudiengang">Betreten</button>