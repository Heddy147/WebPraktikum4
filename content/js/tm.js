//------------------------------------------------------------------------------
// Template-Manager
// - Laden und Bereitstellen von Template-Quellen oder anderen Textquellen
//------------------------------------------------------------------------------
// depends-on:
//    jquery
//    inheritance
//------------------------------------------------------------------------------

// Namensraum TELIB verwenden

TELIB.TemplateManager_cl = Class.create({
   initialize: function () {
      this.templates_o = {};
      this.compiled_o  = {};
      this.teCompiler_o = new TELIB.TemplateCompiler_cl();
      // Templates als Ressource anfordern und speichern
      var path_s = "/template/";
      $.ajax({
         dataType: "json",
         url: path_s,
         type: 'GET',
         context: this
      })
      .done(function (data_opl) {
         this.templates_o = data_opl['templates'];
         // Benachrichtigung senden
         //+++ Bezeichnung Namensraum korrigieren
         LITAPP.es_o.publish_px('app', ['templates.loaded', null]);
      })
      .fail(function(jqXHR_opl, textStatus_spl) {
         alert( "[TELIB.tm] Fehler bei Anforderung: " + textStatus_spl );
      });
   },
   get_px: function (name_spl) {
      if (name_spl in this.templates_o) {
         return this.templates_o[name_spl];
      } else {
         return null;
      }
   },
   execute_px: function (name_spl, data_opl) {
      var compiled_o = null;
      if (name_spl in this.compiled_o) {
         compiled_o = this.compiled_o[name_spl];
      } else {
         // Übersetzen und ausführen
         if (name_spl in this.templates_o) {
            this.teCompiler_o.reset_px();
            compiled_o = this.teCompiler_o.compile_px(this.templates_o[name_spl]);
            this.compiled_o[name_spl] = compiled_o;
         }
      }
      if (compiled_o != null) {
         return compiled_o(data_opl);
      } else {
         return null;
      }
   }
});
// EOF