// routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const universalController = require('../controllers/universalControllers');
const ensureAuthenticated = require('./auth');
const Feed = require('../models/feed');
const Harvest = require('../models/harvest');
const Hive = require('../models/hive');
const Inspection = require('../models/inspections');
const Inventory = require('../models/inventory');
const Swarm = require('../models/swarm');
const Treatment = require('../models/treatment');
const User = require('../models/user');



router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to home on success
    failureRedirect: '/login', // Redirect to login on failure
    failureFlash: true, // Enable flash messages for authentication failures
}));

// Handle Signup Form Submission
router.post("/signup", async (req, res) => {
    try {
        const user = await User.register(
            { email: req.body.email, username: req.body.email }, // provide username explicitly
            req.body.password
        );
        req.login(user, (err) => {
            if (err) {
                return res.json({ success: false, message: err });
            }
            res.redirect('/login');
        });
    } catch (err) {
        res.json({ success: false, message: "Your account could not be saved. Error: " + err });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login'); // Redirect to the home page or login page
    });
});


// Google Sign-In route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Sign-In callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to the home page
        res.redirect('/');
    }
);



// ********************************* PAGE ROUTING *******************************************

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Route to Feeding Form
router.get('/feeding-form', ensureAuthenticated, (req, res) => {
    res.render('feeding-form', { title: 'New Feeding' });
});

// Route to Feeding
router.get('/feeding', ensureAuthenticated, (req, res) => {
    Feed.find({ userId: req.user._id })
        .then(data => {
            res.render('feeding', { title: 'Feeding', data: data });
        })
        .catch(err => console.log(err));
});

// Route to Harvest Form
router.get('/harvest-form', ensureAuthenticated, (req, res) => {
    res.render('harvest-form', { title: 'New Harvest' });
});

// Route to Harvest
router.get('/harvest', ensureAuthenticated, (req, res) => {
    Harvest.find({ userId: req.user._id })
        .then(data => {
            res.render('harvest', { title: 'Harvest', data: data });
        })
        .catch(err => console.log(err));
});

// Route to Hive Form
router.get('/hive-form', ensureAuthenticated, (req, res) => {
    res.render('hive-form', { title: 'New Hive' });
});

// Route to Home
router.get('/', ensureAuthenticated, (req, res) => {
    Hive.find({ userId: req.user._id })
        .then(data => {
            res.render('home', { title: 'Apiary', data: data, user: req.user });
        })
        .catch(err => console.log(err));
});


// Route to Inspection Form
router.get('/inspection-form', ensureAuthenticated, (req, res) => {
    res.render('inspection-form', { title: 'New Inspection' });
});

// Route to Inspection
router.get('/inspection', ensureAuthenticated, (req, res) => {
    Inspection.find({ userId: req.user._id })
        .then(data => {
            res.render('inspection', { title: 'Inspection', data: data });
        })
        .catch(err => console.log(err));
});

// Route to Inventory Form
router.get('/inventory-form', ensureAuthenticated, (req, res) => {
    res.render('inventory-form', { title: 'New Equipment' });
});

// Route to Inventory
router.get('/inventory', ensureAuthenticated, (req, res) => {
    Inventory.find({ userId: req.user._id })
        .then(data => {
            res.render('inventory', { title: 'Inventory', data: data });
        })
        .catch(err => console.log(err));
});

// Route to Login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Route to Swarm Trap Form
router.get('/swarmtrap-form', ensureAuthenticated, (req, res) => {
    res.render('swarmtrap-form', { title: 'New Swarm Trap' });
});

// Route to Swarm Trap
router.get('/swarmtrap', ensureAuthenticated, (req, res) => {
    Swarm.find({ userId: req.user._id })
        .then(data => {
            res.render('swarmtrap', { title: 'Swarm Traps', data: data });
        })
        .catch(err => console.log(err));
});

// Route to Treatment Form
router.get('/treatment-form', ensureAuthenticated, (req, res) => {
    res.render('treatment-form', { title: 'New Treatment' });
});

// Route to Treatment
router.get('/treatment', ensureAuthenticated, (req, res) => {
    Treatment.find({ userId: req.user._id })
        .then(data => {
            res.render('treatment', { title: 'Treatment', data: data });
        })
        .catch(err => console.log(err));
});

// ************************************ PAGE ROUTING END ************************************

// ===============================  EDIT PAGE ROUTING   (get)  ========================================

// Route for Edit Feed Page
router.get('/feed/edit/:id', ensureAuthenticated, (req, res) => {
    Feed.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-feed', { data: data, title: 'Edit Feeding' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Harvest Page
router.get('/harvest/edit/:id', ensureAuthenticated, (req, res) => {
    Harvest.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-harvest', { data: data, title: 'Edit Harvest' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Hive Page
router.get('/hive/edit/:id', ensureAuthenticated, (req, res) => {
    Hive.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-hive', { data: data, title: 'Edit Hive' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Inventory Page
router.get('/inventory/edit/:id', ensureAuthenticated, (req, res) => {
    Inventory.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-inventory', { data: data, title: 'Edit Inventory' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Inspection Page
router.get('/inspection/edit/:id', ensureAuthenticated, (req, res) => {
    Inspection.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-inspection', { data: data, title: 'Edit Inspections' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Swarm Page
router.get('/swarm/edit/:id', ensureAuthenticated, (req, res) => {
    Swarm.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-swarm', { data: data, title: 'Edit Swarm Trap' });
        })
        .catch(err => console.log(err));
});

// Route for Edit Treatment Page
router.get('/treatment/edit/:id', ensureAuthenticated, (req, res) => {
    Treatment.findOne({
        _id: req.params.id
    })
        .then(data => {
            res.render('edit-treatment', { data: data, title: 'Edit Treatment' });
        })
        .catch(err => console.log(err));
});

// ===============================   EDIT ROUTING END    ===================================

// ************************************ ADDING NEW DATA (post)  ************************************

// Route for Saving New Feed
router.post('/new-feed', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'feedDate';
    const userId = req.user._id; // Assuming you store the user ID in the req.user object

    universalController.saveNewData(req, res, Feed, '/feeding', dateFieldName, userId);
});

// Route for Saving New Hive
router.post('/new-hive', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'hiveDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Hive, '/', dateFieldName, userId);
});

// Route for Saving New Harvest
router.post('/new-harvest', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'harvestDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Harvest, '/harvest', dateFieldName, userId);
});

// Route for Saving New Inventory
router.post('/new-inventory', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'inventoryDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Inventory, '/inventory', dateFieldName, userId);
});

// Route for Saving New Inspection
router.post('/new-inspection', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'inspectionDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Inspection, '/inspection', dateFieldName, userId);
});

// Route for Saving New Swarm
router.post('/new-swarm', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'swarmDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Swarm, '/swarmtrap', dateFieldName, userId);
});

// Route for Saving New Treatment
router.post('/new-treatment', ensureAuthenticated, (req, res) => {
    const dateFieldName = 'treatmentDate';
    const userId = req.user._id;
    universalController.saveNewData(req, res, Treatment, '/treatment', dateFieldName, userId);
});

// ************************************  END ADDING NEW DATA *******************************

// ===============================  EDIT DATA  (put)   ==========================================

// Edit Feed
router.put('/feed/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['feeding'];
    const dateFieldName = 'feedDate';
    universalController.editData(Feed, req.params.id, req.body, res, '/feeding', fields, dateFieldName);
});

// Edit Hive
router.put('/hive/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['hiveNumber', 'breed', 'hiveStrength'];
    const dateFieldName = 'hiveDate';
    universalController.editData(Hive, req.params.id, req.body, res, '/', fields, dateFieldName);
});

// Edit Harvest
router.put('/harvest/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['harvestType', 'harvestAmount'];
    const dateFieldName = 'harvestDate';
    universalController.editData(Harvest, req.params.id, req.body, res, '/harvest', fields, dateFieldName);
});

// Edit Inventory
router.put('/inventory/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['inventoryType', 'inventoryAmount'];
    const dateFieldName = 'inventoryDate';
    universalController.editData(Inventory, req.params.id, req.body, res, '/inventory', fields, dateFieldName);
});

// Edit Inspection
router.put('/inspection/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['hiveNumber', 'temperament', 'strength', 'queen', 'queenCell', 'brood', 'disease', 'pests', 'eggs'];
    const dateFieldName = 'inspectionDate';
    universalController.editData(Inspection, req.params.id, req.body, res, '/inspection', fields, dateFieldName);
});

// Edit Swarm
router.put('/swarm/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['swarmNumber', 'location'];
    const dateFieldName = 'swarmDate';
    universalController.editData(Swarm, req.params.id, req.body, res, '/swarmtrap', fields, dateFieldName);
});

// Edit Treatment
router.put('/treatment/update/:id', ensureAuthenticated, (req, res) => {
    const fields = ['treatment'];
    const dateFieldName = 'treatmentDate';
    universalController.editData(Treatment, req.params.id, req.body, res, '/treatment', fields, dateFieldName);
});

// ===============================  EDIT DATA END   ========================================

// ************************************  DELETE DATA ***************************************

// Delete Feed
router.delete('/feed/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Feed, '/feeding');
});

// Delete Hive
router.delete('/hive/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Hive, '/');
});

// Delete Harvest
router.delete('/harvest/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Harvest, '/harvest');
});

// Delete Inventory
router.delete('/inventory/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Inventory, '/inventory');
});

// Delete Inspection
router.delete('/inspection/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Inspection, '/inspection');
});

// Delete Swarm
router.delete('/swarm/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Swarm, '/swarmtrap');
});

// Delete Treatment
router.delete('/treatment/delete/:id', ensureAuthenticated, (req, res) => {
    universalController.deleteItem(req, res, Treatment, '/treatment');
});

// ************************************  DELETE DATA END ***********************************

module.exports = router;