const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
/* const mongoose = require('mongoose') */
//Fetch for discover
//Show individual user page, (Maybe not Profile?)

router.get("/discover/getQueue", (req, res) => {
  console.log("discover hit");
  //return current user profile and return ids in swipedleft and swipedright arrays
  Profile.findOne(
    { owner: req.session.userId },
    "swipedLeft swipedRight",
    (error, swipedIds) => {
      //callback executes and concatenates swipedLeft, SwipeRight, and user's profile id
      let excludeIds = swipedIds.swipedLeft.concat(
        swipedIds.swipedRight,
        swipedIds.id
      );
      //return all docs that have an id included in "excludeIds"
      Profile.find({ _id: { $nin: excludeIds } }, (error, unswiped) => {
        if (error) {
          res.status(400).json({ error: error.message });
        }
        return res.status(200).json(unswiped);
      });
    }
  );
});

//patch currentUser with swipe
router.patch("/discover/swipe", (req, res) => {
  console.log(req.body);
  let { swipeDirection, swipedUser } = req.body;
  Profile.find({ owner: req.session.userId}, {_id:1}, (error, profileId) => {
      if (error) {
          res.status(400).json({error: err.message})
      } let profId = profileId[0]._id
  Profile.findByIdAndUpdate(
    profId,
    {
      $push: { [`swiped${swipeDirection}`]: swipedUser },
    },
    {new: true },
    (err, doc) => {
      console.log(doc);
      if (err) {
        return res.status("400");
      } else {
        return res.status(200).json(doc);
      }
    }
  );
});
})
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
