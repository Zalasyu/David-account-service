// Author: Alec Moldovan
const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {

// TODO: 
  // Permissions: Venues
  //
// Action Attrivutes
// Resources
ac.grant("fan").
    readOwn("profile").
    updateOwn("profile");
 
ac.grant("artist").
    extend("fan")
 
ac.grant("venue").
    extend("fan")
 
return ac;
})();
