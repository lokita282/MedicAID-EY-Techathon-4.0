import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = {
  verifyJWT: async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      const user = await User.findOne({ _id: decoded._id })

      if (!user) {
        res.status(404).json({
          message: 'No user found!',
        })
        return
      }

      req.token = token
      req.user = user

      next()
    } catch (e) {
      res.status(401).json({
        success: false,
        message: 'Please authenticate',
      })
    }
  },

  roleAdmin: (req, res, next) => {
    try {
      if (req.user.type === 'admin') {
        next()
      } else {
        res.status(403).json({
          message: 'Access Denied',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  roleSuperAdmin: (req, res, next) => {
    try {
      if (req.user.type === 'superadmin') {
        next()
      } else {
        res.status(403).json({
          message: 'Access Denied',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  roleBilling: (req, res, next) => {
    try {
      if (req.user.type === 'billing') {
        next()
      } else {
        res.status(403).json({
          message: 'Access Denied',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  roleMD: (req, res, next) => {
    try {
      if (req.user.type === 'md') {
        next()
      } else {
        res.status(403).json({
          message: 'Access Denied',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  roleCredit: (req, res, next) => {
    try {
      if (req.user.type === 'credit') {
        next()
      } else {
        res.status(403).json({
          message: 'Access Denied',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  },
}

export default auth

