import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = { 
	id: null, 
	name: "",
  email: ""
}

const FormDialogEditUser = (props) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  const handleClickOpen = () => {
      setErrors({});
      setUser({
        id : props.dataUser[0],
        name : props.dataUser[1],
        email : props.dataUser[2]
      })
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!user.name || user.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }

      if(!user.email || user.email.trim() ===  ""){
        formIsValid = false;
        tempErrors["email"] = "Cannot be empty";
      }

      let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regexp.test(user.email)) {
        formIsValid = false;
        tempErrors["email"] = "Email is not valid";
      }

      setErrors(tempErrors);
      return formIsValid;
  }

  const handleSubmit = (e) => {
     // code to add back user
  }

  return (
    <div>
      <Button color="primary" onClick={handleSubmit}>
          Add Back
      </Button>
    </div>
  );
}

export default FormDialogEditUser;