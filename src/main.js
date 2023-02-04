import paths from "./config/filePaths.js";
import sites from "./config/sites.js";
import {
  extractAllEventsData,
  fetchSiteHTML,
  getEventContainerEl,
  getEventEls,
  saveEventsDataToJsonFile,
} from "./scripts/directUrlAccess.js";

// Main Playground Instiki
const tes = await fetchSiteHTML(sites.instiki);
const eventContainerEL = getEventContainerEl(tes);
const eventEls = getEventEls(eventContainerEL);
const eventsData = extractAllEventsData(eventEls);
await saveEventsDataToJsonFile(eventsData, paths.instiki);

// Main Playground Shopee
