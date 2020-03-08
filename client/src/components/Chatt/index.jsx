import React, { useState, useEffect, useRef, Fragment } from "react";
import io from "socket.io-client";
import _ from "lodash";
import "./Chatt.css";

const socket = io("http://localhost:3002", {
  transports: ["websocket", "polling", "flashsocket"]
});

const Chatt = () => {
  const [userName, setUserName] = useState();
  const [userCount, setUserCount] = useState(0);
  const [userNames, setUserNames] = useState([]);

  socket.on("user name", clients => {
    const clientArray = JSON.parse(clients);
    setUserNames(clientArray);
  });

  socket.on("disconnect", name => {
    setUserNames(userNames.filter(obj => obj.name !== name));
  });

  socket.on("online", count => {
    setUserCount(count);
  });

  const handleUserNameInput = e => {
    setUserName(e.target.value);
  };
  const handleSubmitUserInput = e => {
    if (e.key === "Enter") {
      submitUserInfo();
    }
  };

  const submitUserInfo = () => {
    if (userName && userName.length > 0) {
      socket.emit("user name", userName);
    }
  };

  return (
    <Fragment>
      <header className="main-header">
        <figure className="main-header__logo">
          <img src="https://picsum.photos/200" alt="logo" />
          <figcaption>ChattApp</figcaption>
        </figure>
      </header>
      <main>
        <aside className="sidebar">
          <h1>Connected Clients: {userCount}</h1>
          {_.map(userNames, (obj, index) => {
            return (
              <div key={index} className="user-indicator">
                <div className="user-status" />
                <span>{obj.name}</span>
              </div>
            );
          })}
        </aside>
        <section className="overlay">
          <input
            type="text"
            onChange={handleUserNameInput}
            onKeyPress={handleSubmitUserInput}
          />
          <button onClick={submitUserInfo}>Confirm</button>
        </section>
      </main>
    </Fragment>
  );
};

export default Chatt;
