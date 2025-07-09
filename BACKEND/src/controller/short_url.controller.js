import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import urlSchema from '../models/short_url.model.js';
import { expiredLinkTemplate } from "../utils/htmlTemplates.js";


export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug, data.expiresIn);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});


export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const url = await urlSchema.findOne({ short_url: id });

  if (!url) throw new Error("Short URL not found");

  const now = Date.now(); // current time in milliseconds
  const expiry = url.expiresAt ? new Date(url.expiresAt).getTime() : null;

  console.log("🕒 Now:", now, "→", new Date(now).toISOString());
  console.log("⏳ Expires At:", expiry, "→", url.expiresAt);

  if (expiry && now >= expiry) {
    return res.status(410).send(expiredLinkTemplate());
  }else{
    await urlSchema.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
    res.redirect(url.full_url);

  }

});




export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, customUrl);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
