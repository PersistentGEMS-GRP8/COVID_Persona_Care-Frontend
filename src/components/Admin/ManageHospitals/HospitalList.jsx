import React, { Component } from "react";
import Item from "./HospitalItem";

class HospitalList extends Component {
  
  removeHospital = item => {
    this.props.removeHospital(item);
  };
  
  updateHospital = item => {
    this.props.updateHospital(item);
  };

  render() {
    return (
      <div >
        <h4>Hospital List</h4>
        <div className="col-lg-12">
          <div className="col-lg-8">
        <table className="table table-striped ">
        <thead >
            <tr>
            <th scope="col">HospitalId</th>
            <th scope="col">Hospital Name</th>
            <th scope="col">Location</th>
            <th scope="col">No. of Beds Available</th>
            </tr>
        </thead>
        </table>
        </div>

        {this.props.items.map((record, hId) => {
          return (
            <Item
              hospitalData={record}
              removeHospital={this.removeHospital}
              updateHospital={this.updateHospital}
              key={hId}
            />
          );
        })}
        </div>

        </div>
    );
  }
}

export default HospitalList;