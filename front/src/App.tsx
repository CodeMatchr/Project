import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Authentication from './views/Authentication';

function App() {
  return (
    <>
      <Header/>
      <Authentication />
      <Footer/>
    </>
  );
}

export default App;
