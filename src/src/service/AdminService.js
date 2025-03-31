import React, { Component } from 'react';
import axios from "axios";

const EASEAPP_URL = `http://localhost:8081/admin`

class AdminService extends Component {

    authenticateAdmin(admin){
        return axios.post(`${EASEAPP_URL}/authenticate`,admin);

       }
       
}

export default new AdminService();