const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const config = require('../configs/index');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const Railwaystation = require('../models/railwaystations');


const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });


// Route to add a picture on one user with Cloudinary
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/first-user/users/pictures
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/first-user/pictures">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>
router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
  console.log('DEBUG req.file', req.file);
  User.findOneAndUpdate({}, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

// route to save favorite in user
router.post("/favorite/:id", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let userId = req.user.id;
  let stationId = req.params.id;
  console.log("DEBUG userId && stationId", userId, stationId);
  User.findByIdAndUpdate(userId,
    { $push: { _favorites: stationId } }, { new: true })
    .then(
      res.json()
    )
    .catch((error) => {
      console.log(error);
    })
});

// route to get all favorites of a user
router.get("/favorites", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let userId = req.user.id;

  console.log("DEBUG getFavoritesRoute")
  User.findById(userId).populate('favorite')
    .then(userData => {
      console.log(userData._favorites.length)
      let userFavorites = []
      for (let i = 0; i < userData._favorites.length; i++) {
        Railwaystation.findById(userData._favorites[i])
          .then(stationData => {
            userFavorites.push(stationData);
            if (userFavorites.length === userData._favorites.length) {
              res.json(userFavorites)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
    .catch((error) => {
      console.log(error)
    })
});

// Route to delete one favorite
router.delete("/favorite/:id", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let favoriteId = req.params.id;
  let userId = req.user.id

  console.log("deleteFavorite Route")
  console.log("DEBUG favoriteId userId", favoriteId, userId)
  User.findByIdAndUpdate(userId, {$pull: {_favorites: favoriteId}}, {new: true})
    .then(newUser => {
      res.json(newUser);
    })
    .catch(err => next(err))
 
 });

// Route to delete user profile
router.get("/delete-profile", (req, res, next) => {
  User.findByIdAndRemove(req.user.id)
    .then(res.render("/"))
    .catch((error) => {
      console.log(error)
    })
  console.log("DEBUG user has been deleted")

});

module.exports = router;