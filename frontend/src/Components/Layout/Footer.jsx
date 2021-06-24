import React, { Fragment } from 'react';

const Footer = () => {
    return ( 
    
      <Fragment>
        <div className="container-fluid text-white footer">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto">
              <h2>ABOUT US</h2>
              <p>
                We provide best quality burger with our speacial recipies.All of our chefs are speacially trained from foreign countries.  We never compromise on quality and quantity.
              </p>

              <ul className="socials">
                <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-google-plus"></i></a></li>
        
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto text-center address">
              <h2>ADDRESS</h2>
              <pre className="text-white"><i className="fa fa-map-marker"></i> : Shop # 01 ,Lahore</pre>
              <pre className="text-white"><i className="fa fa-phone"></i> : 0077889966</pre>
              <pre className="text-white"><i className="fa fa-envelope"></i> : restaurant@gmail.com</pre>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto contactus">
              <h2>CONTACT US</h2>
              <form action="#">
                <div className="email">
                  <p>Email *</p>
                  <input type="email" required />
                </div>
                <div className="msg">
                  <p className="text">Message *</p>
                  <input type="email" required />
                </div>
                <button type="submit" className="btn btn-default btn-md submitbutton">Send</button>
              </form>
            </div>

              <footer className="py-1">
            <p classNameName="text-center mt-1">
              Shopping Cart - 2019-2020, All Rights Reserved
            </p>
            </footer>
            
          </div>

        

        </div>
   
        
      
         
      </Fragment>
    );
}
 
export default Footer;
