import React,{useContext} from "react";
import {
    Button,
    Box
  } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";

const NoAcc=(props)=>{
    const { logout} = useContext(AuthContext)

    return(
        <Box sx={{ height:'100vh', display: 'flex', flexDirection: 'column', justifyContent:'center',  alignItems: 'center'}}>

        
            <h1 >No Account Found For this email</h1>
            <Button style={{backgroundColor:"#0096FF" , color : "white"}} onClick={() => logout(props.history)} variant="contained">Login</Button>
            
            
        
        </Box>
    )
}
export default NoAcc;