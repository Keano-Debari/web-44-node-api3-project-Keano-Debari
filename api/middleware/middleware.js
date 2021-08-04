const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.url}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    if(user) {
      req.user = user
      next()
    }
    else {
      next({status: 404, message: "user not found"})
    }
  }
  catch (err) {
    res.status(500).json({message: 'cant find user'})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if(!name) {
    req.status(400).json({message: "missing required name field"})
  }
  else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text) {
    req.status(400).json({message: "missing required text field"})
  }
  else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }