import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import Home from './Components/Home'
import ProductDetails from './Components/Layout/productDetails';
import Login from './Components/Login';
import Register from './Components/Layout/Register';

import { loadUser} from './actions/userActions';
import { useEffect } from 'react';
import store from './store';

function App() {

  /*
  useEffect(() => {
    store.dispatch(loadUser())
  })*/
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path='/' component={Home} exact></Route>
          <Route path='/Search/:keyword' component={Home} ></Route>
          <Route path='/product/:id' component={ProductDetails} exact></Route>
          <Route path='/user/login' component={Login} exact></Route>
          <Route path='/user/register' component={Register} exact></Route>
          
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}


export default App;
