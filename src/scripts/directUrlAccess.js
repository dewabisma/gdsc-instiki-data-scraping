import * as cheerio from "cheerio";

import createStikiEvent from "../models/eventSchema.js";
import writeJsonDataToJsonFile from "../utils/fileHandler.js";
import paths from "../config/filePaths.js";

const fetchSiteHTML = async (url = "") => {
  if (!url) return null;

  try {
    const response = await fetch(url);
    const data = await response.text();

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getEventContainerEl = (instikiHtml = "") => {
  if (!instikiHtml) return null;

  const $ = cheerio.load(instikiHtml);
  const eventContainerEL = $("div.stiki-event-parent-grid.elementor-grid-3")[1];

  return eventContainerEL;
};

const getEventEls = (eventContainerEl) => {
  if (!eventContainerEl) return null;

  const $ = cheerio.load(eventContainerEl);
  const eventEls = $("a");

  return eventEls;
};

const extractAllEventsData = (eventEls) => {
  if (!eventEls) return null;

  const eventsData = [];

  eventEls.each(function () {
    const $ = cheerio.load(this);

    const url = $("a").attr("href");
    const title = $("h3.stiki-past-event-title").text();
    const category = $("div.stiki-past-event-category").text();
    const date = $("div.stiki-past-event-date").text();
    const img = $("img").attr("src");

    const event = createStikiEvent({ title, category, date, url, img });

    if (event) eventsData.push(event);

    if (!event) {
      console.log(event);

      console.log("Bad data found!");
    }
  });

  return eventsData;
};

const saveEventsDataToJsonFile = async (data) => {
  try {
    await writeJsonDataToJsonFile(data, { path: paths.instiki });

    console.log("Success saving events data");
  } catch (error) {
    console.log("Failed saving events data");

    console.log(error);
  }
};

export {
  fetchSiteHTML,
  getEventContainerEl,
  getEventEls,
  extractAllEventsData,
  saveEventsDataToJsonFile,
};
