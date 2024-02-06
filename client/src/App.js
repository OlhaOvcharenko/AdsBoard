import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Ad from './components/views/Ad/Ad';
import AddPost from './components/views/Add Post/AddPost';
import EditPost from './components/views/Edit Post/EditPost';
import NotFound from './components/pages/Not Found/NotFound';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import SearchResult from './components/features/SearchResult/SearchResult'
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LogOut from './components/pages/LogOut/LogOut';
import { fetchUserData } from './redux/userRedux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return ( 
    <main>
      <Container>
        <Header   />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/ads/search/:searchPhrase" element={<SearchResult />}/>
          <Route path="/ads/:id" element={<Ad />}/>
          <Route path="/ads/add" element={<AddPost />}/>
          <Route path="/ads/edit/:id" element={<EditPost />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </Container>
  </main>
  )
};

export default App;

