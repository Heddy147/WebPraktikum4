//------------------------------------------------------------------------------
// Event-Service: asynchroner Nachrichtenaustausch
//------------------------------------------------------------------------------
// depends-on:
//    jquery
//    inheritance
//------------------------------------------------------------------------------

function defer_p (notifier_ppl, entry_opl, message_spl, data_opl) {
   return setTimeout(function() {
      return notifier_ppl.apply(entry_opl, [entry_opl, message_spl, data_opl]); 
   }, 1);
}

function each(object_opl, iterator, context) {
   for (var key in object_opl) {
      iterator.call(context, object_opl[key], key);
   }
} 
  
function findAll(object_opl, iterator, context) {
   var results = [];
   each(object_opl, function(value, index) {
      if (iterator.call(context, value, index))
         results.push(value);
   });
   return results;
} 
  
function compact(object_opl) {
   return findAll(object_opl, function(value) {
      return value != null;
   });
} 
  
//------------------------------------------------------------------------------
var EventService_cl = Class.create({
//------------------------------------------------------------------------------
   initialize: function () {
      this.Data_o       = null;
      this.Subscriber_o = {};
      this.Method_o     = null;
   },
   subscribe_px: function (Subscriber_opl, Message_spl) {
      if (Message_spl in this.Subscriber_o) {
         // Message bekannt, Liste der Subscriber untersuchen
         if (this.Subscriber_o[Message_spl].indexOf(Subscriber_opl) == -1) {
            this.Subscriber_o[Message_spl].push(Subscriber_opl);
         }
      } else {
         // Message noch nicht vorhanden, neu eintragen
         this.Subscriber_o[Message_spl] = [Subscriber_opl];
      }
   },
   unSubscribe_px: function (Subscriber_opl, Message_spl) {
      if (Message_spl in this.Subscriber_o) {
         // Message bekannt, Liste der Subscriber untersuchen
         var Entry_a = this.Subscriber_o[Message_spl];
         var index_i = Entry_a.indexOf(Subscriber_opl);
         if (index_i >= 0) {
            // Eintrag entfernen
            Entry_a[index_i] = null;
            Entry_a = compact(Entry_a); // compact liefert Kopie!
            if (Entry_a.length == 0) {
               // keine Subscriber mehr, kann entfernt werden
               delete this.Subscriber_o[Message_spl];
            }
         }
      } else {
         // Message nicht vorhanden, falsche Anforderung
      }
   },
   publish_px: function (Message_spl, Data_opl) {
      console.info('es - publish ' + Message_spl);
      each(this.Subscriber_o, function (value_apl, key_spl) {
            // geliefert wird jeweils ein Wert, hier ein Array, und der Key
            if (key_spl == Message_spl) {
               // an alle Subscriber weitergeben
               each(value_apl, function (entry_opl, index_ipl) {
                     // geliefert wird hier das Element und der Index
                     defer_p(entry_opl.notify_px, entry_opl, Message_spl, Data_opl);
                  }, this
               );
            }
         }, this
      )
   }
});
// EOF
