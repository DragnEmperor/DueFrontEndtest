import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/user";
import FormDialogAddUser from "../../../components/formDialog/FormDialogAddUser";
import FormDialogEditUser from "../../../components/formDialog/FormDialogEditUser";
import FormDialogDeleteUser from "../../../components/formDialog/FormDialogDeleteUser";
// import FormDialogActivateDeactivateDepartment from "../../../components/formDialog/FormDialogActivateDeactivateDepartment";

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    }
})

const UserTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(100)

    useEffect(() => {
        props.fetchPagination(1, rowsPerPage,'department/list_god')
    }, [])

    // const handleChangePage = async (newPage) => {
    //     await setPage(newPage);
    //     props.fetchPagination(newPage + 1, rowsPerPage,'department/list_god')
    // };

    const handleChangeRowsPerPage = async (rowsPerPage) => {
        await setRowsPerPage(rowsPerPage);
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'department/list_god')
    };

    const handleSearch = async (searchText) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'department/list_god', searchText, searchText)
    };

    const handleFilterChange = async (name, email) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage,'department/list_god', name, email)
    };

    const refresh = async () => {
        // await setPage(0);
        props.fetchPagination(1, rowsPerPage,'department/list_god')
    }
    
    const columns = [
        // {
        //     name: "id",
        //     label: "ID",
        //     options: {
        //         filter: false,
        //         sort: false,
        //     }
        // },
        {
            // left side of first column is too close with the container, give more space on it
            name: "name",
            label: "Name",
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
            name: "superAdmin",
            label: "Super Admin Email",
            options: {
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
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                                <FormDialogAddUser component={Paper}  
                                    create={props.create}
                                    refresh={refresh}
                                    url='department/create'
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
                                url='department/change_super_admin'
                            />
                            {/* code for freeze/unfreeze*/} 
                            {/* <FormDialogActivateDeactivateDepartment
                                dataUser={tableMeta.rowData}
                                // change to activate/deactivate
                                update={props.update}
                            /> */}
                            <FormDialogDeleteUser 
                                dataUser={tableMeta.rowData}
                                delete={props.delete}
                                refresh={refresh}
                                url='department/revoke_super_admin'
                                isGodLevel={true}
                            />
                        </div>
                    );
                }
            }
        }
    ];

    const options = {
        filterType: 'textField',
        responsive: 'vertical',
        selectableRows: false,
        // rowsPerPageOptions: [5, 10, 25],
        serverSide: true,
        viewColumns: false,
        print: false,
        download: false,
        rowsPerPage: 100,
        page: page,

        onTableChange: (action, tableState) => {
            switch (action) {
            //   case 'changePage':
            //     handleChangePage(tableState.page)
            //     break;

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
        <MUIDataTable className={classes.paperTable}
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