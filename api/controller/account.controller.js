// Author: Alec Moldovan
// Description: Management of the REST interface to the business logic
// The Controller Layer is responsible for exposing the functionality
// so that it can be consumed by external entities (e.g. UI component)

const User = require('../model/account.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../logger/api.logger');

const { roles } = require('../rbac/roles')

// ***********************************
// Access Control LOGIC
// ***********************************

// Allows only certain roles access to the route 
// Parameters:
//              action: 
//              resource: 
exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            // Determines if the user's role has sufficient permission
            // to perform the specified actions on the provided resource
            const permission = roles.can(req.user.role)[action](resource);
            
            if (!permission.granted) {
                return res.status(401).json({
                    error: 
                    "You don't have enough permission to perform this action"
                });
            }

            next()

        } catch (error) {

            next(error)
        }

    }
}

// Filter an only allow users that are logged in
exports.allowIfLoggedin = async (req, res, next) => {

    try {
        const user = res.locals.loggedInUser;

        if (!user)

            return res.status(401).json({
                error: 
                "You need to be logged in to access this route"
            });

        req.user = user;
        next();

    } catch (error) {

        next(error);
    }
}

// ***********************************
// SIGN UP and LOGIN LOGIC
// ***********************************

// Hash Password
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

// Validate Password
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const {username, email, password, role} = req.body
        const hashedPassword = await hashPassword(password);

        // Replace plain password with hashed password
        const newUser = new User({ 
            username,
            email, 
            password: hashedPassword, 
            role: role 
        });

        // Create Access Token
        const accessToken = jwt.sign(
        { accountId: newUser._id }, 
            process.env.JWT_SECRET, { expiresIn: "1d"});

        newUser.accessToken = accessToken;
  
        // Save new User to DB
        await newUser.save();

        // Respond with the newly minted User info with access token.
        logger.info("Added a new user:::", newUser.username);
        res.json({
            data: newUser,
            accessToken
        })

    } 
    catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) return next(new Error('Username does not exist'));
        
        const validPassword = await validatePassword(password, user.password);

        if (!validPassword) return next(new Error('Password is not correct'))

        const accessToken = jwt.sign(
        { userId: user._id }, 
            process.env.JWT_SECRET, {expiresIn: "1d"});

        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken})

    } 
    catch (error) {
        next(error);
    }
}

// ***********************************
// BUSINESS LOGIC: CRUD ROUTES
// Will be plugged in as middleware
// for the various routes
// ***********************************
exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) return next(new Error('User does not exist'));

        res.status(200).json({
            data: user
        });

    }
    catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;

        await User.findByIdAndUpdate(userId, update);

        const user = await User.findById(userId)

        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });

    } catch (error) {
        next(error)
    }
}
