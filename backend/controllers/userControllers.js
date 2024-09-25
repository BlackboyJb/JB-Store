import asyncHandler from "../middlewear/asyncHandler";
import User from '../models/userModels.js'



const getUsers = asyncHandler(async(req,res) => {
    const Users = await User.find({})
    res.json(Users)
})


export default getUsers