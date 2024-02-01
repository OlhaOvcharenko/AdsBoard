import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Post from './components/views/Post/Post';
import AddPost from './components/views/Add Post/AddPost';
import EditPost from './components/views/Edit Post/EditPost';
import NotFound from './components/pages/Not Found/NotFound';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

const App = () => (
  <main>
      <Container >
        <Header   />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/post/:postId" element={<Post />}/>
          <Route path="/post/add" element={<AddPost />}/>
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </Container>
    </main>
);

export default App;

