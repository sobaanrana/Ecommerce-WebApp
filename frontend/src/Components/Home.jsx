import React, { Fragment, useEffect } from 'react';
import MetaData from './Layout/MetaData';

import { useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './Layout/Loader';
import { useAlert } from 'react-alert'

const Home = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    
    const {loading, products, error, productsCount} =  useSelector(state => state.products)
    
    useEffect(()=>{
        if(!loading){
            alert.success("SUCCESS");
        }
        if(error){
            alert.error(error);
        }
        dispatch(getProducts()); //get all the products
    },[dispatch], alert, error) //useEffect hook, empty arrow function and empty array, useEffect is basically constructor which is the first thing to run when the component loads

    return ( 
        <Fragment>
            {loading? <Loader/>: (
                <Fragment>
                    <MetaData title={'Products'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>

                </Fragment>
            )}
        </Fragment>
       
     );
}
 
export default Home;