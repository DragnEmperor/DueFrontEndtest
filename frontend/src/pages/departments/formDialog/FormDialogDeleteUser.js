import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const FormDialogDeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [deptName, setDeptName] = useState(null);

  useEffect(() => {
    setDeptName(props.dataUser[0])
  }, [props.dataUser])

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }
  
  const handleSubmit = (e) => {
      const onSuccess = (msg) => {
          setOpen(false);
          if(msg==="success")
          toast.success('Department succesfully deleted');
          else
          toast.error(msg);
      }
      e.preventDefault();
      console.log(props.dataUser[1])
      props.delete(deptName, onSuccess)
  }

  return (
    <div>
      <IconButton style={{ color: 'red' }} onClick={handleOpen}>
          <DeleteIcon />
      </IconButton>
      <Dialog  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Delete User</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                <DialogContentText>
                    Are you sure want to delete this record?
                </DialogContentText>
            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Delete
                </Button>
            </DialogActions>

      </Dialog>
    </div>
  );
}

export default FormDialogDeleteUser;