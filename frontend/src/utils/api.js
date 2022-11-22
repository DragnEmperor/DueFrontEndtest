import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default {
  auth(url = 'auth') {
    return {
        login: ({email, profile}) => {
          if(profile.isGodLevelAdmin)
          return 'God Level Admin';
          if(profile.subAdminRightsOf.length!=0){
            return 'Sub Admin';
          }
          if(profile.superAdminRightsOf.length!=0){
            return 'Super Admin';
       }
        },
        // register: ({email, name, password}) => http.post(url + '/register', {email, name, password}),
        logout: () => http.get(url + '/logout')
    }
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          // fetchPagination: (page, limit, name, category) => 
          //     http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  user(url = 'department') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url , config),
          // fetchPagination: (page, limit = 10, name = null, email = null) => 
          //     http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&email=" + email, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (updatedRecord) => http.post(url, updatedRecord, config),
          delete: id => http.post(url,id, config)
      }
  }

}