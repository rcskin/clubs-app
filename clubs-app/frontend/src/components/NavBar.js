import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Pupil Dashboard</Link>
        </li>
        <li>
          <Link to="/joined-clubs">Joined Clubs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

// Sources:
// https://www.youtube.com/watch?v=SLfhMt5OUPI
// https://reactrouter.com/web/guides/quick-start
