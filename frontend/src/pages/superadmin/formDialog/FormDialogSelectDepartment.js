import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import * as actions from "../../../actions/user";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';
import MUIDataTable from "mui-datatables";
import { Paper, withStyles } from '@material-ui/core';
import FormDialogSelectButton from "./FormDialogSelectButton";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    },
    paper: {
        padding: theme.spacing(0),
    },
})
const FormDialogSelectDepartment =({ classes, ...props }) => {
  const [open, setOpen] = useState(false);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/department/list_super',{withCredentials:true})
    .then(res=>{
        console.log(res.data)
        setGetData(res.data.list)
    })
    .catch(err=>{
        console.log(err)
    })
}, [])

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleDept=()=>{
      
  }

  const handleSubmit = (e) => {
      const onSuccess = () => {
          props.refresh()
          props.handleSelectDept()
          setOpen(false);
          toast.success('Department Selected');
      }
      e.preventDefault();

     
  }
  const columns = [
    {
        name: "id",
        label: "ID",
        options: {
            display: false,
            filter: false,
            sort: false,
        }
    },
    {
        // left side of first column is too close with the container, give more space on it
        name: "name",
        label: "Department Name",
        options: {
            filter: true,
            sort: false,
            customHeadRender: (columnMeta, handleToggleColumn) => {
                return (
                    <th key={columnMeta.index} 
                        style={{
                            paddingLeft: "31px", 
                            fontWeight:500, 
                            borderBottom: "1px solid rgba(224, 224, 224, .5)" 
                            }}
                    >
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                            {columnMeta.label}
                        </div>
                    </th>
                );
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <span style={{marginLeft:15}}>
                        {value}
                    </span>
                );
            }
        },
        
    },
    // {
    //     name: "register_date",
    //     label: "Register Date",
    //     options: {
    //         filter: false,
    //         sort: false,
    //     }
    // },
    {
        name: "",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                            <FormDialogSelectButton component={Paper}  
                                create={props.create} handleDept={()=>props.handleDept(tableMeta.rowData[1])}
                            />
                        </div>
                );
            },
    }
   }
];

  const options = {
    filterType: 'textField',
    responsive: 'stacked',
    selectableRows: false,
    rowsPerPageOptions: [5, 10, 25],
    serverSide: true,
    viewColumns: false,
    print: false,
    download: false,

    onTableChange: (action, state) => {
        console.log(action);
        console.dir(state);
      }
    };
  return (
    <div>
      <MUIDataTable className={classes.paperTable}
      data={getData}
      options={options}
      columns={columns}/>
    </div>
  );
}


export default (withStyles(styles)(FormDialogSelectDepartment));