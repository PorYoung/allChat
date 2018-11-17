module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema({
    from: String,
    to: String,
    toType: String,
    type: String,
    content: String,
    date: String,
    avatar: String,
  });

  return mongoose.model('Message', MessageSchema);
}