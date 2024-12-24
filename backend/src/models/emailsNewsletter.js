import mongoose from "mongoose";

const emailNewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Garante que o mesmo e-mail não seja cadastrado duas vezes
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  lastEmailSent: {
    type: Date,
    default: null,
  },
  unsubscribeToken: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  }
});

const EmailNewsletter = mongoose.model("EmailNewsletter", emailNewsletterSchema);

export default EmailNewsletter;