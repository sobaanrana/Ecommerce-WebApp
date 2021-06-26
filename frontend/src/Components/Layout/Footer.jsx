import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactUs } from '../../actions/userActions';

const Footer = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')

  const submitHandler = (e) => {
    dispatch(contactUs(email, message))
  }
    return ( 
    
      <Fragment>
        <div className="container-fluid text-white footer">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto aboutus">
              <h2>ABOUT US</h2>
              <p>
                We provide best quality burger with our speacial recipies.All of our chefs are speacially trained from foreign countries.  We never compromise on quality and quantity.
              </p>

            </div>

            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto">
              <h2 className="socialsh2">FOLLOW US</h2>
              <ul className="socials">
                <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa fa-google-plus"></i></a></li>
        
              </ul>
            </div>

          

            <div className="col-lg-4 col-md-4 col-sm-10 col-12 d-block m-auto contactus">
              <h2>CONTACT US</h2>
              <form onSubmit={submitHandler}>
                <div className="email">
                  <p>Email *</p>
                  <input type="email" required  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="msg">
                  <p className="text">Message *</p>
                  <textarea type="text" required value={message} onChange={(e) => setMessage(e.target.value)}/>
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
