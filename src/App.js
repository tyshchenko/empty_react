import './App.css';
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Automation from "./components/Automation/Automation";
import Help from "./components/Help/Help";
import Buy from "./components/Buy/Buy";
import Api from "./components/Api/Api";
import View from "./components/View/View";
import Edit from "./components/Edit/Edit";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getData } from './store/appStoreSlice';
import { setStore, initTronLinkWallet } from "./utils/utils";
import { getTrxBalance } from "./utils/blockchain";
import { ToastContainer, toast } from 'react-toastify';
import { ch,en,ru } from './utils/lang';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';

import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet';
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep';
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

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
  
  
  useEffect(async () => {
    if (defaultAccount) {
      const accountInfo = await  getTrxBalance(defaultAccount);
      console.log(accountInfo);
      setStore({accountInfo: accountInfo});
    }
  }, [defaultAccount])
  
  const loadData = async () => {
    
  }
  


  

  const onError = useCallback((e) => {
    console.log(e);
    console.log("onError");
  }, []);
  
  const onStateChanged = useCallback((e) => {
    console.log(e);
    console.log("onStateChanged");
    

  }, []);
  
  const onChainChanged = useCallback((e) => {
    console.log(e);
    console.log("onChainChanged");
    setStore({chainid: e});

  }, []);
  
  const adapters = useMemo(function () {
        const tronLink = new TronLinkAdapter();
        const okx = new OkxWalletAdapter();
        const bitKeep = new BitKeepAdapter();
        const tokenPocket = new TokenPocketAdapter();
        const walletConnect = new WalletConnectAdapter({
                network: 'Mainnet',
                options: {
                    relayUrl: 'wss://relay.walletconnect.com',
                    // example walletconnect app project ID
                    projectId: '651892adf8906f49f1536eae983a0abb',
                    metadata: {
                        name: 'TronEnergize',
                        description: 'TronEnergize App',
                        url: 'https://tronenergize.com',
                        icons: ['https://tronenergize.com/img/logo1.png'],
                    },
                },
                web3ModalConfig: {
                    themeMode: 'dark',
                    themeVariables: {
                        '--w3m-z-index': 1000,
                    },
                    /**
                    * Recommended Wallets are fetched from WalletConnect explore api:
                    * https://walletconnect.com/explorer?type=wallet&version=2.
                    * You can copy these ids from the page.
                    */
                    explorerRecommendedWalletIds: [
                        '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
                        '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
                        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
                    ],
                },
            });
        const ledger = new LedgerAdapter({
            accountNumber: 2,
        });
        return [tronLink, ledger, okx, bitKeep, tokenPocket, walletConnect];
  }, []);

  
  return (
    <WalletProvider onError={onError} onStateChanged={onStateChanged} onChainChanged={onChainChanged} adapters={adapters}>
      <WalletModalProvider>
      <div className={classes.app} id="root">
        <Header/>
        <ToastContainer theme={darkTheme ? "dark" : "light"} />
        <Route  path="/" exact render={() =>
          <Home />
        } />
        <Route  path="/help" exact render={() => 
            <Help />
        } />
        <Route  path="/buy" exact render={() => 
            <Buy />
        } />
        <Route  path="/view" exact render={() => 
            <View />
        } />
        <Route  path="/api_dashboard" exact render={() => 
            <Api />
        } />
        <Route  path="/edit" exact render={() => 
            <Edit />
        } />
        <Route  path="/automation" exact render={() => 
            <Automation />
        } />

        <Footer/>
        <div className={`${classes.blur} ${!modal ? classes.hidden : ''}`}/>

      </div>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
