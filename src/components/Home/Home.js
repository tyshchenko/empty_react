import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button,TextField,Switch } from "@mui/material";
import { useTransactions, setStore, initTronLinkWallet,toDuration, toPriceDuration, t } from "../../utils/utils";
import { sellEnergy } from "../../utils/blockchain";
import { formatNumber, BigNumber } from '../../utils/helper';
import { toast } from 'react-toastify';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import Config from '../../config';
import _ from "lodash";
import {  useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';


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
  const { multiSign, signTransaction } = useWallet();
  
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

  const loadData = async () => {
    
  }
  const handleConfirmSell = async () => {
    setSellbtn("Sending ...")
    setDisabledSBT(true);

    await sellEnergy(activeItem.receiver, activeItem.energy, activeItem.price, activeItem.duration, activeItem.id, seller, multysig, earner, iunderstand, multiSign, signTransaction)
    await setStore({modal: false});
    setSellbtn("Sell Now")
    setDisabledSBT(false);
    getTxlist();
  }
  
  const handleConfirmPartSell = async () => {
    setDisabledSBT(true);
    await sellEnergy(activeItem.receiver, partenergy, activeItem.price, activeItem.duration, activeItem.id, seller, multysig, earner, iunderstand, multiSign, signTransaction)
    await setStore({modal: false});
    setDisabledSBT(false);
    setPartialmodal(false);
    getTxlist();
  }
  
  const handleCancel = async () => {
      setStore({modal: false});
      setPartialmodal(false);
  }
  
  const handleGoPart = async () => {
      setStore({modal: false});
      setPartialmodal(true);
  }
  
  const handleChange = (prop) => async (event) => {
    var vaslue = event.target.value
    setPartenergy(vaslue);
  };
  
  const changeSeller = () => async (event) => {
    var vaslue = event.target.value
    setSeller(vaslue);
  };
  
  const changeEarner = () => async (event) => {
    var vaslue = event.target.value
    setEarner(vaslue);
  };
    
  useEffect(async () => {
    if (Number(partenergy) < 32000)  {
      setVnrgMsg(t("minimum 32000 Energy!"));
    } else if (Number(accountInfo.energy) == 0 && !multysig)  {
      setVnrgMsg(t("Insufficient balance"));
    } else if ((Number(partenergy) > Number(accountInfo.energy)) && !multysig)  {
      setVnrgMsg(t("maximum ") + accountInfo.energy);
    } else if (Number(partenergy) > Number(activeItem.energy))  {
      setVnrgMsg(t("maximum ") + activeItem.energy);
    } else if ( vnrgMsg != "" ) { 
      setVnrgMsg("");
    }

  }, [partenergy, activeItem, multysig])
  
  useEffect(async () => {

    if (Number(partenergy) > Number(activeItem.energy))  {
      setPartenergy(activeItem.energy);
    }

  }, [activeItem])
  
  const handleSell = async (item) => {
    await setStore({activeItem: item});
    
    if (isConnected) {
      if (item.buyer==defaultAccount) {
        navigate.push("/edit");
      } else {
        console.log(accountInfo.energy);
        console.log(item.energy);
        if (Number(accountInfo.energy) >= Number(item.energy)) {
          setStore({modal: true})
        } else {
          setPartialmodal(true);
        }
      }
    } else {
      initTronLinkWallet();
    }
  }
  
  const handleOpen = (item) => {
    item.opened = !item.opened;
    setItems([...items]);
  }
  

  const renderTXs = (txs) => {
    return (
      txs.map((item)=>{
        return (
          <a target="_blank" className={classes.link} href={ Config.tronscanUrl + "/transaction/" + item }>{item}</a>
        )
      })
    )
  }

  const renderColumns = (columns) => {
    return (
      columns.map((item)=>{
        return (
          <div className={classes.ordercard}>
            <div className={classes.line}>
              <div className={classes.item} onClick={()=>setSortorder("payout")}>
                <div>{formatNumber((item.payout*0.75)/10**Config.defaultDecimal,3)} <span className={classes.smitem}>TRX</span></div>
                <div className={classes.smitem}>{t("PAYOUT")}</div>
              </div>
              <div className={classes.item} onClick={()=>setSortorder("stake")}>
                <div>{formatNumber(item.stake,0)} <span className={classes.smitem}>TRX</span></div>
                <div className={classes.smitem}>{t("STAKE AMOUNT")}</div>
              </div>
              <div className={classes.item} onClick={()=>setSortorder("apy")}>
                {formatNumber(item.apy,0)}%
                <div className={classes.smitem}>{t("APY")}</div>
              </div>
              <div className={classes.item} onClick={()=>setSortorder("energy")}>
                {formatNumber(item.energy,0)}
                <div className={classes.smitem}>{t("ENERGY")}</div>
              </div>
              <div className={classes.item} onClick={()=>setSortorder("price")}>
                <div>{formatNumber(item.price,0)} <span className={classes.smitem}>SUN</span></div>
                <div className={classes.smitem}>{t(toPriceDuration(item.duration))}</div>
              </div>
              <div className={classes.item} onClick={()=>setSortorder("duration")}>
                <div>{t(toDuration(item.duration))} <span className={classes.smitem}></span></div>
                <div className={classes.smitem}>{t("DURATION")}</div>
              </div>

              { item.active 
                ? <div className={classes.disabledbutton} onClick={()=>handleSell(item)}>{ !isConnected ? <>{t("Connect wallet")}</> : (item.buyer==defaultAccount) ? <>{t("Edit")}</> : (Number(accountInfo.energy) >= Number(item.energy)) ? <>{t("Sell energy")}</> : <>{t("Sell energy")}</> }</div>
                : <div className={classes.disabledbutton} onClick={()=>handleOpen(item)}>{t("Filled")} <div className={item.opened ? classes.hidden : classes.showed }>▾</div><div className={!item.opened ? classes.hidden : classes.showed }>▴</div></div>
              }

            </div>
            
            { item.opened 
              ? <div className={classes.line}> 
                  <div className={classes.itemaw}>
                    <div>{t("Transaction IDs")}: {renderTXs(item.delegatetxid)}</div>
                  </div>
                  <div className={classes.itemaw}>
                    <a target="_blank" className={classes.link} href={ Config.tronscanUrl + "/transaction/" + item.txid }>{t("Tronscan")}</a>
                  </div>
                </div>
              : <></>
            }
            
            
          </div>

          
        )
     }));
  };

  const renderSort = () => {
        return (
            <div className={classes.line_s}>
              <div className={classes.item_s} onClick={()=>setSortorder("payout")}>
                { sortorder == "payout" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_s} onClick={()=>setSortorder("stake")}>
                { sortorder == "stake" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_s} onClick={()=>setSortorder("apy")}>
                { sortorder == "apy" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_s} onClick={()=>setSortorder("energy")}>
                { sortorder == "energy" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_s} onClick={()=>setSortorder("price")}>
                { sortorder == "price" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_s} onClick={()=>setSortorder("duration")}>
                { sortorder == "duration" ? <>▾</> : <></> }
              </div>
              <div className={classes.item_ss} onClick={()=>setSortorder("duration")}>

              </div>
            </div>

        )
  };
  

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
          
          <div className={classes.box}>
            { items.length > 0 && renderSort() }
            { renderColumns(items) }
            { items.length == 0 && 
              <>
              <h4> {t("No orders found")} </h4>
              </>
            }

          </div>
        </div>
      </div>
      
      { modal && 
      <div className={classes.zcontainer}>
        <div className={classes.filledbox}>
          <div className={classes.titlebox}>{t("Sell energy")}</div>
              <div className={classes.ritem}>
                <div className={classes.topcheckboxes}>
                  <div className={classes.smitemclick} onClick={()=>{setIunderstand(!iunderstand)}}>{t("Ignore DOUBLE Delegation")}
                      <Switch
                        classes={{
                                root: classes.swroot,
                                switchBase: classes.swswitchBase,
                                thumb: classes.swthumb,
                                track: classes.swtrack,
                                checked: classes.swchecked,
                              }}
                        checked={iunderstand}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                  </div>
                  <div className={classes.smitemclick} onClick={()=>{setMultysig(!multysig)}}>{t("Multisig Delegating")}
                      <Switch
                        classes={{
                                root: classes.swroot,
                                switchBase: classes.swswitchBase,
                                thumb: classes.swthumb,
                                track: classes.swtrack,
                                checked: classes.swchecked,
                              }}
                        checked={multysig}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                  </div>
                </div>

                { multysig && <>

                  <TextField 
                    id="seller" 
                    label={t("Account under control address")}
                    type="text" 
                    variant="standard"
                    error={vnrgSellMsg != ""}
                    helperText={vnrgSellMsg}
                    onChange={changeSeller()}
                    value={seller}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />     
                  <TextField 
                    id="earner" 
                    label={t("Payout receiver")}
                    type="text" 
                    variant="standard"
                    error={vnrgSellMsg != ""}
                    helperText={vnrgSellMsg}
                    onChange={changeEarner()}
                    value={earner}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />     
                  </>}
              </div>
              <div className={classes.mitem}>
                {formatNumber(activeItem.energy,0)}
                <div className={classes.smitem}>{t("ENERGY")}</div>
              </div>
              <div className={classes.mitem}>
                <div>{formatNumber(activeItem.price,0)} <span className={classes.smitem}>SUN</span></div>
                <div className={classes.smitem}>{toPriceDuration(activeItem.duration)}</div>
              </div>
              <div className={classes.mitem}>
                <div>{t(toDuration(activeItem.duration))} <span className={classes.smitem}></span></div>
                <div className={classes.smitem}>{t("DURATION")}</div>
              </div>
              
              <div className={classes.mitem}>
                <div className={classes.bitem}>{formatNumber((activeItem.payout*0.75)/10**Config.defaultDecimal,3)} TRX</div>
                <div className={classes.smitem}>{t("PAYOUT")}</div>
              </div>
          
          <Button
                classes={{root: classes.start_button}}
                variant="contained" 
                color="primary"
                onClick={handleConfirmSell}
                disabled={ disabledSBT }
              >
                {t(sellbtn)}
          </Button>
          <Button
                classes={{root: classes.start_button}}
                variant="contained" 
                color="primary"
                onClick={handleGoPart}
                disabled={ disabledSBT }
              >
                 {t("Fill partially")}
          </Button>
          <Button
                classes={{root: classes.start_button}}
                variant="contained" 
                color="primary"
                onClick={handleCancel}
                disabled={ disabledSBT }
              >
                 {t("Cancel")}
          </Button>
          
        </div>
      </div>
      }

      { partialmodal && 
      <div className={classes.zcontainer}>
        <div className={classes.filledbox}>
          <div className={classes.titlebox}>{t("Sell energy")}</div>
              <div className={classes.ritem}>
                <div className={classes.topcheckboxes}>
                  <div className={classes.smitemclick} onClick={()=>{setIunderstand(!iunderstand)}}>{t("Ignore DOUBLE Delegation")}
                      <Switch
                        classes={{
                                root: classes.swroot,
                                switchBase: classes.swswitchBase,
                                thumb: classes.swthumb,
                                track: classes.swtrack,
                                checked: classes.swchecked,
                              }}
                        checked={iunderstand}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                  </div>
                  <div className={classes.smitemclick} onClick={()=>{setMultysig(!multysig)}}>{t("Multisig Delegating")}
                      <Switch
                        classes={{
                                root: classes.swroot,
                                switchBase: classes.swswitchBase,
                                thumb: classes.swthumb,
                                track: classes.swtrack,
                                checked: classes.swchecked,
                              }}
                        checked={multysig}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                  </div>
                </div>
                { multysig && <>

                  <TextField 
                    id="seller" 
                    label={t("Account under control address")}
                    type="text" 
                    variant="standard"
                    error={vnrgSellMsg != ""}
                    helperText={vnrgSellMsg}
                    onChange={changeSeller()}
                    value={seller}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />     
                  <TextField 
                    id="earner" 
                    label={t("Payout receiver")}
                    type="text" 
                    variant="standard"
                    error={vnrgSellMsg != ""}
                    helperText={vnrgSellMsg}
                    onChange={changeEarner()}
                    value={earner}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />     
                  </>}
  
              </div>
              <div className={classes.mitem}>

                <TextField 
                  id="energyamount" 
                  label={t("Energy amount")}
                  type="number" 
                  variant="standard"
                  error={vnrgMsg != ""}
                  helperText={vnrgMsg}
                  onChange={handleChange('energyamount')}
                  value={partenergy}
                  classes={{root: classes.textField_root}}
                  InputLabelProps={{classes: {root: classes.textField}}}
                  InputProps={{classes: {underline: classes.textField}}}
                />            

                <div className={classes.smitem}>{t("ENERGY")}</div>
              </div>
              <div className={classes.mitem}>
                <div>{formatNumber(activeItem.price,0)} <span className={classes.smitem}>SUN</span></div>
                <div className={classes.smitem}>{toPriceDuration(activeItem.duration)}</div>
              </div>
              <div className={classes.mitem}>
                <div>{t(toDuration(activeItem.duration))} <span className={classes.smitem}></span></div>
                <div className={classes.smitem}>{t("DURATION")}</div>
              </div>
              
              <div className={classes.mitem}>
                <div className={classes.bitem}>{formatNumber(((activeItem.payout*0.75*Number(partenergy))/10**Config.defaultDecimal)/activeItem.energy,3)} TRX</div>
                <div className={classes.smitem}>{t("PAYOUT")}</div>
              </div>
          
          <Button
                classes={{root: classes.start_button}}
                variant="contained" 
                color="primary"
                disabled={ disabledSBT || vnrgMsg != "" || vnrgSellMsg != "" }
                onClick={handleConfirmPartSell}
              >
                { multysig ?  t("Sell energy") : t("Fill partially") }
          </Button>
          <Button
                classes={{root: classes.start_button}}
                variant="contained" 
                color="primary"
                onClick={handleCancel}
                disabled={ disabledSBT }
              >
                {t("Cancel")}
          </Button>
          
        </div>
      </div>
      }
      
    </div>
  )
}

export default withRouter(Home);
