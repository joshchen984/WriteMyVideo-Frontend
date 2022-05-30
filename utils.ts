export const getFileExtension = (fileName: string) => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
};
