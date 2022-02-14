const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");

//Fetch for discover
//Show individual user page, (Maybe not Profile?)

router.get("/discover/:id", (req, res) => {
  console.log("discover hit");
  //return current user profile and return ids in swipedleft and swipedright arrays
  Profile.findOne(
    { owner: req.session.userId },
    "swipedLeft swipedRight",
    (error, swipedIds) => {
        //callback executes and concatenates swipedLeft and SwipeRight
      let swipedIdsArray = swipedIds.swipedLeft.concat(swipedIds.swipedRight);
      //find all docs where no value in swipedIdsArray is present in id field
      Profile.find(
        { id: { $not: { $all: swipedIdsArray } } },
        (error, unswiped) => {
          console.log(swipedIdsArray);
          if (error) {
            res.status(400).json({ error: error.message });
          }
          //return all profile docs to app, userQueue will only include profile objects user has not swiped on previously.
          console.log(unswiped + " have not been swiped");
          return res.status(200).json(unswiped);
        }
      );
    }
  );
});
//patch currentUser with swipe

// USER PAGE
router.get("/userPage", (req, res) => {
  console.log("Hello I got hit", req.session.userId);
  Profile.findOne({ owner: req.session.userId }, (error, profile) => {
    console.log(error, profile);
    if (error) {
      res.status(400).json({ error: error.message });
      next();
    }
    //return profile as json
    return res.status(200).json(profile);
  });
  // User.findById(req.session.userId, (error, user) => {
  //     if (error) {
  //         res.status(400).json({ error: error.message })
  //         next()
  //     }
  //     Profile.find({owner: req.session.userId}, (error, profile) => {
  //         if (error) {
  //             res.status(400).json({ error: error.message })
  //             next()
  //         }
  //         //return profile as json
  //       return res.status(200).json(profile)

  //     })
  // })
});
// Page where User who has signed up creates their profile. This is not a register page.
router.post("/userCreationPage", (req, res) => {
  console.log(req.session);
  User.findById(req.session.userId, (err, user) => {
    console.log(req.body);
    if (err) {
    }
    let profileToCreate = {
      ...req.body,
      owner: req.session.userId,
    };
    // console.log(profileToCreate);

    Profile.create(profileToCreate, (error, createdProfile) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      //return "Profile" info
      return res.status(200).json(createdProfile);
    });
  });
});

//Show individual user page, (Maybe not Profile?)
router.get("/:id", (req, res) => {
  Profile.findById(req.params.id, (error, profile) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    //return specifc "Profile" by id
    res.status(200).json(profile);
  });
});

//Delete route
//hello
router.delete("/deleteAccount/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, user) => {
    Profile.findOneAndDelete(
      { owner: req.params.id },
      (error, deletedProfile) => {
        if (error) {
          res.status(400).json({ error: error.message });
        }
        res.status(200).json(deletedProfile);
      }
    );
  });
});

//Update route

router.put("/editProfile", (req, res) => {
  User.findById(req.session.userId, (error, user) => {
    let profileToEdit = {
      ...req.body,
      owner: req.session.userId,
    };
    Profile.findOneAndUpdate(
      { owner: req.session.userId },
      req.body,
      { new: true },
      (error, updatedProfile) => {
        if (error) {
          res.status(400).json({ error: error.message });
        }
        res.status(200).json(updatedProfile);
      }
    );
  });
});

module.exports = router;
