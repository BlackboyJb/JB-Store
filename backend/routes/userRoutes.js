import express from 'express'
const router = express.Router()
import {getUsers} from '../controllers/userControllers'



router.route('/User').get(getUsers)



export default router