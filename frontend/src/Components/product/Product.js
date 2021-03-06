import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = ({ product, col }) => {
    
    return (
            <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        //src="https://m.media-amazon.com/images/I/813oF-FY01L._AC_UY218_.jpg"
                        src={product.images[0].url} //[0] as there are multiple images
                    />
                    <div className="card-body d-flex flex-column">

                        <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                        </h5>

                        <div className="ratings mt-auto"> 
                            <div className="rating-outer">
                                <div className="rating-inner" style={{width: `${(product.rating / 5)*100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                        </div>

                        <p className="card-text">Rs. {product.price}</p>
                    
                        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>



     );
}
 
export default Product;
