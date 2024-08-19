import './App.css';
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getData } from './store/appStoreSlice';
import { setStore } from "./utils/utils";

import { ToastContainer, toast } from 'react-toastify';
import { ch,en,ru } from './utils/lang';

import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  blur: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backdropFilter: "blur(3px)",
  },
  hidden: {
    display: "none",
  },
  app: {
    background: "url('/img/BG.png')",
    backgroundColor: "black",
    backgroundRepeat: "no-repeat",
  }
}));

const App = (props) => {
  const classes= useStyles();
  const { modal, isConnected, defaultAccount, darkTheme, locale } = useSelector(getData);
  

  
  useEffect(() => {
    if (locale == 'en') {
      setStore({translator: en});
    }
    if (locale == 'ch') {
      setStore({translator: ch});
    }
    if (locale == 'ru') {
      setStore({translator: ru});
    }
      

  }, [locale]);
  
  


  return (

      <div className={classes.app} id="root">
        <Header/>
        <ToastContainer theme={darkTheme ? "dark" : "light"} />
        <Route  path="/" exact render={() =>
          <Home />
        } />

        <Footer/>
        <div className={`${classes.blur} ${!modal ? classes.hidden : ''}`}/>

      </div>

  );
}

export default App;
