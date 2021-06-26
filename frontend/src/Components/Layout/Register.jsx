import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

const Register = ({ history }) => {

    /*
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })*/

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    ///const { name, email, password } = user;

    const [dp, setDp] = useState('')
    const [dpPreview, setDpPreview] = useState('/images/dp.png')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loggedIn, error, loading } = useSelector(state => state.loggedInUser);

    useEffect(() => {

        if (loggedIn) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, loggedIn, error, history])

    const submitHandler = (e) => {
        //e.preventDefault();
        /*
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('dp', dp);

        dispatch(register(formData))*/
        dispatch(register(name,email,password));
    }

    /*
    const onChange = e => {
        if (e.target.name === 'dp') { //setting profile picture

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) { //three states: 0;reader is create 1;it is in processing, 2; everything is done
                    setDpPreview(reader.result)
                    setDp(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }*/

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)   }                         />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Display Picture</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={dpPreview}
                                            className='rounded-circle'
                                            alt='Picture Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='dp'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        //onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Picture
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register