$(document).ready(function() {

	var method = "get";
	var daten = {};

	daten["test"] = "test1";

	$.ajax({
		method: method,
		url: "/api/studierender",
		contentType: "plain/text",
		data: JSON.stringify(daten)
	}).done(function(data) {

		data = "["
		   +"['home', 'Startseite'],"
		   +"['divider', ''],"
		   +"['form1', 'Formular 1'],"
		   +"['form2', 'Formular 2']"
		+"]";
		console.log(data);
		TELIB.TemplateCompiler_cl(data);
	}).fail(function() {
		alert("Es sind Fehler aufgetreten!")
	});
});