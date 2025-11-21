const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    const { name, mobile, email, username, password } = req.body;
    try {
        const strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");

        if (password.length < 6) {
            return res.status(400).json({ msg: 'Password must be at least 6 characters' });
        }
        if (!strongRegex.test(password)) {
            return res.status(400).json({ msg: 'Password must contain at least one uppercase letter, one number, and one special character' });
        }

        if (username.length < 3) {
            return res.status(400).json({ msg: 'Username must be at least 3 characters' });
        }
        if (!strongRegex.test(username)) {
            return res.status(400).json({ msg: 'Username must contain at least one uppercase letter, one number, and one special character' });
        }

        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists (Email or Username)' });
        }

        user = new User({
            name,
            mobile,
            email,
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error('Signup Error:', err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Username or Email already exists' });
        }
        res.status(500).send('Server Error: ' + err.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
