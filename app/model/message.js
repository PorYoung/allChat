module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema({
    from: {
      type: String,
      ref: 'User',
    },
    to: {
      type: String,
      ref: 'User',
    },
    toType: String,
    room: {
      type: String,
      ref: 'Room',
    },
    type: String,
    content: String,
    date: String,
  });

  return mongoose.model('Message', MessageSchema);
}