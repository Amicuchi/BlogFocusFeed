import * as yup from 'yup';

export const NewPostSchema = yup.object().shape({
  title: yup
    .string()
    .required('Título é obrigatório')
    .min(10, 'Título deve ter no mínimo 10 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),

  description: yup
    .string()
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),

  content: yup
    .string()
    .required('Conteúdo é obrigatório')
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),

  categories: yup
  .object({
    value: yup.string().required('Categoria é obrigatória'),
    label: yup.string(),
  })
  .required('Categoria é obrigatória'),

  tags: yup
    .string()
    .optional(),

  image: yup
    .string()
    .url('Insira uma URL válida de imagem')
    .optional(),
});