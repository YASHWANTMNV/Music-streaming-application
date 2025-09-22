import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import AddMusic from './Components/AddMusic';
import ViewAllMusic from './Components/ViewAllMusic';
import ViewMusicById from './Components/ViewMusicById';
import UpdateMusic from './Components/UpdateMusic';
import Login from './Components/Login';
import Register from './Components/Register';
import Verify from './Components/Verify';
import UserHome from './Components/UserHome';
import UserViewAllMusic from './Components/UserViewAllMusic';
import UserViewMusicById from './Components/UserViewMusicById';
import FavoritesById from './Components/FavoritesById';
import UserAlbums from './Components/UserAlbums';
import ManageAlbums from './Components/ManageAlbums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Login/>} />
        <Route path="/userregister" element={<Register/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/userHome" element={<UserHome/>} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/userviewallmusic' element={<UserViewAllMusic/>}/>
        <Route path="/usermusic/:id" element={<UserViewMusicById />} />   
        <Route path="/favorites/:userId" element={<FavoritesById />} />
        
        <Route path='/addmusic' element={<AddMusic/>}/>
        <Route path='/viewallmusic' element={<ViewAllMusic/>}/>
        <Route path="/music/:id" element={<ViewMusicById />} />   
        <Route path="/music/update/:id" element={<UpdateMusic />} />  
        <Route path="/useralbums" element={<UserAlbums />} />
        <Route path="/managealbums" element={<ManageAlbums />} />
        </Routes>
    </Router>
  );
}

export default App;
