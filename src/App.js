import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Store from './pages/Store';
import SignUp from './pages/SignUp';
import Details from './pages/Details';
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/details/:id' element={<Details/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;