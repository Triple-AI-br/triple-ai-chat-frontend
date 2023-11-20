import i18n from "../../../i18n";

export const contractCategories = i18n.t("pages.contracts.categories", { returnObjects: true }) as {
  label: string;
  value: string;
}[];

export const represent = i18n.t("pages.contracts.represents", { returnObjects: true }) as {
  label: string;
  value: string;
}[];
