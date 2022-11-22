import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/user";
import FormDialogAddUser from "../../../components/formDialog/FormDialogAddUser";
import FormDialogEditUser from "../../../components/formDialog/FormDialogEditUser";
import FormDialogDeleteUser from "../../../components/formDialog/FormDialogDeleteUser";
// import FormDialogActivateDeactivateUser from "../../../components/formDialog/FormDialogActivateDeactivateDepartment";
import FormDialogSelectDepartment from "../../../components/formDialog/FormDialogSelectDepartment";

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    },
    paper: {
        padding: theme.spacing(0),
    },
})

const UserTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [selectDept,setSelectDept]=useState(true)
    const [deptName,setDeptName]=useState("")

    useEffect(() => {
        if(deptName!=="" && deptName!==null)
        props.fetchPagination(1,rowsPerPage,'superadmin/list_students/'+deptName)
    }, [deptName])
     
    const handleSelectDept=()=>{
        setSelectDept(false)
    }
    
    const handledeptName=(value)=>{
       setDeptName(value);
       setSelectDept(false)
    }
    const handleChangePage = async (newPage) => {
        await setPage(newPage);
        props.fetchPagination(newPage + 1, rowsPerPage,'superadmin/list_students/')
    };

    const handleChangeRowsPerPage = async (rowsPerPage) => {
        await setRowsPerPage(rowsPerPage);
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'superadmin/list_students/')
    };
// 
    const handleSearch = async (searchText) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'superadmin/list_students/', searchText, searchText)
    };

    const handleFilterChange = async (name, email) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'superadmin/list_students/', name, email)
    };

    const refresh = async () => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'superadmin/list_students/'+deptName)
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
            name: "displayName",
            label: "Student Name",
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
            name: "dueValue",
            label: "Dues",
            options: {
                filter: true,
                sort: false,
            }
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
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} style={{paddingRight: "16px"}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                                <FormDialogAddUser component={Paper}  
                                    create={props.create}
                                    refresh={refresh}
                                    url='superadmin/add_student'
                                />
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                            <FormDialogEditUser
                                dataUser={tableMeta.rowData}
                                update={props.update}
                                refresh={refresh}
                                url='superadmin/change_sub_admin'
                            />
                            {/* <FormDialogActivateDeactivateUser
                                dataUser={tableMeta.rowData}
                                // change to activate/deactivate
                                update={props.update}
                            /> */}
                            <FormDialogDeleteUser 
                                dataUser={tableMeta.rowData}
                                delete={props.delete}
                                refresh={refresh}
                                url='superadmin/revoke_sub_admin'
                                isGodlevel={false}
                            />
                        </div>
                    );
                }
            }
        }
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        selectableRows: false,
        rowsPerPageOptions: [5, 10, 25],
        serverSide: true,
        viewColumns: false,
        print: false,
        download: false,

        rowsPerPage: rowsPerPage,
        count: props.meta.totalDocs || 0,
        page: page,

        onTableChange: (action, tableState) => {
            switch (action) {
              case 'changePage':
                handleChangePage(tableState.page)
                break;

            case 'changeRowsPerPage':
                handleChangeRowsPerPage(tableState.rowsPerPage)
                break;

            case 'search':
                handleSearch(tableState.searchText)
                break;

            case 'filterChange':
                handleFilterChange(tableState.filterList[1], tableState.filterList[2])
                break;
            
            case 'resetFilters':
                handleSearch("")
                break;
                 
              default:
                break;
            }
        },
    };
    
    return (
        (selectDept ? 
            (<Paper className={classes.paper}>
                <FormDialogSelectDepartment handleSelectDept={handleSelectDept} handleDept={handledeptName} delete={props.delete}
                update={props.update} create={props.create}/>
            </Paper>)
        :
        <MUIDataTable className={classes.paperTable}
        data={props.users}
        columns={columns}
        options={options}
    /> )
    );
}

const mapStateToProps = state => ({
    users: state.user.users,
    meta: state.user.metaUser
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    create: actions.create,
    update: actions.update,
    delete: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserTable));