import Joi from 'joi';

export const userRoleValidationSchema = Joi.object({
    targetUserId: Joi.string().required().messages({
        'string.empty': 'O ID do usuário é obrigatório',
    }),
    newRole: Joi.string().valid('reader', 'author', 'moderator', 'owner').required().messages({
        'string.empty': 'O novo cargo é obrigatório',
        'any.only': 'O novo cargo deve ser um dos seguintes: reader, author, moderator, owner',
    }),
});
