import Joi from 'joi';

// Regras reutilizáveis
export const usernameRule = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .messages({
    'string.alphanum': 'O nome de usuário deve conter apenas letras e números.',
    'string.min': 'O nome de usuário deve ter pelo menos 3 caracteres.',
    'string.max': 'O nome de usuário deve ter no máximo 30 caracteres.',
    'any.required': 'O nome de usuário é obrigatório.'
  });

export const emailRule = Joi.string()
  .email()
  .required()
  .messages({
    'string.email': 'Por favor, forneça um e-mail válido.',
    'any.required': 'O e-mail é obrigatório.'
  });

export const passwordRule = Joi.string()
  // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$'))
  .required()
  .messages({
    'string.pattern.base': 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    'any.required': 'A senha é obrigatória.'
  });

export const confirmPasswordRule = Joi.string()
  .valid(Joi.ref('password'))
  .required()
  .messages({
    'any.only': 'As senhas não coincidem.',
    'any.required': 'A confirmação de senha é obrigatória.'
  });


// Schemas específicos

// ************************
// UserValidationSchema
// ************************

export const userValidationSchema = {
  register: Joi.object({
    username: usernameRule,
    email: emailRule,
    password: passwordRule,
    fullName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'O nome completo deve ter pelo menos 2 caracteres.',
        'string.max': 'O nome completo deve ter no máximo 50 caracteres.',
        'any.required': 'O nome completo é obrigatório.'
      }),
    profilePicture: Joi.string().uri().allow('').optional(),
    bio: Joi.string().max(500).allow('').optional(),
    location: Joi.string().max(100).allow('').optional(),
    socialLinks: Joi.object({
      instagram: Joi.string().uri().allow('').optional(),
      twitter: Joi.string().uri().allow('').optional(),
      facebook: Joi.string().uri().allow('').optional(),
      linkedin: Joi.string().uri().allow('').optional(),
      github: Joi.string().uri().allow('').optional()
    }).optional(),
    salt: Joi.string().optional(),
    role: Joi.string()
      .valid('READER', 'AUTHOR', 'MODERATOR', 'OWNER')
      .default('READER')
      .optional(),
  }),

  login: Joi.object({
    email: emailRule,
    password: passwordRule
  })
};


// ************************
// PostValidationSchema
// ************************

export const postValidationSchema = {
  create: Joi.object({
    title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.min': 'O título deve ter pelo menos 3 caracteres.',
        'string.max': 'O título deve ter no máximo 100 caracteres.',
        'any.required': 'O título é obrigatório.'
      }),
    description: Joi.string()
      .max(200)
      .optional()
      .messages({
        'string.max': 'A descrição deve ter no máximo 200 caracteres.'
      }),
    content: Joi.string()
      .min(10)
      .required()
      .messages({
        'string.min': 'O conteúdo deve ter pelo menos 10 caracteres.',
        'any.required': 'O conteúdo é obrigatório.'
      }),

    categories: Joi.array()
      .items(Joi.string())
      .max(1)
      .required()
      .messages({
        'array.min': 'Pelo menos uma categoria é obrigatória.',
        'array.max': 'Você pode selecionar no máximo 1 categoria.'
      }),

    tags: Joi.array()
      .items(Joi.string())
      .max(5)
      .optional()
      .messages({
        'array.max': 'Você pode adicionar no máximo 5 tags.'
      }),
    image: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': 'A imagem deve ser uma URL válida.'
      })
  })
};

// ************************
// categoryValidationSchema
// ************************

export const categoryValidationSchema = {
  create: Joi.object({
    name: Joi.string()
      .min(2)
      .max(20)
      .required()
      .messages({
        'string.min': 'O nome da categoria deve ter pelo menos 2 caracteres.',
        'string.max': 'O nome da categoria deve ter no máximo 20 caracteres.',
        'any.required': 'O nome da categoria é obrigatório.'
      }),
    description: Joi.string()
      .max(200)
      .optional()
      .messages({
        'string.max': 'A descrição deve ter no máximo 200 caracteres.'
      })
  }),
  update: Joi.object({
    name: Joi.string()
      .min(2)
      .max(20)
      .optional()
      .messages({
        'string.min': 'O nome da categoria deve ter pelo menos 2 caracteres.',
        'string.max': 'O nome da categoria deve ter no máximo 20 caracteres.'
      }),
    description: Joi.string()
      .max(200)
      .optional()
      .messages({
        'string.max': 'A descrição deve ter no máximo 200 caracteres.'
      })
  })
};
