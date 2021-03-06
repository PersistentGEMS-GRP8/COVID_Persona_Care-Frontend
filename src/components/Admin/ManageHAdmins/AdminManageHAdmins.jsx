
import React, { Component } from "react";
import AdminNavbar from '../AdminNavbar'
import HospitalAdminList from './HospitalAdminList'
import {getHospitalAdminList} from "../../Actions/hospitalAdminAPICalls";
import {deleteHospitalAdmin} from "../../Actions/hospitalAdminAPICalls";
import {updateHospitalAdmin} from "../../Actions/hospitalAdminAPICalls";

class AdminManageHAdmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HospitalAdminList: [],
        };
    }

    componentDidMount() {

        getHospitalAdminList().then(res => {
          if(res!=null){
            let response = res.data;
            let {HospitalAdminList} = this.state;

            response.map((item, i) => {
                HospitalAdminList.push(item)
                return  HospitalAdminList;
            });

            this.setState({
                HospitalAdminList
            });

          }else{
              console.log("RESPONSE NULL")
          }
            
        });
    }

    


    removeHospitalAdmin = item => {
        const {HospitalAdminList} = this.state;
        this.setState({
            HospitalAdminList: HospitalAdminList.filter(i => {
                return i !== item;
            })
        });
        deleteHospitalAdmin(item.id);
    };

    updateHospitalAdmin = item => {
        const {HospitalAdminList} = this.state;
        this.setState({
            HospitalAdminList: HospitalAdminList.filter(i => {
                return i !== item;
            })
        });
        updateHospitalAdmin(item.id);
    };

    render() {

        return (
        <div className="home">
            <AdminNavbar/><br/>
            <div className="row container">
                <p>Admin Dashboard Page - Manage Hospital Admins</p>
            <div>
                <a href={'/addHospitalAdmin'} className="button" style={{float: "right"}}>Register Hospital Admin</a>
            </div>
            <HospitalAdminList  
                items={this.state.HospitalAdminList}
                removeHospitalAdmin={this.removeHospitalAdmin}
                updateHospitalAdmin={this.updateHospitalAdmin} />
            </div>
        </div> );
    }
}
export default AdminManageHAdmins;