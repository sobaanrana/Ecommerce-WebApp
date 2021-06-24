import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './Layout/MetaData';

import { useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './Layout/Loader';
import { useAlert } from 'react-alert';

import Pagination from 'react-js-pagination';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const [currentPage, setCurrentPage] = useState(1);
    const {loading, products, error, productsCount, resPerPage} =  useSelector(state => state.products) //getting specific keys of state

    const keyword = match.params.keyword;

    const [price, setPrice] = useState([1,50000]);
    const [ category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const categories = [
                'Laptops',
                'Acessories',
                'Mobiles',
                'Headphones',
                'Cameras',
                'Electronics',
                'Cables',
                'Speakers',
                'Food',
                'Books',
                'Clothes',
                'Shirts',
                'Pants',
                'Shoes',
                'Watches',
                'Sports',
                'Outdoor',
                'Home',
                'Furniture',
                'Chairs',
                'Batteries',    
                'Beauty/Health'
    ]
    
    
    useEffect(()=>{
        if(!loading){
            alert.success("SUCCESS");
        }
        if(error){
            alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating)); //get all the products
    },[dispatch, alert, error, currentPage, keyword, price, category, rating]) //useEffect hook, empty arrow function and empty array, useEffect is basically constructor which is the first thing to run when the component loads

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }
    return ( 
        <Fragment>
            {loading? <Loader/>: (
                <Fragment>
                    <MetaData title={'Products'} />
                    <h1 id="products_heading">Latest Products</h1>

                <section id="products" className="container mt-5">
                    <div className="row">

                        {keyword ? (//if keyowrd exists then display slider
                            <Fragment>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                        <Range
                                        marks={{
                                            1: 'Rs. 1',
                                            50000 : 'Rs. 50000'
                                        }}
                                        min={1}
                                        max={50000}
                                        defaultValue={[1, 50000]} //for dipalying all the products when keyword is searched
                                        tipFormatter={value => `Rs${value}`}
                                        tipProps={{
                                            placement: "top",
                                            visible: true
                                        }}
                                        value={price}
                                        onChange={price => setPrice(price)}

                                        />
                                        <hr className="my-5"/>
                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Categories
                                            </h4>
                                            <ul className="pl-0">
                                            {categories.map(category=> (
                                                <li style={{cursor: 'pointer', listStyleType: 'none'}}
                                                key={category}
                                                onClick={() => setCategory(category)}
                                                >{category}</li>
                                            ))} 

                                            </ul>
                                        </div>

                                        <hr className="my-5"/>
                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Ratings
                                            </h4>
                                            <ul className="pl-0">
                                            {[5,4,3,2,1].map(rating=> (
                                                <li style={{cursor: 'pointer', listStyleType: 'none'}}
                                                key={rating}
                                                onClick={() => setRating(rating)}
                                                >
                                                    <div className="rating-outer">
                                                        <div className="rating-inner"
                                                            style={{
                                                                width : `${rating*20}%`
                                                            }}
                                                            >
                                                        </div>
                                                    </div> 
                                                
                                                </li>
                                            ))} 

                                            </ul>
                                        </div>


                                    </div>
                                </div>

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {products && products.map(product => (
                                            <Product key={product._id} product={product} col={4} />
                                        ))}
                                    </div>
                                </div>

                            </Fragment>

                        ) : (

                            products && products.map(product => (
                                <Product key={product._id} product={product} col={3} />
                            ))

                        )}
                        
                    </div>
                </section>

                    {resPerPage <= productsCount && ( //if resperpage greater than count then no need for pagination 
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                //pageRangeDisplayed={5}
                                onChange={setCurrentPageNo}
                                nextPageText = {'Next'}
                                prevPageText = {'Prev'}
                                firstPageText = {'First'}
                                lastPageText = {'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div> ) } 

                </Fragment>
            )}
        </Fragment>
       
     );
}
 
export default Home;