import React,{useContext} from "react";
import {
    Button,
    Box
  } from "@material-ui/core";
import {AuthContext} from "../../context/AuthContext"

const Logout=(props)=>{
    const { logout} = useContext(AuthContext)
    return(
        <Box sx={{ height:'100vh', display: 'flex', flexDirection: 'column', justifyContent:'center',  alignItems: 'center'}}>

        
            <h1>You Don't Have Access to this Region login from authorized Account</h1>
            <Button  style={{backgroundColor:"#0096FF" , color : "white"}} variant="contained" onClick={()=>logout(props.history)}>Logout</Button>
        </Box>
    )
}
export default Logout;