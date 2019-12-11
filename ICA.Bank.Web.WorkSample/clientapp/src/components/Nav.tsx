import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/nav.module.scss";

const Nav: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <ul className={styles.navLinks}>
          <Link to="/">
            <li className={styles.firstLink}>Blog</li>
          </Link>
          <Link to="/posts">
            <li>Posts</li>
          </Link>
          <Link to="/create">
            <li>Create</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
