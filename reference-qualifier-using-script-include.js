/**
 * Reference Qualifier using a Script Include
 * 
 * Scenario:
 * 
 * A table has reference fields ref1 and ref2. The tables that these fields 
 * reference are related in some way; either through dot walking or through 
 * a many-to-many table relationship.
 * 
 * User selects a value for ref1 and ref2 is dynamically filtered to only results that are
 * related to ref1.
 */

 /**
  * Script include that will return the query string
  */

var RefQualFilter = Class.create();
RefQualFilter.prototype = {
  initialize: function () {
  },
  //Return all ref2's that are related to the current ref1 value
  getRef2sRelatedToRef1: function () {
    var filterString = "";
    var ref1 = current.ref1;
    //If no ref1 value is selected, then show all ref2's
    if (!ref1) return;
    var gr = new GlideRecord("ref2Table");
    gr.addQuery("ref1", ref1);
    gr.query();
    while (gr.next()) {
      filterString += ("," + gr.ref2.sys_id);
    }
    return "sys_idIN" + filterString;
  },
  type: 'RefQualFilter'
};


/**
 * Place and Advanced reference qualifer on ref2 field's dictionary entry
 * with the following value
 */

//javascript:new RefQualFilter().getRef2sRelatedToRef1();
