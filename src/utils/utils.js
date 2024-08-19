import { useCallback, useState } from "react";
import store from "../store";
import { setData } from "../store/appStoreSlice";
import TronWeb from 'tronweb';
import Config from '../config';
import { toast } from 'react-toastify';
import { BigNumber } from './helper';

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

export const numberWithCommas = (value)=> value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const setStore = (payload) => {
  store.dispatch(setData(payload));
};

export const getStore = () => {
  return store.getState().appStore;
};


export const setReady = (inProcess) => {
  store.dispatch(setData({inProcess}));
}


export const setSearch = (search) => {
  setStore({ search });
}

export const updateState = (key) => {
  return (value) => {
    setStore({ [key]: value });
  };
}




export const connect = async () => {

}

export const t = (key) => {
  const { translator } =  getStore();
  
  if (translator[key]) {
    return translator[key];
  } else {
    return key
  }
}
