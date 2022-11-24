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
import AddIcon from "@material-ui/icons/Add";
import { Fab  } from "@material-ui/core";
import axios from 'axios';
import FormData from 'form-data';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = {
  id: null,
  name: "",
  rollNumber: "",
};

const FormDialogAddUser = props => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [file, selectFile] = useState({name:""});
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
    if(file.name==""){

    
    if (!user.name || user.name.trim() === "") {
      formIsValid = false;
      tempErrors["name"] = "Cannot be empty";
    }

    if (!user.rollNumber || user.rollNumber.trim() === "") {
      formIsValid = false;
      tempErrors["rollNumber"] = "Cannot be empty";
    }

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
    const department=JSON.parse(localStorage.getItem('setDueDepartment'));
    const rollNumber = user.rollNumber;
    const hasDue = true;
    if (validate()) {
        if(file.name==""){

            props.create({department,user,rollNumber,hasDue},onSuccess,props.url);
        }
        else{
            const form = new FormData();
            form.append("department",department);
            console.log("here is call",file);
            toast.success("file uploading");
            form.append('studentRecord', file, 'data.xlsx');
            axios.post("http://localhost:5000/due/uploadfile",form,{withCredentials: true}).then((res)=>{
                console.log("res : ", res);
                selectFile({name:""});
                if(res.status===200){
                    toast.success("file Uploaded successfully");
                }
                else{
                    toast.error("Error in uploading file");
                }
                handleClose();
            })
        }
    }
  };
  function selectExelFile(e) {
    console.log( e.target.files[0].name.substring(e.target.files[0].name.length-4,e.target.files[0].name.length), e.target.files[0].name.substring(e.target.files[0].name.length-4,e.target.files[0].name.length) =="xlsx");
    if(e.target.files[0].name.substring(e.target.files[0].name.length-4,e.target.files[0].name.length) =="xlsx"){
      
      selectFile(e.target.files[0]);
    }
    else{
      selectFile(null);
      toast.error("File type not supported select excel sheet only");
    }
    // selectFile(e.target.files[0]);
  }
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
          {props.for==="Department" && "Add Department Details"}
          {props.for==="Student" && "Add Student Details"}
          {props.for==="SubAdmin" && "Add SubAdmin Details"}
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
            name="rollNumber"
            label="Roll No"
            value={user.rollNumber}
            fullWidth
            onChange={handleInputChange}
            {...(errors.rollNumber && { error: true, helperText: errors.rollNumber })}
          />
           {props.for==="Student" && <div style={{marginTop: "1.2rem", display:"flex", flexDirection:"column", alignItems: "center"}}>
<p style={{marginBottom: "1.2rem",}}>OR</p>
<label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={(e)=> selectExelFile(e)}
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
          style={{padding:"10px"}}
        >
          {file.name==""? <><AddIcon /> Upload File</>  : file.name}
          
        </Fab>
       
       
       
      </label>
     
           </div> 
           }
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
