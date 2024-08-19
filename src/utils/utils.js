import { useCallback, useState } from "react";
import store from "../store";
import { setData } from "../store/appStoreSlice";
import TronWeb from 'tronweb';
import Config from '../config';
import { toast } from 'react-toastify';
import { getTrxBalance, mainchain } from "./blockchain";
import { BigNumber } from './helper';

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

export const numberWithCommas = (value)=> value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const setStore = (payload) => {
  store.dispatch(setData(payload));
};

export const getStore = () => {
  return store.getState().appStore;
};

export const refresh = async () => {
  const { defaultAccount } =  getStore();
  const accountInfo = await  getTrxBalance(defaultAccount);
  setStore({accountInfo: accountInfo});
}

export const setVariablesInterval = () => {
  const { interval } =  getStore();
    if (!interval) {
      setStore({ interval: setInterval(async () => {
        try {
          const { defaultAccount,accountInfo,tronenergize } =  getStore();
          if (defaultAccount && !accountInfo.success) {
            const accountInfo = await  getTrxBalance(defaultAccount);
            setStore({accountInfo: accountInfo});
            

          }
          if (tronenergize == null) {
            const response = await fetch(`/tronenergize/api/markets`);
            const result = await response.json();
            setStore({
              tronenergize: result.address,
              infoenergy: result.infoenergy
            });
          }
          console.log('this.checkPendingTransactions();');
        } catch (err) {
          console.log('interval error:' + err);
        }
      }, 3000)})
    }
};

export const setReady = (inProcess) => {
  store.dispatch(setData({inProcess}));
}

export const showConnectWallet = (connectWallet) => {
  setStore({ modal: connectWallet, connectWallet });
}

export const setSearch = (search) => {
  setStore({ search });
}

export const updateState = (key) => {
  return (value) => {
    setStore({ [key]: value });
  };
}

export const getRate = async () => {
  const { accountInfo } = await getStore();
  if (accountInfo.TotalEnergyLimit && accountInfo.TotalEnergyWeight) {
    return (accountInfo.TotalEnergyLimit || 10e10) / accountInfo.TotalEnergyWeight;
  } else {
    let tronWeb = mainchain;
    const accountResources = await tronWeb.trx.getAccountResources(Config.relayer);
    let newaccountinfo = {...accountInfo}
    newaccountinfo['TotalEnergyWeight'] = BigNumber(accountResources.TotalEnergyWeight);
    newaccountinfo['TotalEnergyLimit'] = BigNumber(accountResources.TotalEnergyLimit);
    setStore({accountInfo: newaccountinfo});
    
    return Number(accountResources.TotalEnergyLimit || 10e10) / Number(accountResources.TotalEnergyWeight);
  }
  
  
}

export  const toPriceDuration = (duration) => {
    var priceDuration = "SUN/Day";
    if (Number(duration) == 7200) { 
      priceDuration = "SUN/6Hours";
    }
    if (Number(duration) == 1200) { 
      priceDuration = "SUN/Hour";
    }
    return priceDuration;
}

  
export const toDuration = (duration) => {
  let numdur = Number(duration);
  if (numdur == 1200) { return "1 hour" }
  else if (numdur == 7200) { return "6 hours" }
  else if (numdur == 28800) { return "1 day" }
  else if (numdur == 863999) { return "30 days" }
  else if (numdur > 28800) {
    let days = String(parseInt(numdur/28800))
    return days + " days" 
  }
}

export const durationUnit = (duration) => {
  switch (duration)
  {
    case "1200":
      return "SUN/Hour";
      break;
    case "7200":
      return "SUN/6Hours";
      break;
    case "28800": 
      return "SUN/Day";
      break;
    case "86400": 
      return "SUN/Day";
      break;
    case "201600": 
      return "SUN/Day";
      break;
    case "403200": 
      return "SUN/Day";
      break;
    case "863999": 
      return "SUN/Day";
      break;

    default: 
      return "SUN/Day";
      break;
  }  
}
export const tonormduration = (duration) => {
    if (["1200", "7200", "28800", "86400", "201600", "403200"].includes(duration)) {
      return duration;
    } else {
      let numdur = Number(duration);
      if ( numdur >= 28800 && numdur < 86400 ) { return "28800" }
      else if ( numdur >= 86400 && numdur < 201600 ) { return "86400" }
      else if ( numdur >= 201600 && numdur < 403200 ) { return "201600" }
      else if ( numdur >= 403200 && numdur < 864000 ) { return "403200" }
    }
}

export const connect = async () => {

}


export const initTronLinkWallet = async (cb, cbn) => {
    try {
      const { connect } =  getStore();
      connect();
    } catch (e) {
      console.log(e);
    }
  };




export const useTransactions = (key) => {
  const [txlist, setTxlist] = useState([]);
  
  const getTxlist = useCallback( async () => {
    setReady(true);
    console.log("renew order list")
    
    const response = await fetch(`/tronenergize/api/markets?`+key);
    const result = await response.json();
      
    setTxlist(result.data);
    setStore({
      infoenergy: result.infoenergy
    });
    if (result.nfo) {
      setStore({
        nfo: result.nfo,
        categories: result.categories,
        series: result.series,
        
      });
    }
    setReady(false);
  }, [])
  
  return { getTxlist, txlist };
}


export const useOrder = (key) => {
  const [order, setOrger] = useState([]);
  
  const getOrger = useCallback( async () => {
    setReady(true);
    const response = await fetch(`/api/v1/status/`+key);
    const result = await response.json();
      
    setOrger(result.data[0]);
    setReady(false);
  }, [])
  return { getOrger, order };
}


export const t = (key) => {
  const { translator } =  getStore();
  
  if (translator[key]) {
    return translator[key];
  } else {
    return key
  }
}
