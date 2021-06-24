import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import { clearErrors } from '../../actions/userActions';
import { logout } from '../../actions/userActions';
import { useAlert } from 'react-alert';

//import '../../App.css'
const Header = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, loggedIn, error} = useSelector(state => state.loggedInUser);



    /*const [log, setLog] = useState(false)
    useEffect(()=>{
        loggedIn = log;
        
    },loggedIn)*/
    useEffect(() => {
       
        /*if (!loggedIn) {
            history.push('/user/login')
        }*/

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, loggedIn, error])
    function logOut() {
        dispatch(logout())
    }

    return ( 
       
        <Fragment>
            {loggedIn ? <Fragment>
                <nav className="navbar row">
                    <div className="col-12 col-md-3">
                        <div className="navbar-brand">
                            <img src="/images/logo.png" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({history}) => <Search history={history} />}  /> 
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <Link to="/user/login"><button className="btn" id="login_btn" onClick={logOut}>LogOut</button></Link>

                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </div>
                </nav>

                </Fragment> 
                : (
                <Fragment>
                <nav className="navbar row">
                    <div className="col-12 col-md-3">
                        <div className="navbar-brand">
                            <img src="/images/logo.png" />
                        </div>
                    </div>
                    

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({history}) => <Search history={history} />}  /> 
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <Link to="/user/login"><button className="btn" id="login_btn" >Login</button></Link>
                       
                       


                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </div>
                </nav>

                </Fragment>
            )}
        </Fragment>
            
     );
}
 
export default Header;
