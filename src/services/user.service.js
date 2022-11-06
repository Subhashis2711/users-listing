// const { User } = require("../models");
const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

/**
 * Fetch all users
 * @returns {Promise<List<Products>>}
 */
const getUsers = async () => {
    return User.find({});
};

/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
    const { User } = require("../models");

    const user = await User.findById(userId);
    return user;
};

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    const { User } = require("../models");

    const user = await User.findOne({ email: email });
    return user;
};

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "firstname": "test-user-firstname",
 *  "lastname": "test-user-lastname",
 *  "city": "test-user-city",
 *  "email": "test-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

const createUser = async (userData) => {
    const { User } = require("../models");

    const userExist = await User.isEmailTaken(userData.email);

    if (userExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    } else {
        const user = await User.create(userData);
        return user;
    }
};

/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserAddressById = async (id) => {
    const data = await User.findOne({ _id: id }, { address: 1, email: 1 });
    return data;
};

/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
    user.address = newAddress;
    await user.save();
    return user.address;
};

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    getUserAddressById,
    setAddress,
    getUsers
};
