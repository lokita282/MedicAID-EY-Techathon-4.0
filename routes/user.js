import express from'express'
import auth from'../middleware/auth.js'
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getPatients,
  getDoctors,
  getProfile,
  getDoctorsInteractedWith,
  updateUser,
  deleteUser,
} from'../controllers/user.js'

const router = new express.Router()

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Logout User
router.post('/logout', auth.verifyJWT, logoutUser)

//get patients of a particular doctor
router.get('/allpatients', auth.verifyJWT, getPatients)

//get all doctors (for patients)
router.get('/alldoctors', auth.verifyJWT, getDoctors)

//Get Personal Profile
router.get('/docs_interacted_with', auth.verifyJWT, getDoctorsInteractedWith)

//Get doctors a patient interacted with

// //update Profile
// router.put('/update', auth, updateUser)

// //Delete Profile
// router.delete('/delete', auth, deleteUser)


//Get All Users
router.get('/get', getUsers)


export default router