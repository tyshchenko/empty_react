import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button,TextField,Switch } from "@mui/material";
import { setStore, t } from "../../utils/utils";
import { formatNumber, BigNumber } from '../../utils/helper';
import { toast } from 'react-toastify';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import Config from '../../config';
import _ from "lodash";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontStyle: "normal",
    padding: "20px 122px 0",
    justifyContent: "space-between",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    minHeight: "100vh",
    lineHeight: "20px",
    color: "#FFF",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
    },
  },
  titlebox: {
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "center",
  },
  lefttitlebox: {
    color: "#FFF",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "14px",
    margin: "12px 0",
  },
  pbox: {
    color: "#FFF",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "18px",
    margin: "12px",
  },
  ordercard: {
    padding: "12px",
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.10)",
    borderRadius: "5px",

    background: "rgba(138, 123, 123, 0.34)",


  },
  line: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "11%",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  },
  line_s: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "-14px",
    padding: "0 24px",
  },
  item_s: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "11%",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  },
  item_ss: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "124px",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  }, 
  itemaw: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",

    fontWeight: "700",

  },
  mitem: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",

    fontWeight: "700",


  },
  ritem: {
    fontSize: "14px",
    fontWeight: "700",
    textAlign:"right",
  },  
    linebutton: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(254, 44, 44, 0.31)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    margin: "8px 12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#FFF",
  },
  disabledbutton: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(138, 123, 123, 0.34)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    marginTop:  "14px",
    fontSize: "12px",
    color: "#FFF",
    fontWeight: "400",
    width:"124px",
    cursor:"pointer",
    "@media (max-width: 767.98px)": {
      width: "100%",
    },
  },
  box: {
    display: "flex",
    flexDirection:"column",
    height: "100vh",
    overflowY: "auto",
  },
  infobox: {
    display: "flex",
    flexDirection:"row",
    height: "0px",
    overflow: "visible",
    paddingLeft: "8px",
    paddingRight: "8px",
    "@media (max-width: 767.98px)": {
      height: "auto",
    },
  },
  
  infoboxflex: {
    display: "flex",
    flexDirection:"row",
    height: "0px",
    overflow: "visible",
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyContent: "space-between",
    "@media (max-width: 767.98px)": {
      height: "auto",
    },
  },
  left: {
    flexDirection: "column",
    width: "430px",
    display: "flex",
  },
  container: {
    borderRadius: "10px",
    background: "rgba(138, 123, 123, 0.34)",
    margin: "12px",
    padding: "12px",
  },
  smitem: {
    fontWeight: "normal",
    fontSize: "9px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "400",
  },
  smitemclick: {
    fontWeight: "normal",
    fontSize: "9px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "400",
    cursor:"pointer",
  },
  bitem: {
    fontSize: "14px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "700",
  },
  smritem: {
    fontWeight: "normal",
    fontSize: "10px",
    lineHeight: "14px",
    margin: "0",
    textAlign: "right",
    fontWeight: "400",
  },
  right: {
    width: "100%",
  },
  menu_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    alignItems: "center",
    display: "flex",
  },
  menu_link_active: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    alignItems: "center",
    display: "flex",
    borderRadius: "16px",
    background: "linear-gradient(164deg, #BEAE1F 13.54%, #950404 43.23%, #951E04 68.86%, #CD9402 97.92%)",
    
  },
  menu_text: {

    padding: "0 12px",

  },
  hidden: {

    display: "none",

  },
  showed: {
    padding: "0 4px",
  },
  zcontainer: {
    borderRadius: "10px",
    background: "rgba(138, 123, 123, 0.6)",
    margin: "auto",
    padding: "12px",
    zIndex: "111",
    width: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filledbox: {
    justifyContent: "center",
    display: "flex",
    borderRadius: "5px",
    background: "rgba(138, 123, 123, 0.97)",
    flexDirection:"column",
    padding: "24px",
  },
  topcheckboxes: {
    justifyContent: "space-between",
    display: "flex",

  },

  start_button: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(138, 123, 123, 0.34)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    fontSize: "10px",
    color: "#FFF",
    fontWeight: "400",
    marginTop: "14px!important",
    width: "100%",

    backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    textTransform: "initial!important",
    "&:hover": {
      backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    }
  },
  link: {
    color: "#fff !important",
  },
  textField_root: {
    marginTop: "15px!important",
    width: "100%",
  },
  textField: {
    color: "#FFF!important",
    "&::before": {
      borderBottom: "1px solid #FFF!important",
    },
    "&::after": {
      borderBottom: "1px solid rgba(138, 123, 123, 0.5)!important",
    }
  },
  block: {
    margin: "4px",
  },
  
  
    swroot: {
      width: "38px !important",
      height: "28px !important",
    },
    swswitchBase: {
//      padding: 1,
      '&.Mui-checked': {
        // This is the part that animates the thumb when the switch is toggled (to the right)
//        transform: 'translateX(10px) !important',
        // This is the thumb color
        //color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          // This is the track's background color (in this example, the iOS green)
          backgroundColor: '#B40F09 !important',
//          opacity: 1,
//          border: 'none',
        },
      },
    },
    swthumb: {
      width: "10px !important",
      height: "10px !important",
    },
    swtrack: {
//      padding: 2,
      //borderRadius: 19,
      //border: `1px solid ${theme.palette.grey[300]}`,
      // This is the background color when the switch is off
      //backgroundColor: theme.palette.grey[200],
      //height: 30,
      //opacity: 1,

      //transition: theme.transitions.create(['background-color', 'border']),
    },
    swchecked: {
            transform: 'translateX(10px) !important',
            color: '#B40F09 !important',

    },
    swfocusVisible: {
//            padding: 4,

    },
  
}));

const Home = (props) => {
  const classes = useStyles();
  const { modal,isConnected,defaultAccount,activeItem,accountInfo,infoenergy } = useSelector(getData);
  const navigate = useHistory();
  const [partialmodal, setPartialmodal] = useState(false);
  const [multysig, setMultysig] = useState(false);
  const [partenergy, setPartenergy] = useState(accountInfo.energy);
  const [vnrgMsg, setVnrgMsg] = useState("");
  const [seller, setSeller] = useState("");
  const [earner, setEarner] = useState("");
  const [vnrgSellMsg, setVnrgSellMsg] = useState("");
  const [sortorder, setSortorder] = useState("price");
  const { getTxlist, txlist } = useTransactions("");
  const [sellbtn, setSellbtn] = useState("Sell Now");
  const [disabledSBT, setDisabledSBT] = useState(false);
  const [iunderstand, setIunderstand] = useState(true);

  
  const [ items, setItems ] = useState([]);

  
  const compare = ( a, b ) => {
    if ( a.active == b.active ) {
      if ( a[sortorder] < b[sortorder] ){
        return 1;
      }
      if ( a[sortorder] > b[sortorder] ){
        return -1;
      }
      return 0;
    } else {
      if ( a.active ){
        return -1;
      }
      return 1;
    }
  }
    
  useEffect(() => {
    if (isConnected && defaultAccount != null ) {
      setSeller(defaultAccount);
      setEarner(defaultAccount);
    }
  }, [defaultAccount, isConnected])

  useEffect(() => {
    getTxlist();
    setStore({activePage: 'Exchange'})
  }, [])
  
  useEffect(() => {
    setPartenergy(accountInfo.energy);
  }, [accountInfo])

  useEffect(() => {
    window.interval23 = setInterval(
      () => getTxlist(),
      7000
    )
    return () => {
      clearInterval(window.interval23)
    }
  }, [])
    
  useEffect(() => {
    if (txlist) {
      setItems(txlist.sort( compare ));
      console.log(txlist)
    }
  }, [txlist, sortorder])

  

  return (
    <div className={classes.root}>

      <div className={classes.right}>
        <div className={classes.container}>
          <div className={classes.headerblok}>
            <div className={classes.infoboxflex}>
              <div className={classes.infobox}>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("Energy Available")}</p>
                  <p className={classes.bitem}>{infoenergy.a}⚡</p>
                </div>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("24h Recovery")}</p>
                  <p className={classes.bitem}>{infoenergy.r}⚡</p>
                </div>
              </div>
              <div className={classes.infobox}>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("Energy Sold")}</p>
                  <p className={classes.bitem}>{infoenergy.s}⚡</p>
                </div>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("Payouts")}</p>
                  <p className={classes.bitem}>{infoenergy.p}TRX</p>
                </div>
              </div>
            </div>          
            <h1 className={classes.titlebox}>{t("Market Orders")}</h1>
            

          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default withRouter(Home);
