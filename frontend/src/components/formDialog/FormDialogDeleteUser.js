import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, TextField } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select,{SelectChangeEvent} from '@material-ui/core/Select';
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const FormDialogDeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [checkEmail,setCheckEmail] = useState("test")

  useEffect(() => {
    setName(props.dataUser[0])
    setEmail(props.dataUser[1])
    console.log(props.dataUser[1])
  }, [props.dataUser])

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCheckEmail(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const handleChange = (event) => {
    setCheckEmail(event.target.value);
  };
  
  const handleSubmit = (e) => {
      const onSuccess = (msg) => {
          props.refresh()
          setOpen(false);
          if(msg=="Department Deleted" || msg=="Sub-admin access revoked")
          toast.success(msg);
          else
          toast.error(msg);
      }
      e.preventDefault();
      const data = {
          name: name,
          oldSubAdminEmail: checkEmail
      }
      props.delete(data, onSuccess,props.url)
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
            {props.isGodLevel ?
            (<div>

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
            </div>):
            (<div>
              <DialogContent style={{padding: "30px 30px 10px 30px"}}>
              <FormControl fullWidth>
                <TextField 
                  disabled
                  id="standard-disabled"
                  label="Department"
                  defaultValue={props.dataUser[0]}
                  variant="standard" />
                <div style={{"height":'2rem'}}>
                </div>
              {/* <InputLabel id="demo-multiple-checkbox-label">Sub-Admins Email</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={checkEmail}
                label="Age"
                onChange={handleChange}
              >
                {email && email.map((i) => (
                  <MenuItem key={i} value={i}>
                    <ListItemText primary={i} />
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              </DialogContent>
              <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Delete
                </Button>
            </DialogActions>
            </div>)
            }

      </Dialog>
    </div>
  );
}
//For multiple selection
{/* <Select
labelId="demo-multiple-checkbox-label"
id="demo-multiple-checkbox"
multiple
value={checkEmail}
onChange={handleChange}
input={<OutlinedInput label="Tag" />}
renderValue={(selected) => selected.join(', ')}
MenuProps={MenuProps}
>
{email && email.map((i) => (
  <MenuItem key={i} value={i}>
    <Checkbox checked={checkEmail.indexOf(i) > -1} />
    <ListItemText primary={i} />
  </MenuItem>
))}
</Select> */}
export default FormDialogDeleteUser;