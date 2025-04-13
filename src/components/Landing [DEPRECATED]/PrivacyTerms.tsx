import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ActionButton } from "./Footer/styled";
import { useTranslation } from "react-i18next";

const PrivacyTerms = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const firstClause = t("privacyPolicy.firstClause.data", { returnObjects: true }) as string[];
  const secondClause = t("privacyPolicy.secondClause.data", { returnObjects: true }) as string[];
  const thirdClause = t("privacyPolicy.thirdClause.data", { returnObjects: true }) as string[];
  const fourthClause = t("privacyPolicy.fourthClause.data", { returnObjects: true }) as string[];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "80%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <ActionButton type="primary" actiontype="secondary" onClick={handleOpen}>
        {t("pages.landing.components.footer.privacyPoliticsBtn")}
      </ActionButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            {t("privacyPolicy.title")}
          </Typography>
          <Typography sx={{ mt: 3 }}>{t("privacyPolicy.lastUpdate")}</Typography>
          <Typography sx={{ mt: 1 }}>
            {t("privacyPolicy.description")}
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.firstClause.title")}
            </Typography>
            <ol>
              {firstClause.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.secondClause.title")}
            </Typography>
            <ol>
              {secondClause.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.thirdClause.title")}
            </Typography>
            <ol>
              {thirdClause.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.fourthClause.title")}
            </Typography>
            <ol>
              {fourthClause.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.fifthClause.title")}
            </Typography>
            {t("privacyPolicy.fifthClause.data")}
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              {t("privacyPolicy.sixthClause.title")}
            </Typography>
            {t("privacyPolicy.sixthClause.data")}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export { PrivacyTerms };
