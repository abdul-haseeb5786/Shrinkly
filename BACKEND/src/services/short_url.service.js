import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  
        const shortUrl =   generateNanoId(7);
     if(!shortUrl) throw new Error("Short URL not generated");
      await saveShortUrl(shortUrl, url);
return shortUrl;

}
export const createShortUrlWithUser = async (url, userId, slug=null , expiresIn) => {
     const shortUrl = slug || generateNanoId(7);
     const exists = await getCustomShortUrl(shortUrl);
     if (exists) throw new Error("This custom short URL already exists");
         
       await saveShortUrl(shortUrl, url, userId, expiresIn);
return shortUrl;
}