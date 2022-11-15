import React from "react";
import Button from "@material-ui/core/Button";

const FormDialogActivateDeactivateUser = props => {

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

export default FormDialogActivateDeactivateUser;
