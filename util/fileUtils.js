import localForage from "localforage";

const fileListKey = "$files";
const normalizeFileName = (name) => `FILE:${name}`;

const updateFiles = async (files) => {
  await localForage.setItem(fileListKey, [...files]);
};

export const listFiles = async () => {
  return new Set((await localForage.getItem(fileListKey)) || []);
};

export const getFile = async (fileName) => {
  const key = normalizeFileName(fileName);
  return await localForage.getItem(key);
};

export const setFile = async (fileName, file) => {
  const key = normalizeFileName(fileName);
  const files = await listFiles();
  files.add(fileName);
  await localForage.setItem(key, file);
  await updateFiles(files);
  return files;
};

export const deleteFile = async (fileName) => {
  const key = normalizeFileName(fileName);
  const files = await listFiles();
  files.delete(fileName);
  await updateFiles(files);
  await localForage.removeItem(key);
  return files;
};
