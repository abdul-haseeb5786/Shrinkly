import { getAllUserClicksDao, getAllUserUrlsDao } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const getAllUserUrls = wrapAsync(async (req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
  res.status(200).json({message:"succes",urls})
})
export const getAllUserClicks = wrapAsync(async (req, res) => {
    const {_id} = req.user
    const clicks = await getAllUserClicksDao(_id)
  res.status(200).json({message:"succes",clicks})
})