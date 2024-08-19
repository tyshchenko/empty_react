import { createSlice } from '@reduxjs/toolkit';
import { BigNumber } from '../utils/helper';
import { toast } from 'react-toastify';

const initialState = {
  isConnected: false,
  darkTheme: true,
  modal: false,
  interval:null,
  connectWallet: false,
  inProcess: false,
  defaultAccount: null,
  tronWeb: false,
  search: '',
  nfo: [0,0,0],
  series: [],
  connect: ()=>{},
  chainid: null,
  istronlink: false,
  categories: [],
  tronenergize: null,
  infoenergy: {a:"0",r:"0",s:"0",p:"0"},
  activePage: 'Exchange',
  translator:{},
  locale: 'en',
  accountInfo: {
      balance: BigNumber(0),
      bandwidth: BigNumber(0),
      energy: BigNumber(0),
      maxenergy: 0,
      fullaccount: null,
      delegatedlist:[],
      netlimit: BigNumber(0),
      success: false
    },
  activeItem: {id:1, payout:13, stake:5871, energy:100000, price:60, apy:21.0, duration:3, active:false, opened:false,amount:5577, txid:'234sdkfsdkgjsjgk',receiver:"",buyer:""},
};

export const appStoreSlice = createSlice({
  name: "appStore",
  initialState: initialState,
  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
  }
});

export const { setData } = appStoreSlice.actions;

export const getData = (state) => state.appStore;

export default appStoreSlice.reducer;

