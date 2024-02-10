import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
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
import CreateAd from './components/views/CreateAd/CreateAd';
import EditAd from './components/views/EditAd/EditAd';
import { loadAdsRequest } from './redux/adsRedux';
import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import Ad from './components/pages/Ad/Ad';

const App = () => {

  const dispatch = useDispatch();

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the necessary data for your application
    Promise.all([dispatch(fetchUserData()), dispatch(loadAdsRequest())])
      .then(() => {
        // Data has been fetched, so you can stop loading
        setTimeout(() => {
          setLoading(false); 
        }, 1000); 
  
      })
  }, [dispatch]);

  return ( 
    <main>
      <Container>
        <Header />
        {loading ? (
          <Button variant="tuned-light">
            <Spinner animation="border" variant="primary" size="lg" />
            Loading ...
          </Button>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ads/search/:searchPhrase" element={<SearchResult />} />
            <Route path="/ads" element={<CreateAd />} /> 
            <Route path="/ads/:id" element={<Ad />} />
            <Route path="/ads/edit/:id" element={<EditAd />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        <Footer />
      </Container>
    </main>
  );
};

export default App;

