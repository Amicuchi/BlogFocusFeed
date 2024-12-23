import EmailNewsletter from "../models/emailsNewsletter.js";
import User from "../models/user.js";

const subscribeToNewsletter = async (email) => {
  // Verifica se o e-mail já está inscrito
  const existingSubscription = await EmailNewsletter.findOne({ email });
  if (existingSubscription) {
    throw new Error("Este e-mail já está inscrito na newsletter.");
  }

  // Verifica se o e-mail pertence a um usuário cadastrado
  const user = await User.findOne({ email });
  let fullName = null;

  if (user) {
    fullName = user.fullName;
  }

  // Inscreve o e-mail na newsletter
  const newSubscription = await EmailNewsletter.create({ email });

  return { message: "Inscrição realizada com sucesso!", fullName };
};

export default { subscribeToNewsletter };