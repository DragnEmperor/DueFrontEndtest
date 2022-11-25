import React from "react";
import API from "../utils/api"
import jwt from 'jwt-decode'
import { toast } from 'react-toastify';

let AuthContext;
const { Provider, Consumer } = (AuthContext = React.createContext());

class AuthProvider extends React.PureComponent {
    state = {
        token : null,
        authUser: null,
        errorMsg : null
    };

    isAuthenticated = () => {
      const tken = this.state.token ? this.state.token : localStorage.getItem("myDuetoken")
      if (!tken) return false
      // const decoded = jwt(tken); 
      // console.log(decoded)
      // if (Date.now() / 1000 > decoded.exp - 5) {
      //   localStorage.clear();
      //   toast.error('Session has expired, please re-login');
      //   return false
      // }
      return true
    }

    getAuthUser = () => {
      const usr = this.state.authUser ? this.state.authUser : localStorage.getItem("authDueUser")
      if (!usr) return null

      try {
        const parsed = JSON.parse(usr)
        return parsed
      }
      catch(err) {
        return usr
      }
    }

    setLogin = (data) => {
      if (data) {
        localStorage.setItem('myDuetoken', data.googleId)
        localStorage.setItem('authDueUser', JSON.stringify(data))
        this.setState({
          token : data.token,
          authUser: data.user
        })
      }
      else {
        this.setState({
          token : null,
          authUser: null
        })
        localStorage.removeItem("myDuetoken");
        localStorage.removeItem("authDueUser");
      }
    }
    
    login = (email, profile, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
      this.setLogin(null)

      if (!!email && !!profile) {
        const test=API.auth().login({ email, profile })
        console.log('test',test)
        this.setLogin(profile)
        setIsLoading(false)
        setErrorMessage(null)
        history.push('/admin/dashboard')
        // .then(res => {
        //     // console.log("res : ", JSON.stringify(res.data))
        //     console.log('response login',res)
        //     if (res.status === 200 && res.data) {
        //       this.setLogin(res.data)
        //       setIsLoading(false)
        //       setErrorMessage(null)
        //       history.push('/admin/dashboard')
        //       return true
        //     }
        //     else {
        //       setIsLoading(false);
        //       setErrorMessage( res.data.message)
        //       return false
        //     }
        // })
        // .catch(err => {
        //     setIsLoading(false);

        //     console.log(err)
        //     if (err.response)
        //       setErrorMessage(err.response.data.message)
        //     else {
        //       setErrorMessage(err)
        //     }
              
        //     return false
        // });
      } else {
        setIsLoading(false);
        setErrorMessage("email and password is empty")
        return false
      }
    }
    
    // register = (email, name, password, history, setIsLoading, setErrorMessage) => {
    //   setIsLoading(true);
    
    //   if (!!email && !!name && !!password) {
    //     API.auth().register({ email, name, password })
    //         .then(res => {
    //           // console.log(res)
    //           setErrorMessage(null)
    //           setIsLoading(false);
    //           history.push('/admin/login')
    //         })
    //         .catch(err => {
    //           console.log(err.response.data)
    //           setErrorMessage(err.response.data.error)
    //           setIsLoading(false);
    //         });
    //   } else {
    //     setErrorMessage("All field is required")
    //     setIsLoading(false);
    //   }
    // }

    logout = (history) => {
      this.setState({ 
        token : null,
        authUser: null
      });
      localStorage.removeItem("myDuetoken");
      localStorage.removeItem("authDueUser");
      localStorage.removeItem("profileDueNITH");
      localStorage.removeItem("accessBackend");
      API.auth().logout()
      history.push("/login");
    }

    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              login : this.login,
              register : this.register,
              logout : this.logout,
              isAuthenticated : this.isAuthenticated,
              getAuthUser : this.getAuthUser
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { AuthProvider, Consumer, AuthContext };
