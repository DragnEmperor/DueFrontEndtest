import React,{useContext} from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";


// map with redux
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// user
import User from "../../pages/user";

// Department
import Department from "../../pages/departments";

import SelectDepartment from "../formDialog/FormDialogSelectDepartment";
// Admin
import Subadmin from "../../pages/subadmins";

//SuperAdmin
// import Superadmin from "../../pages/superadmin";
// Duebin
import Duebin from "../../pages/duebin";

// Duelist
import Duelist from "../../pages/duelist";
//Logout
import Logout from "../Logout/Logout";
// user with context
import UserWithContext from "../../pages/user-context";
import AddUserForm from "../../pages/user-context/form/AddUserForm";
import EditUserForm from "../../pages/user-context/form/EditUserForm";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { UserProvider } from "../../pages/user-context/context/UserContext";
import { AuthContext } from "../../context/AuthContext";
function AdminLayout(props) {
  var classes = useStyles();
  // global
  var layoutState = useLayoutState();
  const {logout,getAuthUser} = useContext(AuthContext)
  const authUser=getAuthUser()

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>

                <Route path="/admin/dashboard" component={Dashboard} />
                
                <Route exact path="/admin/map" component={Map} />
                <Route path="/admin/map/add" component={AddForm} />
                <Route path="/admin/map/edit/:id" component={EditForm} />

                <Route exact path="/admin/user/" component={User} />
                <Route exact path="/admin/subadmins/" component={authUser && authUser.superAdminRightsOf.length!=0?Subadmin:Logout} />
                {/* <Route exact path="/admin/superadmin/" component={authUser && (authUser.isGodLevelAdmin || authUser.superAdminRightsOf.length!=0)?Superadmin:Logout} /> */}
                <Route exact path="/admin/departments/" component={authUser && authUser.isGodLevelAdmin?Department:Logout} />
                <Route exact path="/admin/duebin/" component={Duebin} />
                <Route exact path="/admin/duelist/" component={authUser && (authUser.superAdminRightsOf.length!=0 || authUser.subAdminRightsOf.length!=0)?Duelist:Logout} />
                <Route path="/admin/setdepartment/" component={SelectDepartment} />
                <UserProvider>
                  <Route exact path="/admin/usercontext" component={UserWithContext} />
                  <Route path="/admin/usercontext/add" component={AddUserForm} />
                  <Route path="/admin/usercontext/edit/:id" component={EditUserForm} />
                </UserProvider>

              </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
