import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from "../src/pages/Dashboard"
import Home from '../src/pages/Home';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import AppProvider from './components/context/AppProvider';
import Posts from './pages/AllPost';



class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<SinglePost />} />
          </Routes>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
