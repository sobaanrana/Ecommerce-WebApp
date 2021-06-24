import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/userActions';
import { login } from '../actions/userActions';
import Loader from '../Components/Layout/Loader'

const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, loggedIn, error, user} = useSelector(state => state.loggedInUser);

    useEffect(() => {
        if(loggedIn) { //if user already logged in then dont allow to go to login page again
            history.push('/')
            alert.show(user._id)
        }
        else if (!loggedIn) {
            history.push('/user/login')
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, loggedIn, error, history])

    const submitHandler = (e) => {
        dispatch(login(email, password))
    }

    return ( 
        <Fragment>
        {loading ? <Loader /> : (
        <Fragment>
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value= {email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        LOGIN
                        </button>

                        <Link to="/user/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
        
        )}
    </Fragment>
        
     );
}
 
export default Login;