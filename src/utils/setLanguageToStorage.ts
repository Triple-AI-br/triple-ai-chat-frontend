export const LANGUAGE_LOCAL_STORAGE = "language";

const setLanguageToStorage = (lng: "pt" | "en" | "es") => {
  const LANGUAGE = localStorage.getItem(LANGUAGE_LOCAL_STORAGE);
  if (LANGUAGE === lng) return;
  localStorage.setItem(LANGUAGE_LOCAL_STORAGE, lng);
};

export { setLanguageToStorage };
