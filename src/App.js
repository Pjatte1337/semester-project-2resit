// Import React
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import AppProvider from './components/context/AppProvider';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Posts from './pages/AllPost';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';

// Import Styles
import './App.css';

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/posts" element={<Posts />} />
            <Route path="/profile/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<SinglePost />} />
          </Routes>
        </Router>
      </AppProvider>
    );
  }
}

export default App;