
import React, { Component } from "react";
import AdminNavbar from './AdminNavbar'
import HospitalList from '../Admin/ManageHospitals/HospitalList'
import {getHospitalList} from "../Actions/hospitalAPICalls";
import {deleteHospital} from "../Actions/hospitalAPICalls";
import {updateHospital} from "../Actions/hospitalAPICalls";


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HospitalList: [],
        };
    }

    componentDidMount() {

       getHospitalList().then(res => {
        this.setState({loading:false})
          if(res!=null){
            let response = res.data;
            let {HospitalList} = this.state;
            response.map((item, i) => {
                HospitalList.push(item)

                return  HospitalList;

            });
            this.setState({
                HospitalList
            });
              
          }else{
              console.log("RESPONSE NULL")
          }

            
        });
    }

 
    removeHospital = item => {
        const {HospitalList} = this.state;
        this.setState({
            HospitalList: HospitalList.filter(i => {
                return i !== item;
            })
        });
        console.log("ITEM",item.hId)

        deleteHospital(item.hId);
    };

    updateHospital = item => {

        const {HospitalList} = this.state;
        this.setState({
            HospitalList: HospitalList.filter(i => {
                return i !== item;
            })
        });
        updateHospital(item.hId);
    };

  render() {
    console.log("Render")
    // window.location.reload(false);



    return (

      <div className="home">
       <AdminNavbar/> 
       <br/>
       <div className="row container">
           <p>Admin Dashboard Page - Manage Hospitals</p>
           <div>
               <a href={'/addHospital'} className="button" style={{float: "right"}}> Register Hospital </a>
            </div>
            <HospitalList  
                items={this.state.HospitalList}
                removeHospital={this.removeHospital}
                updateHospital={this.updateHospital}
            />
            </div>
      </div>
    );
  }
}
export default AdminDashboard;