import React, { Component } from "react";

class HospitalAdminItem extends Component {
  static defaultProps = {
    hospitalAdminData:
        { id: 1,
        name: "name",
        email: "email",
        contactNo:0,
        }
  };
  render() {
    const { hospitalAdminData, removeHospitalAdmin, updateHospitalAdmin} = this.props;
    return (
      <div>
        <div className="col-lg-12 card" key={hospitalAdminData.id}>

        <table className="table table-striped">
        {/* <thead>
            <tr>
            <th scope="col">HospitalAdminId</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact Number</th>
            </tr>
        </thead> */}
        <tbody>
            <tr>
            <th scope="row">{hospitalAdminData.id}</th>
            <td>{hospitalAdminData.name}</td>
            <td> {hospitalAdminData.email}</td>
            <td> {hospitalAdminData.contactNo}</td>
            <td ><a href={'/updateHospitalAdmin/'+ hospitalAdminData.id} className="button" onClick={() => updateHospitalAdmin(hospitalAdminData)}> Update </a></td>
            <td> <a href={'#'} className="button"  onClick={() => removeHospitalAdmin(hospitalAdminData)}> Delete </a></td>
            </tr>
        </tbody>
        </table>
          <br />
        </div>
      </div>
    );
  }
}

export default HospitalAdminItem;