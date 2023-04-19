import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Search from './components/Search/Search'
import RecipesList from './components/RecipesList/RecipesList';

function App() {
  return (
    <BrowserRouter>
      <div className='container mt-4'>
        <Header />
        <NavBar />
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/recipes' element={<RecipesList />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
