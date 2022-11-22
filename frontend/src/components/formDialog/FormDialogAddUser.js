import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { toast } from "react-toastify";
import Grow from "@material-ui/core/Grow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = {
  id: null,
  name: "",
  AdminEmail: "",
};

const FormDialogAddUser = props => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setErrors({});
    setUser(initialFormState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!user.name || user.name.trim() === "") {
      formIsValid = false;
      tempErrors["name"] = "Cannot be empty";
    }

    if (!user.AdminEmail || user.AdminEmail.trim() === "") {
      formIsValid = false;
      tempErrors["AdminEmail"] = "Cannot be empty";
    }

    let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(user.AdminEmail)) {
      formIsValid = false;
      tempErrors["AdminEmail"] = "Email is not valid";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = e => {
    const onSuccess = (msg) => {
      props.refresh()
      setOpen(false);
      if(msg=="Department created" || msg=="Sub-admin added" ||msg=="Student added")
      toast.success(msg);
      else
      toast.error(msg);
    };
    e.preventDefault();

    if (validate()) {
      props.create(user,onSuccess,props.url);
    }
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddCircleIcon style={{ fontSize: "40px" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ padding: "30px 30px 0px 30px" }}
        >
          Add Department
        </DialogTitle>

        <DialogContent style={{ padding: "30px 30px 10px 30px" }}>
          <TextField
            autoFocus
            name="id"
            label="Id"
            value={user.id}
            fullWidth
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />

          <br />
          <br />

          <TextField
            autoFocus
            name="name"
            label="Name"
            value={user.name}
            fullWidth
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />

          <br />
          <br />

          <TextField
            name="AdminEmail"
            label="Admin Email"
            value={user.AdminEmail}
            fullWidth
            onChange={handleInputChange}
            {...(errors.AdminEmail && { error: true, helperText: errors.AdminEmail })}
          />
        </DialogContent>

        <DialogActions style={{ padding: 30 }}>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogAddUser;
