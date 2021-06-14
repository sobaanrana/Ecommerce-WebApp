import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import Home from './Components/Home'
import ProductDetails from './Components/Layout/productDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path='/' component={Home} exact></Route>
          <Route path='/product/:id' component={ProductDetails} exact></Route>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
