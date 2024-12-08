import imageCompression from 'browser-image-compression';

export async function CompressImage(file) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.log(error);
    return file;
  }
}