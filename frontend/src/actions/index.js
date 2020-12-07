/**
 * Actions are asociated with their respective API and models
 * so that it is easier to find them.
 * 
 * Page Specific actions should go towards site_misc
 */
import * as gallery from "./gallery_api/";
import * as metadata from "./metadata_api";
import * as metrics from "./metrics_api";
import * as site_misc from "./site_misc";
import * as user from "./user_api";
import * as webadmin from "./webadmin_api";

export {
  gallery,
  metadata,
  metrics,
  site_misc,
  user,
  webadmin
};