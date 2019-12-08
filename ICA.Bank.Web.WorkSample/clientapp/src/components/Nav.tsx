import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/nav.module.scss";

const Nav: React.FC = () => {
  return (
    <ul className={styles.navLinks}>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/posts">
        <li>Post</li>
      </Link>
    </ul>
  );
};

export default Nav;
