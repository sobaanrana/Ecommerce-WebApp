import React, { Fragment } from 'react';

const ForgotPassword = () => {
    return ( 
        <Fragment>
            <div class="container-container-fluid">
                <div class="row wrapper">
                        <div class="col-10 col-lg-5">
                            <form class="shadow-lg">
                                <h1 class="mb-3">Forgot Password</h1>
                                <div class="form-group">
                                    <label for="email_field">Enter Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        class="form-control"
                                        value=''
                                    />
                                </div>

                                <button
                                    id="forgot_password_button"
                                    type="submit"
                                    class="btn btn-block py-3">
                                    Send Email
                            </button>

                            </form>
                        </div>
                    </div>
                
            </div>

        </Fragment>
     );
}
 
export default ForgotPassword;