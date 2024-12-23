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
});

const EmailNewsletter = mongoose.model("EmailNewsletter", emailNewsletterSchema);

export default EmailNewsletter;