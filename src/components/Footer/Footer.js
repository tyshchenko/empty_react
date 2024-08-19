import React from "react";
import { makeStyles } from '@mui/styles';
import { t, setStore } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "0 122px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "30px",
    "@media (max-width: 767.98px)": {
      width: "auto",
      padding: "0 12px",
    },
  },
  top: {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 767.98px)": {
      height: "auto",
      display: "block",
    },
  },
  logo_box: {
    width: "288px",
    height: "100%",
  },
  logo: {
    color: "#b65c5d",
    margin: 0,
    fontWeight: "700",
    textAlign: "left",
    fontSize: "25px",
    lineHeight: "37px",
  },
  logo_sub: {
    color: "rgba(255,255,255,0.5)",
  },
  logo_description: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    lineHeight: "22px",
    textAlign: "left",
    margin: "10px 0 0 0",
  },
  about_box: {
    width: "133px",
    height: "100%",
  },
  company_box: {
    width: "119px",
    height: "100%",
  },
  contact_box: {
    width: "186px",
    height: "100%",
  },
  bottom_title: {
    margin: "auto",
    color: "rgba(255,255,255,0.5)",
  },
  bottom_title_name: {
    color: "white",
  },
  box_title: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#a6817a",
    margin: 0,
  },
  link_content: {
    fontSize: "15px",
    lineHeight: "22px",
    color: "rgba(255,255,255,0.5)",
    marginTop: "20px",
    textDecoration: "none",
    display: "block",
    textAlign: "left",
  },
  sns_content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
    width: "155px",
  },
  pointer:{
    cursor:"pointer",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.logo_box}>
          <p className={classes.logo}>Tronenergize.com</p>
          <a href="/api_dashboard" className={classes.link_content}>{t("API")}</a>
          <div className={classes.sns_content}>
            <img className={classes.pointer} width="24" height="24" alt="English" src="/img/en.png" onClick={()=>setStore({locale: 'en'})} />
            <img className={classes.pointer} width="24" height="24" alt="Chinese" src="/img/ch.png" onClick={()=>setStore({locale: 'ch'})} />
            <img className={classes.pointer} width="24" height="24" alt="Russian" src="/img/ru.png" onClick={()=>setStore({locale: 'ru'})} />
          </div>
        </div>

        <div className={classes.company_box}>
          <p className={classes.box_title}></p>
          <a href="#" className={classes.link_content}></a>
          <a href="#" className={classes.link_content}></a>
        </div>
        <div className={classes.contact_box}>
          <p className={classes.box_title}>{t("Contact")}</p>
          <a href="#" className={classes.link_content}></a>
          <a href="mailto:info@tronenergize.com?subject=Contact to Tronenergize.com" className={classes.link_content}>info@tronenergize.com</a>
          <div className={classes.sns_content}>

            <a href="https://twitter.com/TronEnergize" target="_blank"><img width="24" height="24" src="/img/x.webp"/></a>
            <a href="https://github.com/Tronenergize" target="_blank"><img width="24" height="24" src="/img/github.png"/></a>
            <a href="https://t.me/TronEnergize" target="_blank"><img width="24" height="24" src="/img/tg.png"/></a>
            <a href="https://t.me/TronEnergizeCom" target="_blank"><img width="24" height="24" src="/img/tgnotify.png"/></a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
