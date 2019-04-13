const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/users/test
// @desc    tests profile route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Profile Works!!" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for the user";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => {
        errors.noprofile = "Server internal error";
        res.status(500).json(err);
      });
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      errors.noprofile = "Server internal error";
      res.status(500).json(err);
    });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      errors.noprofile = "Server internal error";
      res.status(500).json(err);
    });
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => {
      errors.noprofile = "Server internal error";
      res.status(500).json(err);
    });
});

// @route   POST api/profile
// @desc    create or edit user profile
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If input values don't pass validation, send response with error status
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Fill profileFields object from input values
    const profileFields = {};
    profileFields.user = req.user.id;

    // Profile
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Split skills into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social media
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // Save profileFields object to database
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update the found profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create a new profile
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience
// @access  private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If input values don't pass validation, send response with error status
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "User profile not found";
        return res.status(404).json(errors);
      }
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add new experience to the array in profile and save the profile
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete one experience from experiences array
// @access  private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "User profile not found";
          return res.status(404).json(errors);
        }
        const removeIndex = profile.experience.findIndex(
          exp => exp.id === req.params.exp_id
        );
        if (removeIndex < 0) {
          errors.noExperience = "Experience not found";
          return res.status(404).json(errors);
        }

        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.server = "Server internal error";
        res.status(500).json(err);
      });
  }
);

// @route   DELETE api/profile/education/:education_id
// @desc    Delete one education from educations array
// @access  private
router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "User profile not found";
          return res.status(404).json(errors);
        }
        const removeIndex = profile.education.findIndex(
          education => education.id === req.params.education_id
        );
        if (removeIndex < 0) {
          errors.noEducation = "Education not found";
          return res.status(404).json(errors);
        }

        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.server = "Server internal error";
        res.status(500).json(err);
      });
  }
);

// @route   POST api/profile/education
// @desc    Add education
// @access  private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If input values don't pass validation, send response with error status
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "User profile not found";
        return res.status(404).json(errors);
      }
      const newEducation = {
        schoolId: req.body.schoolId,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add new experience to the array in profile and save the profile
      profile.education.unshift(newEducation);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/
// @desc    Delete current user's profile and user document
// @access  private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOneAndRemove({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "User profile not found";
          return res.status(404).json(errors);
        }
        User.findByIdAndDelete(req.user.id).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => {
        errors.server = "Server internal error";
        res.status(500).json(err);
      });
  }
);

module.exports = router;
