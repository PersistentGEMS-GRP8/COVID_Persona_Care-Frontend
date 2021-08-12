import React from 'react';
import Navbar from '../layout/navbar';

class ManageBeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 10
        }
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
                        <h2>Simple Quantity increment buttons with Javascript </h2>


                        <div class="col-lg-2">
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class=" btn btn-danger" onClick={this.decreaseBeds}>
                                        -1
                                    </button>
                                </span>
                                <input type="text" id="quantity" name="quantity" class="form-control input-number" value={this.state.quantity} min="1" max="100" />
                                <span class="input-group-btn">
                                    <button type="button" class=" btn btn-success" onClick={this.incrementBeds}>
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