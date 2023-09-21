const LANGUAGE = localStorage.getItem("language");

const setLanguageToStorage = (lng: "pt" | "en" | "es") => {
  if (LANGUAGE === lng) return;
  localStorage.setItem("language", lng);
};

export { setLanguageToStorage };
