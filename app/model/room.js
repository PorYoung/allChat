module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoomSchema = new Schema({
    _id: {
      type: String,
      unique: true,
      index: true,
      alias: 'roomid',
    },
    max: Number
  });
  return mongoose.model('Room', RoomSchema);
}