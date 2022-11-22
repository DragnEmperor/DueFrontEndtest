import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Paper, withStyles } from '@material-ui/core';
import FormDialogSelectButton from "./FormDialogSelectButton";
import axios from "axios";

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    },
    paper: {
        padding: theme.spacing(0),
    },
})
const FormDialogSelectDepartment =({ classes, ...props }) => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    fetchData()
   }, [])
     
   const fetchData=()=>{
    axios.get('http://localhost:5000/superadmin/list_super',{withCredentials:true})
    .then(res=>{
        console.log(res.data)
        let newList=[]
        for(let i=0;i<res.data.list.length;i++){
            res.data.list[i].subAdmins=Object.values(res.data.list[i].subAdmins).map((i)=>i.email)
            newList.push(Object.values(res.data.list[i]))           
        }
        setGetData(newList)
    })
    .catch(err=>{
        console.log(err)
    })
   }

   const handleDept=(value)=>{
    localStorage.setItem('setDueDepartment',JSON.stringify(value))
    props.history.replace('/admin/subadmins')
   }

  const columns = [
    // {
    //     name: "id",
    //     label: "ID",
    //     options: {
    //         display: false,
    //         filter: false,
    //         sort: false,
    //     }
    // },
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
    {
        name: "SubAdmin Emails",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value) => {
                return(<div>
                    {value.map((i,index)=><span key={index} style={{"backgroundColor":"rgba(0, 0, 0, 0.08)","borderRadius":"16px","padding":"0.5rem"}}>
                        {i}
                        </span>)}
                     </div>
                )
              },
        }
    },
    {
        name: "",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                            <FormDialogSelectButton component={Paper} btnText={'Select'}
                                create={props.create} handleDept={()=>handleDept(tableMeta.rowData[0])}
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
      <MUIDataTable 
      title={"Select Department"}
      className={classes.paperTable}
      data={getData}
      options={options}
      columns={columns}/>
    </div>
  );
}


export default (withStyles(styles)(FormDialogSelectDepartment));