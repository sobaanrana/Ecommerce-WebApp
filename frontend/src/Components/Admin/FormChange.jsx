
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

const FormChange = () => {
        const {loading, loggedIn, error,user} = useSelector(state => state.loggedInUser);

    return ( 
        <Fragment>
            {user.role== 'admin' ? ( <Fragment>
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">Edit Product Details </button>
                    
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Edit Product Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                        <div className="container container-fluid">
                                            <div className="wrapper my-5"> 
                                            <form className="shadow-lg" encType='multipart/form-data'>

                                                <div className="form-group">
                                                <label for="name_field">Name</label>
                                                <input
                                                    type="text"
                                                    id="name_field"
                                                    className="form-control"
                                                    value=""
                                                />
                                                </div>

                                                <div className="form-group">
                                                    <label for="price_field">Price</label>
                                                    <input
                                                    type="text"
                                                    id="price_field"
                                                    className="form-control"
                                                    value=""
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label for="description_field">Description</label>
                                                    <textarea className="form-control" id="description_field" rows="8" ></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <label for="category_field">Category</label>
                                                    <select className="form-control" id="category_field">
                                                        <option>Electronics</option>
                                                        <option>Home</option>
                                                        <option>Others</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="stock_field">Stock</label>
                                                    <input
                                                    type="number"
                                                    id="stock_field"
                                                    className="form-control"
                                                    value=""
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label for="seller_field">Seller Name</label>
                                                    <input
                                                    type="text"
                                                    id="seller_field"
                                                    className="form-control"
                                                    value=""
                                                    />
                                                </div>
                                                
                                                <div className='form-group'>
                                                    <label>Images</label>
                                                    
                                                        <div className='custom-file'>
                                                            <input
                                                                type='file'
                                                                name='product_images'
                                                                className='custom-file-input'
                                                                id='customFile'
                                                                multiple
                                                            />
                                                            <label className='custom-file-label' for='customFile'>
                                                                Choose Images
                                                            </label>
                                                        </div>
                                                </div>

                                    
                                                <button
                                                id="login_button"
                                                type="submit"
                                                class="btn btn-block py-3"
                                                >
                                                CREATE
                                                </button>

                                            </form>
                                        </div>
                                    </div>

                                            


                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    </Fragment>): ( <Fragment>
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">Submit Your Review </button>
                    
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            <ul className="stars" >
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                            </ul>

                                            <textarea name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Fragment>  )}
                </Fragment>
            );
}
 
export default FormChange;