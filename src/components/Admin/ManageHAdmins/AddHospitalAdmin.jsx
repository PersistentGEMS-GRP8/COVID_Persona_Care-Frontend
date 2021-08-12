import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from '../AdminNavbar';
import {postHospitalAdmin,  createHospitalAdmin} from "../../Actions/hospitalAdminAPICalls";
import {getHospitalList} from "../../Actions/hospitalAPICalls";

class AddHospitalAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:" ",
            email:" ",
            contactNo:" ",
            hId:" ",

            HospitalList:[],

            username:' ',
            password: ' ',
            role:'ROLE_HOSPITALADMIN ',

            errors:[]
        };

      }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });

    };

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
      }

    componentDidMount() {
               
        getHospitalList().then(res => {
            let response = res;
    
              let {HospitalList} = this.state;
              response.map((item, i) => {
                  HospitalList.push(item)
    
                  return  HospitalList;
              });
              console.log("HospitalList:",HospitalList);

              this.setState({
                  HospitalList
              });
            });
    }

    onSubmit = e => {
       
        e.preventDefault();
        const item = {
            name:this.state.name,
            email:this.state.email,
            contactNo:this.state.contactNo,
            hId:this.state.hId
        };

        const personaUser = {
            username:this.state.username,
            password:this.state.password,
            role:this.state.role,
        };

        var errors = [];
        const expression = /\S+@\S+/;
        var validEmail = expression.test(String(this.state.email).toLowerCase());
        if (!validEmail) {
          errors.push("email");
        }
    
        this.setState({
          errors: errors
        });
    
        if (errors.length > 0) {
          return false;

        }else{

            postHospitalAdmin({item});

            //Add username & password to PersonaUser Table
            createHospitalAdmin({personaUser});
            
            console.log("Add Hospital Admin success");
            this.resetForm();

            this.props.history.push('/manageHadmins')
            window.location.reload(false);
        }
    };

    resetForm = () => { 
        //this.formRef.reset();
        this.setState({name: "", email: "", contactNo: ""})
     };

        render() {

        return (
            <div>
                <AdminNavbar/> 
                <form class="needs-validation" novalidate  ref={ref => (this.formRef = ref)} onSubmit={this.onSubmit}>
                    <div className="form-row container" >
                        <div className="form-group col-md-6">
                        <br/>
                            <h2>Register Hospital Admin</h2>
                            <br/>
                            <label for="inputState">Hospital Name:</label>
                            <select 
                                id="hId" 
                                className="form-control"
                                onChange={this.onChange}
                                required 
                                >
                            <option selected disabled>Choose...</option>
                            { this.state.HospitalList.map(value => 
                                <option 
                                 key={value.hId} value={value.hId}
                                >
                                    {value.hName}
                                </option>)
                             }
                            </select>
                            <div class="invalid-feedback">
                                Please choose a hosoital.
                            </div>
                            
                            <label >Hospital Admin Name:</label> 
                            <input 
                                onChange={this.onChange}
                                id="name"
                                type="text" 
                                className="form-control" 
                                placeholder="name"
                                required
                               />
                       
                             <label >Email:</label>
                            <input 
                                onChange={this.onChange}
                                id="email"
                                type="text" 
                                className= {
                                    this.hasError("email")
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                placeholder="email"
                                required/>
                            <div class="invalid-feedback">
                                Please provide a valid email.
                            </div>
                      
                            <label >Contact Number:</label>
                            <input 
                                onChange={this.onChange}
                                id="contactNo"
                                type="text" 
                                className={
                                    this.hasError("email")
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                placeholder="contactNo"
                                required/>
                                <div class="invalid-feedback">
                                ContactNo. should be between 10 to 12 characters
                                </div>

                            <label >Username:</label>
                            <input 
                                onChange={this.onChange}
                                id="username"
                                type="text" 
                                className="form-control" 
                                placeholder="username"
                                required/>

                            <label >Default Password:</label>
                            <input 
                                onChange={this.onChange}
                                id="password"
                                type="text" 
                                className="form-control" 
                                placeholder="password"
                                required/>
                       
                    <br/>
                    <div className="btn-toolbar" role="toolbar">
                       <div className="btn-group mr-2" role="group" aria-label="First group">
                       <button type="submit" className="button" >Submit</button> 

                       </div>
                        <div className="btn-group mr-2" role="group" aria-label="First group">
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

export default AddHospitalAdmin;
