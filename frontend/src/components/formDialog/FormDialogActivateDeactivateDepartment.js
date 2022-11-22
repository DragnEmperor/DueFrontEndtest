import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const FormDialogActivateDeactivateDepartment = props => {

  const handleSubmit = e => {
    // code to activate/deactivate department
    console.log(props.dataUser[1])
    let deptName=props.dataUser[1]
    // axios.post('http://localhost:5000/departments/freeze', {deptName},{withCredentials: true})
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // }).catch(err => {
    //   console.log(err);
    // })
    
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit} color="secondary">
        Freeze
      </Button>
    </div>
  );
};

export default FormDialogActivateDeactivateDepartment;
