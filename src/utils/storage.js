export const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocal = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
