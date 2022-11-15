import React from "react";
import Button from "@material-ui/core/Button";

const FormDialogActivateDeactivateDepartment = props => {

  const handleSubmit = e => {
    
    // code to activate/deactivate department
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit} color="secondary">
        Deactivate
      </Button>
    </div>
  );
};

export default FormDialogActivateDeactivateDepartment;
