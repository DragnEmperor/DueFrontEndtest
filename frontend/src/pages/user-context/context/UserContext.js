import React from "react";
import API from "../../../utils/api"

let UserContext;
const { Provider, Consumer } = (UserContext = React.createContext());

class UserProvider extends React.PureComponent {

    state = {
        users: [],
        meta : {
          totalDocs : 0
        },
        selectedUser: null,
    };

    fetchUsers = async (page, rowsPerPage = 5, name = null, email = null) => {
      API.user().fetchAll(page, rowsPerPage, name, email)
        .then(res => {
          this.setState ({
            users : res.data.users,
            meta : res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (id, onSuccess) => {
      API.user().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedUser : res.data
            })
            onSuccess(this.state.selectedUser)
        })
        .catch(err => console.log(err))
    }
    
    createUser = (data, onSuccess)  => {
      API.user().create(data)
        .then(res =>{
            this.setState ({
              selectedUser : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateUser = (id, data, onSuccess) => {
      API.user().update(id, data)
        .then(res =>{
            this.setState ({
              selectedUser : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteUser = (id, onSuccess) => {
      API.user().delete(id)
        .then(res =>{

          onSuccess()
        })
    }
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              fetchUsers : this.fetchUsers,
              fetchById : this.fetchById,
              createUser : this.createUser,
              updateUser : this.updateUser,
              deleteUser : this.deleteUser
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { UserProvider, Consumer, UserContext };
