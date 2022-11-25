import React, { useState, useContext,useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import nith from "./nith1.png";
import google from "../../images/google.svg";
// context
// import { useUserDispatch, loginUser, registerUser } from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ContactSupport } from "@material-ui/icons";

function Login(props) {

  // global
  // var userDispatch = useUserDispatch();
  const { login, register } = useContext(AuthContext)

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [errorMessage, setErrorMessage] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [profileValue, setProfileValue] = useState("");
  var [accessBackend, setaccessBackend] = useState(false);

  useEffect(() => {
    let userProfile="";
    const getUser = () => {
      axios.get("http://localhost:5000/auth/login/success", { withCredentials: true })
        .then((response) => {
          console.log(response);
          localStorage.setItem("profileDueNITH", JSON.stringify(response.data.user));
          setProfileValue(response.data.user)
          return response.data.user;
        })
        .catch((err) => {
          console.log(err);
        });
      };
    if(localStorage.getItem("profileDueNITH")){
      userProfile=JSON.parse(localStorage.getItem("profileDueNITH"));
      setProfileValue(userProfile)
    }
    
    if(accessBackend || localStorage.getItem("accessBackend")){
      getUser();
      localStorage.setItem("accessBackend", true);
    }
  }, [accessBackend]);

   useEffect(() => {
    handleLogin();
   },[profileValue]);

  const classes = useStyles();
  const handleChangeTab = (id) => {
    setActiveTabId(id)
    // setErrorMessage(null)
  }

  const handleLogin = () => {
    if(profileValue){
      console.log(profileValue)
      if(profileValue.isGodLevelAdmin || profileValue.subAdminRightsOf.length!=0 || profileValue.superAdminRightsOf.length!=0){
        login(profileValue.email,profileValue,props.history,setIsLoading,setErrorMessage);
      }
      else{
        props.history.push('/noaccount')
      }
    }
  }

  const handleRegister = () => {
    register(
      emailValue,
      nameValue,
      passwordValue,
      props.history,
      setIsLoading,
      setErrorMessage,
    )
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={nith} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Due Clearance System</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => handleChangeTab(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>

          {activeTabId === 0 && (
            <React.Fragment>
                
                <Button size="large" className={classes.googleButton} onClick={()=>{
                  setaccessBackend(true); 
                  return window.open("http://localhost:5000/auth/google", "_self")}}>
                  <img src={google} alt="google" className={classes.googleIcon} />
                  &nbsp;Sign in with Google
                </Button>

            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Register with NITH ID
              </Button>
            </React.Fragment>
          )}

        </div>
        <Typography color="primary" className={classes.copyright}>
        © NIT, Hamirpur 
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
