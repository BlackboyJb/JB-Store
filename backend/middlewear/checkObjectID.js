import {isValidObjectId} from 'mongoose'




function checkObjectID (req, res, next) {
  if(!isValidObjectId(req.params.id)){
    res.status(404)
    throw new Error(`Invalid object of:${req.params.id}`)
  }
  next()
}

export default checkObjectID

