/**
 * Determina si una URL es externa (http:// o https://)
 */
export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Procesa la ruta de una imagen para manejar tanto URLs externas como rutas locales
 */
export const getImageUrl = (imagePath: string, defaultFolder: string = '/images/blog/'): string => {
  if (isExternalUrl(imagePath)) {
    return imagePath;
  }
  
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  return `${defaultFolder}${imagePath}`;
};
