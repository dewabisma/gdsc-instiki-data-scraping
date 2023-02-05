import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import createPopularProduct from "../models/productSchema.js";
import paths from "../config/filePaths.js";
import writeJsonDataToJsonFile from "../utils/fileHandler.js";

/**
 * When loading shopee website, the popular product will not be rendered until
 * the browser scrolls down to view that section, also need to do delay because waiting for
 * network requests to get data for rendering elements
 *
 * @param {} url - site that will be crawled
 * @returns html body of the page
 */
const crawlAndFetchSiteHTML = async (url = "") => {
  if (!url) {
    console.log("Please provide a url");
    return null;
  }

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        height: 720,
        width: 1280,
      },
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    await page.$$eval("div.image-carousel__item-list-wrapper", (els) => {
      els[2].scrollIntoView();
    });

    await new Promise((resolve) => {
      setTimeout(() => resolve("ok"), 2 * 1000);
    });

    const siteHTML = await page.$eval("body", (el) => el.outerHTML);

    await browser.close();

    return siteHTML;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getPopularProductEls = (shoppeHtml = "") => {
  if (!shoppeHtml) return null;

  const $ = cheerio.load(shoppeHtml);
  const popularProductEls = $(
    "div.image-carousel__item-list-wrapper > ul > li > a"
  );

  return popularProductEls;
};

const extractAllPopularProductsData = (popularProductEls) => {
  if (!popularProductEls) return null;

  const popularProductsData = [];

  popularProductEls.each(function () {
    const $ = cheerio.load(this);

    const monthlySoldCount = $("div.pDTGqb").text();
    const productName = $("div.cXODCZ").text();
    const productUrl = "https://shopee.co.id" + $("a").attr("href");

    const product = createPopularProduct({
      monthlySoldCount,
      productName,
      productUrl,
    });

    if (product) popularProductsData.push(product);

    if (!product) {
      console.log(product);

      console.log("Bad data found!");
    }
  });

  return popularProductsData;
};

const savePopularProductDataToJsonFile = async (data) => {
  try {
    await writeJsonDataToJsonFile(data, { path: paths.shopee });

    console.log("Success saving popular products data");
  } catch (error) {
    console.log("Failed saving popular products data");

    console.log(error);
  }
};

export {
  crawlAndFetchSiteHTML,
  getPopularProductEls,
  extractAllPopularProductsData,
  savePopularProductDataToJsonFile,
};
