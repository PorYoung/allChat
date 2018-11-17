module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConnectionSchema = new Schema({
    user: {
      type: String,
      ref: 'User',
    },
    socketid: String,
    room: String,
  });

  return mongoose.model('Connection', ConnectionSchema);
}