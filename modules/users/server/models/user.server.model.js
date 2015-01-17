'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	profileImageURL: {
		type: String,
		default: 'modules/users/img/profile/default.png'
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin', 'member', 'committee', 'judge']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
  	resetPasswordExpires: {
  		type: Date
  	},



	// AACC-specific data

	// needs verification after creating a/c
	verified: {
		type: Boolean, 
		required: true, 
		default: false
	},
	// 3 wrong password attempts
	disabled: {
		type: Boolean, 
		required: true, 
		default: false
	},
	// deactivated by admin, judges who are not members get deactivated after judging
	deactivated: {
		type: Boolean, 
		required: true, 
		default: false
	},
	loginAttempts: {
		type: Number, 
		required: true, 
		default: 0
	},
	lockUntil: {
		type: Number, 
		required: true, 
		default: 0
	},
	address1: String,
	address2: String,
	address3: String,
	// city: String,
	state: String,
	// not necessary but place it here so we could have pulldown menus
	country: String,
	zipcode: String,
	// website of photos
	website: String,
	facebook: {},
	twitter: {},
	github: {},
	google: {},
	// admin: {
	// 	type: Boolean, 
	// 	required: true, 
	// 	default: false
	// },
	// member: {
	// 	type: Boolean, 
	// 	required: true, 
	// 	default: false
	// },
	// contestc: {
	// 	type: Boolean, 
	// 	required: true, 
	// 	default: false
	// },
	// judge: {
	// 	type: Boolean, 
	// 	required: true, 
	// 	default: false
	// },
	// active, loa
	memberStatus: String,
	memberID: String,
	logs: [{ 
		updates: String,
		_userId: {
			type: Schema.Types.ObjectId,
			required:true,
			ref: 'Yuser' 
		},
		date: Date
	}]
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
