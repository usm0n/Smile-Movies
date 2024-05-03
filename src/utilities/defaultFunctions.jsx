export const language = !localStorage.getItem("language")
  ? "uz"
  : localStorage.getItem("language").trim();
export const setLanguage = (language) => {
  localStorage.setItem("language", language);
};

export const userId = localStorage.getItem("userId");
export const removeUserId = () => localStorage.removeItem("userId");
export const setUserId = (userId) => {
  localStorage.setItem("userId", userId);
};
