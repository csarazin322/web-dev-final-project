import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Search from './components/Search/Search'
import Feed from './components/Feed/Feed';
import MakeRecipe from './components/MakeRecipe/MakeRecipe'
import CurrentUserContext from './redux/currentUserContext';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ImageDetails from './components/ImageDetails/ImageDetails';
import RecipeView from './components/RecipeView/RecipeView';

function App() {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <BrowserRouter>
          <div className='container mt-4'>
            <Header />
            <NavBar />
            <Routes>
              <Route path='/*' element={<Home />} />
              <Route path='/mr/:imageId' element={<MakeRecipe />} />
              <Route path='/feed' element={<Feed />} />
              <Route path='/feed/:recipeId' element={<RecipeView />} />
              <Route path='/search' element={<Search />} />
              <Route path='/search/:term' element={<Search />} />
              <Route path='/details/:imageId' element={<ImageDetails />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/username/:username' element={<Profile />} />
              <Route path='/profile/register' element={<Register />} />
              <Route path='/profile/login' element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserContext>
    </Provider>
  );
}

export default App;
