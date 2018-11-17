module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConnectionSchema = new Schema({
    username: String,
    socketid: String,
    room: String,
  });

  return mongoose.model('Connection', ConnectionSchema);
}