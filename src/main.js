import sites from "./config/sites.js";
import { fetchSiteHTML } from "./scripts/directUrlAccess.js";

// Main Playground
const tes = await fetchSiteHTML(sites.instiki);

console.log(tes);
