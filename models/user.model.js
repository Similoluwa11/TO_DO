const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;
const ObjectId = new mongoose.Types.ObjectId();

const UserSchema = new Schema({
  _id: {
    type: String,
    default: ObjectId,
    required: true
  },
  created_at: { type: Date, default: new Date() },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  firstname: { type: String, required: true },
  lastname: {  type: String, required: true},
  user_type: { type: String, default: 'user' },
});


UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
})

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}


const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;