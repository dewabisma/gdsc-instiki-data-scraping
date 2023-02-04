import sites from "./config/sites.js";
import {
  extractAllEventsData,
  fetchSiteHTML,
  getEventContainerEl,
  getEventEls,
  saveEventsDataToJsonFile,
} from "./scripts/directUrlAccess.js";
import {
  crawlAndFetchSiteHTML,
  extractAllPopularProductsData,
  getPopularProductEls,
  savePopularProductDataToJsonFile,
} from "./scripts/usingPuppeteer.js";

/* Main Playground Direct Access Method */
// const stikiHtml = await fetchSiteHTML(sites.instiki);
// const eventContainerEL = getEventContainerEl(stikiHtml);
// const eventEls = getEventEls(eventContainerEL);
// const eventsData = extractAllEventsData(eventEls);
// await saveEventsDataToJsonFile(eventsData);

/* SPA limitation */
// const shopeeHtml = await fetchSiteHTML(sites.shopee);
// console.log(shopeeHtml);

/* Main Playground Shopee */
// const shopeeHtml = await crawlAndFetchSiteHTML(sites.shopee);
// const popularProductEls = getPopularProductEls(shopeeHtml);
// const popularProductsData = extractAllPopularProductsData(popularProductEls);
// await savePopularProductDataToJsonFile(popularProductsData);
