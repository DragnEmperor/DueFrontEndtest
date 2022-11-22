import React from "react";
import Button from "@material-ui/core/Button";

const FormDialogSelectButton = props => {

  return (
    <div>
      <Button variant="contained" onClick={props.handleDept} color="secondary">
        Select
      </Button>
    </div>
  );
};

export default FormDialogSelectButton;
