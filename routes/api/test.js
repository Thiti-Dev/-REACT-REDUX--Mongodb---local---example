const express = require('express');
const router = express.Router();

// Load Test model
const Test = require('../../models/Test');

// @route       GET api/users/test
// @desc        Tests users route
// @access      Public

router.get('/', (req, res) => {
    res.json({ msg: "Users Works" })
});


// @route       GET api/test/create-user/:name
// @desc        Create user
// @access      Public
router.get('/create-user/:name', (req,res) => {
    const newUser = new Test({
        name: req.params.name
    });
    newUser.save()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
        })
})


// @route       GET api/test/find-user/:name
// @desc        Delete user and Profile
// @access      Public
router.get('/find-user/:name', (req, res) => {
    Test.findOne({name: req.params.name})
        .then(user => {
            if (user) {
                res.json(user);
            }
            else {
                res.status(400).json({ user: "User not found" })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// @route       GET api/test/remove-user/:name
// @desc        Delete user and Profile
// @access      Public
router.get('/remove-user/:name', (req, res) => {
    Test.findOneAndRemove({name:req.params.name})
        .then(() => {
            res.json({success: true})
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router