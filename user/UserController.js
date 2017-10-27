var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json({extended: true}));


var User = require('./User');

// creates user
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) return res.status(500).send("There was a problem adding the information to the db.");
    res.status(200).send(user);
  });

});

// returns all users in db
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });

});

// gets a s ingle user from the db
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(`There was a problem finding user ${user}`);
    if (!user) return res.statusCode(404).send(`Unable finding user ${user}`);
    res.status(200).send(user);
  });

});

// deletes user from the db
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user');
    res.status(200).send(`Successfully deleted ${user.name}`);
  });

});

// updates a single user in the db
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if (err) return res.statusCode(500).send(`Unable to update user ${user}`);
    res.status(200).send(user);
  });

});

module.exports = router;