import urlSchema from '../models/short_url.model.js';
import { ConflictError } from '../utils/errorHandler.js';
import moment from 'moment';





export const saveShortUrl = async (shortUrl, longUrl, userId, expiresIn = null) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (userId) {
      newUrl.user = userId;

      if (expiresIn) {
        // ✅ Regex to extract number + unit (e.g. 15m, 2h, 1d)
        const regex = /^(\d+)([smhd])$/i; // s = seconds, m = minutes, h = hours, d = days
        const match = expiresIn.match(regex);

        if (!match) {
          throw new Error("Invalid expiresIn format. Use like '15m', '2h', '1d'");
        }

        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();

        // ✅ Validate duration
        const duration = moment.duration(value, unit);
        if (!duration || duration.asMilliseconds() <= 0) {
          throw new Error("Invalid expiresIn duration");
        }

        newUrl.expiresAt = moment().add(duration).toDate();

        console.log("🕒 Now:", new Date());
        console.log("⏳ Expires At:", newUrl.expiresAt);
      }
    }

    await newUrl.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictError('Short URL already exists');
    }
    throw new Error(err.message || err);
  }
};





export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({ short_url: shortUrl },{$inc: { clicks: 1 }})
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url: slug});
}