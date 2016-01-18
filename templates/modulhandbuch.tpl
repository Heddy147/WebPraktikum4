<a href='/studierender'>Zurück</a>
<h1>#context.studiengang.bezeichnung#</h1>
<b>Kurzbezeichnung:</b> #context.studiengang.kurzbezeichnung#<br/>
<b>Anzahl Semester:</b> #context.studiengang.anzahlSemester#<br/>
<b>Anzahl Kreditpunkte:</b> #context.studiengang.kreditpunkteges#<br/>

<table>
	<tr>
		<th>Bezeichnung</th>
		<th>Modul</th>
		<th>Kreditpunkte für Modul</th>
	</tr>
	@var last_semester = 0;@
	@for lv in context.lehrveranstaltungen@
	@if last_semester != context.lehrveranstaltungen[lv].semester@
	@last_semester = context.lehrveranstaltungen[lv].semester;@
	<tr>
		<td colspan='3'><h3>Semester #last_semester#</h3></td>
	</tr>
	@endif@
	<tr class='lehrveranstaltung'>
		<td>#context.lehrveranstaltungen[lv].bezeichnung#</td>
		<td>#context.module[context.lehrveranstaltungen[lv].modul].kurzbezeichnung#</td>
		<td>#context.module[context.lehrveranstaltungen[lv].modul].kreditpunkte#</td>
	</tr>
	@endfor@
</table>
