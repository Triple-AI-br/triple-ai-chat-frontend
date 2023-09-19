const setLanguageToStorage = (lng: "pt" | "en" | "es") => {
  const language = localStorage.getItem("language");
  if (language === lng) return;
  localStorage.setItem("language", lng);
};

export { setLanguageToStorage };
