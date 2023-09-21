import { Navigate, Route, RouterProvider, createRoutesFromElements } from 'react-router';
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RootLayout from './pages/RootLayout';
import { BrowserRouter } from 'react-router-dom';
import Warehouse, { dataLoader } from './pages/Warehouse';
import NotFound from './pages/NotFound';
import WarehouseDetails, { WarehouseDetailsLoader } from './pages/WarehouseDetails';
import AddWarehouse from './pages/AddWarehouse';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<HomeLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/warehouses' element={<Warehouse/>} loader={dataLoader}></Route>
          <Route path='/warehouses/:id' element={<WarehouseDetails/>} loader={WarehouseDetailsLoader}/>
          <Route path='/warehouses/add' element={<AddWarehouse/>} loader={dataLoader}/>
          <Route path='about' element={<About/>}/>
          <Route path='services' element={<Services/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
