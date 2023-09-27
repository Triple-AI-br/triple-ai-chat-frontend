import { SelectorContainer } from "./styled";
import { setLanguageToStorage } from "../../../utils/setLanguageToStorage";
import i18next from "i18next";
import { languageResources } from "../../../i18n";

type LanguageSelectorProps = {
  callback?: () => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ callback }) => {
  const language = Object.keys(languageResources).indexOf(i18next.language) + 1;

  const handleChangeLanguage = (key: string) => {
    setLanguageToStorage(key as "en" | "pt" | "es");
    i18next.changeLanguage(key);
    if (callback) callback();
  };

  return (
    <SelectorContainer $language={language}>
      <img
        id="pt"
        src="countryFlags/brazil.svg"
        alt="Brazil flag"
        onClick={(event) => handleChangeLanguage(event.currentTarget.id)}
      />
      <img
        id="en"
        src="countryFlags/usa.svg"
        alt="USA flag"
        onClick={(event) => handleChangeLanguage(event.currentTarget.id)}
      />
      <img
        id="es"
        src="countryFlags/spain.svg"
        alt="Spain flag"
        onClick={(event) => handleChangeLanguage(event.currentTarget.id)}
      />
    </SelectorContainer>
  );
};

export { LanguageSelector };
