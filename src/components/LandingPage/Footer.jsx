import React from 'react';
import '../../css/landing.css';

class Footer extends React.Component {
    render() {
        return (
            <div >
            <footer id="footer">             
                    <div className="footer-bottom">                    
                            <div className="row">
                                <div className="col-xs-12 col-sm-12  col-md-12 ">
                                    <div className="copyrights">
                                        <p>Copyright © Persona Care PVT LTD. All rights reserved.</p>
                                        <p className="developed-by">Solution by Persistent Gems</p>
                                    </div>
                                </div>
                            </div>                    
                    </div>             
            </footer>
            </div>
        );
    }
}
export default Footer;