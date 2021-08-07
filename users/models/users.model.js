//const mongoose = require("../../common/services/mongoose.service").mongoose;
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
  skills: [String],
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.findById = function (cb) {
  return this.model("Users").find({ id: this.id }, cb);
};

const User = mongoose.model("Users", userSchema);

export function findByEmail(email) {
  return User.find({ email: email });
}

export function findBySkill(skill, perPage, page) {
  return User.find({ skills: { $regex: ".*" + skill + ".*" } })
    .limit(perPage)
    .skip(perPage * page);
}

export function findById(id) {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
}

export function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

export function list(perPage, page) {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
}

export function patchUser(id, userData) {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    userData
  );
}

export function removeById(userId) {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
}
