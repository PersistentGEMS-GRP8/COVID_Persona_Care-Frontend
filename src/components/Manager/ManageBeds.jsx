import React from 'react';
import * as hospitalService from '../../services/hospitalService';
import Navbar from '../layout/navbar';

class ManageBeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }

    async componentDidMount() {   
        const hospital = (await hospitalService.getHospitalById(this.props.match.params.id)).data;
        this.setState({quantity: hospital.noOfBeds});   
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
                <Navbar />
                <div class="container">
                    <div class="row">
                        <h2>Manage Available Beds</h2>
                        <div class="col-lg-2">
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
                </div>
            </div>
        )
    }
}
export default ManageBeds;