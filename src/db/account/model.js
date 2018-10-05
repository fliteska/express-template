const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

schema.plugin(mongoosePaginate);

// hashing a password before saving it to the database
/* eslint-disable */
schema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        return next();
    });
});
/* eslint-enable */

const model = mongoose.model('Account', schema);

// authenticate input against database
schema.statics.authenticate = (email, password, callback) => {
    model.findOne({ email })
        .select(['username', 'email', 'password'])
        .exec((err, account) => {
            if (err) {
                return callback(err);
            } if (!account) {
                const err2 = new Error('Account not found.');
                err2.status = 401;
                return callback(err2);
            }
            return bcrypt.compare(password, account.password, (err3, result) => {
                if (result === true) {
                    return callback(null, account);
                }
                return callback(err3);
            });
        });
};

module.exports = model;
