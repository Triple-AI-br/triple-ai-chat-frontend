import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import i18n from "../../../i18n";

export const possibleWorks: Array<{ icon: JSX.Element; description: string }> = [
  {
    icon: <UploadFileIcon />,
    description: i18n.t("pages.landing.components.cardsSection.first.upload"),
  },
  {
    icon: <ConnectWithoutContactIcon />,
    description: i18n.t("pages.landing.components.cardsSection.first.createForSocialMidia"),
  },
  {
    icon: <DesignServicesIcon />,
    description: i18n.t("pages.landing.components.cardsSection.first.optimize"),
  },
];

export const securityAndPrivacy: Array<{ imageUrl: string; title: string }> = [
  {
    imageUrl: "/securityIcons/criptografia.png",
    title: i18n.t("pages.landing.components.cardsSection.second.cryptography"),
  },
  {
    imageUrl: "/securityIcons/LGPD.jpeg",
    title: i18n.t("pages.landing.components.cardsSection.second.lgpd"),
  },
  {
    imageUrl: "/securityIcons/setorizado.svg",
    title: i18n.t("pages.landing.components.cardsSection.second.dataBySectors"),
  },
  {
    imageUrl: "/securityIcons/privacy.svg",
    title: i18n.t("pages.landing.components.cardsSection.second.privacy"),
  },
];

export const fileIcons = [
  "/fileIcons/envio.png",
  "/fileIcons/fecho-eclair.png",
  "/fileIcons/imagem.png",
  "/fileIcons/palavra.png",
  "/fileIcons/pdf.png",
  "/fileIcons/power-point.png",
  "/fileIcons/xls.png",
];
