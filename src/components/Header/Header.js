import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import { t, setStore } from "../../utils/utils";
import { formatNumber } from '../../utils/helper';
import Sidebar from "../Sidebar/Sidebar";
import _ from "lodash";

import './style.css';

import Config from '../../config';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "80px",
    padding: "20px 122px 0",
    alignItems: "center",
    justifyContent: "space-between",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "25px",
    lineHeight: "37px",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
    },
  },
  burger_mobile: {
    display: "flex",
  },
  burger_button: {
    width: '48px',
    height: '48px',
    background: "url('/img/menu.png') no-repeat center",
    display: "none",
    "@media (max-width: 767.98px)": {
      display: "block",
    },
  },
  burger_menu: {
    display: "flex",
    justifyContent: "space-around",
    "@media (max-width: 767.98px)": {
      display: "none",
    },
  },
  open_burger_menu: {
    display: "flex",
    justifyContent: "space-around",
    "@media (max-width: 767.98px)": {
      flexDirection:"column",
    },
  },
  logo: {
    color: "white",
    margin: 0,
  },
  logo_link: {
    textDecoration: "none",
    color: "#b65c5d",
    lineHeight: "0px",
  },
  logo_sub: {
    color: "#090E2E",
  },
  menu_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#a6817a",
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px",
  },
  wallet_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#DDD",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px",
  },
  connected_wallet_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#DDD",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px",
  },
  search_field: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    color: "rgba(255,255,255,0.5)!important",
  },
  search_root: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    color: "rgba(255,255,255,0.5)!important",
    height: "50px",
    width: "25%",
    marginRight: "100px!important",
    "@media (max-width: 767.98px)": {
      width: "100%",
    },
  },
  search_input: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    padding: "10.5px 14px!important",
    fontFamily: "Poppins, sans-serif!important",
    fontStyle: "normal!important",
    fontWeight: "500!important",
    fontSize: "20px!important",
    lineHeight: "30px!important",
  },
  search_icon: {
    color: "rgba(255,255,255,0.5)!important",
  },
  smallline:{
    fontSize: "10px",
    fontWeight: "500",
  },
  smallt:{
    fontSize: "12px",
    fontWeight: "700",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { isConnected, defaultAccount, accountInfo, chainid } = useSelector(getData);
  const [burgButton, setBurgButton] = useState(false);


  const closeBurger = () => {
    setBurgButton(false);
  }

  const handleBurger = () => {
    setBurgButton(!burgButton);
  }
  

  return (
    <div className={classes.root}>
      <div className={classes.burger_mobile}>
        <Link className={classes.logo_link} exact to="/"><img src="/img/logo.png" alt="" height="80" /></Link>
        
      </div>
      <Sidebar/>
      <div className={burgButton ? classes.open_burger_menu : classes.burger_menu} >
        <div className={classes.connected_wallet_link}>
              
          

        
        </div>
      </div>
    </div>
  );
}

export default Header;
