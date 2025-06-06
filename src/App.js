import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route key={'Layout'} path='/' element={<Layout/>}>
   <Route key={'homePage'} path='/' element={<Home/>}>
            </Route>
   </Route>
</Routes>
</BrowserRouter>
  );
}

export default App;
