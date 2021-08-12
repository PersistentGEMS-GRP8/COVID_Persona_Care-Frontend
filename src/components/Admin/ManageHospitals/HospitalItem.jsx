import React, { Component } from "react";

class HospitalItem extends Component {
  static defaultProps = {
    hospitalData:
        { hId: 1,
        hName: "hName",
        location: "location",
        noOfBeds:0,
        }
  };
  render() {
    const { hospitalData, removeHospital, updateHospital} = this.props;
    return (
      <div > 
        <div  className="col-lg-12 card" key={hospitalData.hId}>

        <table className="table table-striped">
        {/* <thead>
            <tr>
            <th scope="col">HospitalId</th>
            <th scope="col">Hospital Name</th>
            <th scope="col">Location</th>
            <th scope="col">No. of Beds Available</th>
            </tr>
        </thead> */}
        <tbody>
            <tr>

            <th scope="row">{hospitalData.hId}</th>
            <td>{hospitalData.hName}</td>
            <td> {hospitalData.location}</td>
            <td> {hospitalData.noOfBeds}</td>
            <td ><a href={'/updateHospital/'+ hospitalData.hId} className="button" onClick={() => updateHospital(hospitalData)}> Update </a></td>
            <td> <a href={'#'} className="button"  onClick={() => removeHospital(hospitalData)}> Delete </a></td>
            </tr>
         
        </tbody>
        </table>
          <br />
        </div>
      </div>
    );
  }
}

export default HospitalItem;