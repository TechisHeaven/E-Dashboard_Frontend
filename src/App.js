import Nav from './components/ui_component/Nav';
import Footer from './components/ui_component/Footer';
import SignUp from './components/pages/SignUp';
import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import PrivateComponent from './components/privateComponent/PrivateComponent';
import Login from './components/pages/Login';
import ProductList from './components/pages/ProductList';
import AddProduct from './components/pages/AddProduct';
import UpdateProduct from './components/pages/UpdateProduct';
import AdminData from './components/pages/AdminData';
import AdminPrivateComponent from './components/privateComponent/AdminPrivateComponent';
import ProfilePage from './components/pages/ProfilePage';
import PageNotFound from './components/pages/404page';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter basename='/'>
      <Nav/>
      <Routes>
      <Route path="*" element={<PageNotFound/>} />
        <Route element={<PrivateComponent />}>
          <Route element={<AdminPrivateComponent/>}><Route path='/users' element={<AdminData/>} /></Route>
        <Route path='/' element={<ProductList/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout'/>
        <Route path='/profile' element={<ProfilePage/>} />
        </Route>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
