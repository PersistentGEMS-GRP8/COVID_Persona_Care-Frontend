import React, { Component } from "react";
import Item from "./HospitalAdminItem";

class HospitalAdminList extends Component {
  
  removeHospitalAdmin = item => {
    this.props.removeHospitalAdmin(item);
  };
  
  updateHospitalAdmin = item => {
    this.props.updateHospitalAdmin(item);
  };

  render() {
    return (
      <div>
        <h4>HospitalAdmins List</h4>
        <div className="col-lg-12">
          <div className="col-lg-9">
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">E-mail Address</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Hospital Name</th>
                </tr>
            </thead>
            <tbody></tbody>
            </table>
          </div>

        {this.props.items.map((record, id) => {
          return (
            
            <Item
              hospitalAdminData={record}
              removeHospitalAdmin={this.removeHospitalAdmin}
              updateHospitalAdmin={this.updateHospitalAdmin}
              key={id}
            />
          );
        })}
        </div>
      </div>
    );
  }
}

export default HospitalAdminList;