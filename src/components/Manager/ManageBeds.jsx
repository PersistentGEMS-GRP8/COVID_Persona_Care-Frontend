import React from 'react';
import * as hospitalService from '../../services/HospitalService';
import ManagerNavbar from '../Manager/ManagerNavbar';


class ManageBeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            hospital: {
            }
        }
    }

    async componentDidMount() {
        const hospital = (await hospitalService.getHospitalById(1)).data;
        this.setState({
            quantity: hospital.noOfBeds,
            hospital: hospital
        });
    }

    updateBeds = () => {
        const noOfBeds = this.state.quantity;
        hospitalService.updateHospitalBeds(1, noOfBeds);
    }
    incrementBeds = () => {
        this.setState({ quantity: this.state.quantity + 1 });
    }
    decreaseBeds = () => {
        this.setState({ quantity: this.state.quantity - 1 });
    }

    render() {
        return (
            <div>
                <ManagerNavbar />
                <br></br>
                <div class="container">
                    <div class="row">
                        <h2 class="pb-4">Manage Available Beds</h2>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <h4>Available Beds :</h4>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class=" btn btn-info" onClick={this.decreaseBeds}>
                                        -1
                                    </button>
                                </span>
                                <input type="text" id="quantity" name="quantity" class="form-control input-number" value={this.state.quantity} min="1" max="100" />
                                <span class="input-group-btn">
                                    <button type="button" class=" btn btn-info" onClick={this.incrementBeds}>
                                        +1
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div className="mt-4 row">
                            <div>
                                <button type="button" className="btn button-custom me-2" onClick={this.updateBeds}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ManageBeds;