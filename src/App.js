import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import CreatePost from "./components/dashboard/posts/CreatePost";
import AppProvider from "./components/context/AppProvider";
import Posts from "./components/dashboard/posts/Posts";


import Page from "./components/Page";

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page/:id" element={<Page />} />
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
