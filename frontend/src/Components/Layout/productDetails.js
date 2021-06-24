
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getProductsDetails, clearErrors, getProductDetails} from '../../actions/productActions';
import Loader from './Loader';
import MetaData from './MetaData'
import {useAlert} from 'react-alert';
import { Carousel} from 'react-bootstrap';
import FormChange from '../Admin/FormChange';

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [count, setCount] = useState(1);

    const {loading, product, error} =  useSelector(state => state.productDetails) //laoding these constants from productDetails


    useEffect(()=>{

        dispatch(getProductDetails(match.params.id))

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    const incCount = () => {
        if(product.stock==0) {
            alert.error("Out Of Stock!")
        }
        if(count >= product.stock) return;
        if(product.stock>1) {
            return setCount(count+1)
        }
        
    }

    
    const decCount = () => {
        if(count>0)
            return setCount(count-1)

        if(count <= 1) return;
        
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                <MetaData title={product.name} />
                <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel pause='hover'>
                        {product.images && product.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <img className="d-block w-100" src={image.url} alt={product.title} />
                            </Carousel.Item>
                            ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr/>
                    <div className="ratings mt-auto"> 
                            <div className="rating-outer">
                                <div className="rating-inner" style={{width: `${(product.rating / 5)*100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>

                    <hr/>

                    <p id="product_price">Rs. {product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decCount}>-</span>

                        <input type="number" className="form-control count d-inline" value={ product.stock>0 ? count : 0} readOnly />

                        <span className="btn btn-primary plus"  onClick={incCount}>+</span>
                    </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                    <hr/>

                    <p>Status: <span id="stock_status" className={product.stock>0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr/>

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr/>
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                    
                    <FormChange />
                </div>
            </div>
        </Fragment>
        )} 
    </Fragment>

        );
}
 
export default ProductDetails;