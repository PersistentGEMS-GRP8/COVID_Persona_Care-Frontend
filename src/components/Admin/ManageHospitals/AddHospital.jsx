import React, {Component} from "react";
import {postHospital} from "../../Actions/hospitalAPICalls";
import AdminNavbar from '../AdminNavbar';

class AddHospital extends Component {
    constructor(props) {
        super(props);
        this.state={
            hName:" ",
            location:" ",
            noOfBeds:" ",
        };

      }
    onChange = event => {
        console.log("onCHANGE");
        this.setState({ [event.target.id]: event.target.value });

    };

    onSubmit = e => {
        e.preventDefault();
        const item = {
            hName:this.state.hName,
            location:this.state.location,
            noOfBeds:this.state.noOfBeds };
            console.log(item);

            postHospital({item});
            
            console.log("Add Hospital success");
            this.resetForm();

            this.props.history.push('/adminDashboard')
            window.location.reload(false);

            };
            

    resetForm = () => { 
        console.log("Cancel");
        //this.formRef.reset();
        this.setState({hName: "", location: "", noOfBeds: ""})

     };
        
        render() {

        return (
            <div>
                <AdminNavbar/> 

                <form ref={ref => (this.formRef = ref)} onSubmit={this.onSubmit}>
                    <div className="form-row container ">
                        <div className="form-group col-md-6">
                        <br/>
                            <h2>Register Hospital</h2>
                            <br/>
                            <label >Hospital Name:</label> 
                            <input 
                                onChange={this.onChange}
                                value={this.state.hName}
                                id="hName"
                                type="text" 
                                className="form-control" 
                                placeholder="name"/>
                      
                             <label >Location:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.location}
                                id="location"
                                type="text" 
                                className="form-control" 
                                placeholder="location"/>
                      
                            <label >No. of Beds:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.noOfBeds}
                                id="noOfBeds"
                                type="text" 
                                className="form-control" 
                                placeholder="no.of beds"/>
                       
                    <br/>
                    <div className="btn-toolbar" role="toolbar">
                       <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="submit" className="button" >Submit</button> 
                        </div>
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button onClick={this.resetForm} type="reset" className="button" >Cancel</button> 
                        </div>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddHospital;