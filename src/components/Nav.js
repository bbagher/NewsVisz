import React from "react";

export default function Nav(props) {
  const { route, setRoute } = props;

  return (
    <header>
      <nav>
        <div className="header-container">
          <span>
            <a className="logo" onClick={() => setRoute(false)}>
              NEWSVISZ
            </a>
          </span>
          <ul>
            <li>
              <div className={!route ? "current-route" : ""}>
                <a onClick={() => setRoute(false)}>News</a>
              </div>
            </li>
            <li>
              <div className={route ? "current-route" : ""}>
                <a onClick={() => setRoute(true)}>Visz</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
