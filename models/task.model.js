const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ObjectId = new mongoose.Types.ObjectId();


const TaskSchema = new Schema({
  _id: {
    type: String,
    default: ObjectId
  },
  created_at: { type: Date, default: new Date() },
  name: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;