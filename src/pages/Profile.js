import React from "react";
import { getUserName } from "../components/functions";
import Navbar from "../components/Navbar";
import "../style/Profile.css"

const Profile = (props) => {
  const userName = getUserName() ? getUserName() : "";

  return (
    <>
      <Navbar /> {/* Render the navbar component */}
      <div className="center-content">
        {userName ? (
          <h2 className="welcome-heading">Hello {userName}</h2>
        ) : (
          null
        )}
        <p>
          Hi, I'm Pjatte and I'm a software developer. I specialize in both
          frontend and backend development, with a particular focus on web apps.
          My experience includes developing blogs, wikis, and other web
          applications. I love the challenge of creating something new from
          scratch and am always looking for ways to improve my skillset. When I'm
          not coding, you'll find me exploring the world of technology, reading
          books and articles about the latest trends in software development.
        </p>
        <p>
          Hi, I'm Pjatte and I'm a software developer. I specialize in both
          frontend and backend development, with a particular focus on web apps.
          My experience includes developing blogs, wikis, and other web
          applications. I love the challenge of creating something new from
          scratch and am always looking for ways to improve my skillset. When I'm
          not coding, you'll find me exploring the world of technology, reading
          books and articles about the latest trends in software development.
        </p>
      </div>
    </>
  );
};

export default Profile;
