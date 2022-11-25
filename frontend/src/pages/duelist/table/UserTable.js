import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/user";
import FormDialogAddUser from "../../../components/formDialog/FormAddStudent";
import FormDialogEditUser from "../../../components/formDialog/FormDialogEditStudent";
import FormDialogDeleteUser from "../../../components/formDialog/FormDialogDeleteUser";
import FormDialogSelectButton from "../../../components/formDialog/FormDialogSelectButton";

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    }
})

const UserTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [deptName,setDeptName]=useState("")

    useEffect(() => {
        if(deptName!=="" && deptName!==null){
            console.log("Called API");
            props.fetchPagination(1,rowsPerPage,'due/show_students/'+ deptName)
        }
    }, [deptName])

    useEffect(() => {
        const getName=JSON.parse(localStorage.getItem('setDueDepartment'))
        if(!getName)
        props.history.push('/admin/setdepartment/')
        setDeptName(getName)
    }, [])

    const handleChangePage = async (newPage) => {
        await setPage(newPage);
        // props.fetchPagination(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (rowsPerPage) => {
        await setRowsPerPage(rowsPerPage);
        await setPage(0);
        // props.fetchPagination(1, rowsPerPage)
    };

    const handleSearch = async (searchText) => {
        await setPage(0);
        // props.fetchPagination(1, rowsPerPage, searchText, searchText)
    };

    const handleFilterChange = async (name, email) => {
        await setPage(0);
        // props.fetchPagination(1, rowsPerPage, name, email)
    };

    const refresh =  () => {
        setPage(0);
        props.fetchPagination(1,rowsPerPage,'due/show_students/'+ deptName);
    }
    
    const columns = [
        {
            name: "Roll Number",
            label: "Roll Number",
            options: {
                display: true,
                filter: false,
                sort: false,
            }
        },
        // {
           
        //     name: "name",
        //     label: "Student Name",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customHeadRender: (columnMeta, handleToggleColumn) => {
        //             return (
        //                 <th key={columnMeta.index} 
        //                     style={{
        //                         paddingLeft: "31px", 
        //                         fontWeight:500, 
        //                         borderBottom: "1px solid rgba(224, 224, 224, .5)" 
        //                         }}
        //                 >
        //                     <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
        //                         {columnMeta.label}
        //                     </div>
        //                 </th>
        //             );
        //         },
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <span style={{marginLeft:15}}>
        //                     {value}
        //                 </span>
        //             );
        //         }
        //     },
            
        // },
        {
            name: "Amount",
            label: "Due Amount",
            options: {
                display: true,
                filter: true,
                sort: false,
            }
        },
        {
            name: "",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} style={{paddingRight: "16px"}}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}>
                                <FormDialogAddUser component={Paper}
                                    create={props.create}
                                    refresh={refresh}
                                    url='due/add_single_student'
                                    for="Student"
                                />
                                <div>
                                    <FormDialogSelectButton btnText='Change Department' handleDept={() => props.history.push('/admin/setdepartment/')} />
                                </div>
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
                                url='due/set_due_amount'
                                refresh={refresh}
                            />
                            <FormDialogDeleteUser 
                                dataUser={tableMeta.rowData}
                                delete={props.delete}
                                refresh={refresh}
                                isGodLevel={false}
                                url='students/delete'
                            />
                        </div>
                    );
                }
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
        <MUIDataTable 
        title={"Department : "+deptName}
        className={classes.paperTable}
        data={props.users}
        columns={columns}
        options={options}
        />
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