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
          localStorage.setItem("profile", JSON.stringify(response.data.user));
          setProfileValue(response.data.user)
          return response.data.user;
        })
        .catch((err) => {
          console.log(err);
        });
      };
    if(localStorage.getItem("profile")){
      userProfile=JSON.parse(localStorage.getItem("profile"));
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
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>

          {activeTabId === 0 && (
            <React.Fragment>

                {errorMessage && (
                  <Fade in={true}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      {errorMessage}
                    </Typography>
                  </Fade>
                )}

                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  margin="normal"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  margin="normal"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (

                    <Button
                      disabled={
                        emailValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={handleLogin}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>

                  )}
                  <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                  </Button>
                </div>

                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>or</Typography>
                  <div className={classes.formDivider} />
                </div>
                
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
              
              {errorMessage && (
                <Fade in={true}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    {errorMessage}
                  </Typography>
                </Fade>
              )}
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                label="Name"
                placeholder="Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                margin="normal"
                label="Email"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                label="Password"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={
                      emailValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
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
