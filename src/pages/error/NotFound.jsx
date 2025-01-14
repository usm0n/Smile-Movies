import React from "react";
import logo from "../../assets/images/logo.png";
import { t } from "i18next";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { backButton } from "../../utilities/defaultFunctions";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      {backButton(() => navigate("/"))}
      <div className="notfound-content">
        <ReportProblemIcon
          sx={{
            width: "150px",
            height: "150px",
            color: "yellow",
            margin: "0 auto",
          }}
        />
        <h1 className="notfound-404">404</h1>
        <h2 className="notfound-title">{t("PageNotFound")}</h2>
        <p className="notfound-desc">{t("PageNotFoundDesc")}</p>
      </div>
    </div>
  );
}

export default NotFound;
