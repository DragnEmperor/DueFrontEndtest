import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import Grow from "@material-ui/core/Grow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = {
  id: null,
  name: "",
  amount: "",
};

const FormDialogEditUser = props => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setErrors({});
    setUser({
      id: "",
      rollNumber: props.dataUser[0],
      amount: props.dataUser[1],
    });
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

    if (!user.rollNumber || user.rollNumber.trim() === "") {
      formIsValid = false;
      tempErrors["rollNumber"] = "Cannot be empty";
    }

    if (!user.amount || user.amount.trim() === "") {
      formIsValid = false;
      tempErrors["Amount"] = "Cannot be empty";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = e => {
    const onSuccess = (msg) => {
      props.refresh()
      setOpen(false);
      if(msg=="Student Due changed")
      toast.success(msg);
      else
      toast.error(msg);
    };
    e.preventDefault();

    if (validate()) {
      const name=JSON.parse(localStorage.getItem('setDueDepartment'));
      const amount = user.amount;
      const rollNumber = user.rollNumber;
      props.update({user,name,amount, rollNumber}, onSuccess,props.url);
    }
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
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
          Edit User
        </DialogTitle>

        <DialogContent style={{ padding: "30px 30px 10px 30px" }}>
        <TextField
            name="rollNumber"
            label="Roll No"
            value={user.rollNumber}
            fullWidth
            onChange={handleInputChange}
            {...(errors.rollNumber && { error: true, helperText: errors.rollNumber })}
          />

          <br />
          <br />


          <TextField
            name="amount"
            label="Amount"
            value={user.amount}
            fullWidth
            onChange={handleInputChange}
            {...(errors.amount && { error: true, helperText: errors.amount })}
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

export default FormDialogEditUser;
