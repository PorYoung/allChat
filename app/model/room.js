module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoomSchema = new Schema({
    room: String,
    max: Number
  });

  return mongoose.model('Room', RoomSchema);
}