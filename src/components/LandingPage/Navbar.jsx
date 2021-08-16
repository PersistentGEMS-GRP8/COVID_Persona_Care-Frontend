import React from 'react';
import '../../css/landing.css';
import {withRouter} from 'react-router-dom';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hospital: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,

        });
    }

    
    handleSearch(hospital){
        this.props.history.push(`/search/${hospital}`);
    }

    render() {
        const {hospital}=this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src={'assets/images/logo.jpg'} class="img-fluid" style={{"width":"55px","height":"55px"}}/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarSupportedContent">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#cards">Services</a>
                            </li>
                            <li className="nav-item">
                                <form className="d-flex">
                                    <input type="text" name="hospital"  value={this.state.hospital} onChange={this.handleChange} placeholder="Search Hospital" className="form-control" /> &nbsp;
                                    <button type="button" className="btn btn-default" onClick={ () => this.handleSearch(hospital)}><i className="fa fa-search" aria-hidden="true"></i></button>
                                </form>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login" aria-current="true">Log In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default withRouter(Navbar);