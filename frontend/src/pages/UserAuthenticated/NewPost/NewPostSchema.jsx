import * as yup from 'yup';

export const NewPostSchema = yup.object().shape({
  titulo: yup
    .string()
    .required('Título é obrigatório')
    .min(10, 'Título deve ter no mínimo 10 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  
  descricao: yup
    .string()
    .max(250, 'Descrição deve ter no máximo 250 caracteres'),
  
  conteudo: yup
    .string()
    .required('Conteúdo é obrigatório'),
  
  categoria: yup
    .object()
    .required('Categoria é obrigatória'),
  
  tags: yup
    .array()
    .max(7, 'Máximo de 7 tags permitidas'),
  
  imagem: yup
    .mixed()
    .test('fileSize', 'Arquivo muito grande', (value) => {
      if (!value) return true;
      return value[0]?.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Formato de imagem inválido', (value) => {
      if (!value) return true;
      const acceptedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
      return value[0] && acceptedFormats.includes(value[0].type);
    })
});