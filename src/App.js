import React from 'react';
import './assets/style/style.css'
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './pages/home/home';
import Tours from './pages/tours/Tours';
import Directions from './pages/directions/Directions';
import Services from './pages/services/Services';
import Faq from './pages/faq/Faq';
import Contact from './pages/contact/Contact';
import {Routes, Route} from 'react-router-dom';
import ToursDetails from './pages/tours/toursDetails';
import GalleryImgs from './pages/gallery/GalleryImgs';


const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/tours'} element={<Tours/>}/>
      <Route path={'/tours/:slug'} element={<ToursDetails/>}/>
      <Route path={'/directions'} element={<Directions/>}/>
      <Route path={'/services'} element={<Services/>}/>
      <Route path={'/gallery'} element={<GalleryImgs/>}/>
      <Route path={'/faq'} element={<Faq/>}/>
      <Route path={'/contact'} element={<Contact/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App;













