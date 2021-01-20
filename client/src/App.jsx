import React, { useState, useRef, Fragment } from "react";
import io from "socket.io-client";
import _ from "lodash";
import "./App.css";

const isDevelopment = process.env.NODE_ENV === "development";
const socketPort = isDevelopment ? 3001 : 80;
const socket = io(`http://localhost:${socketPort}`, {
  transports: ["websocket", "polling", "flashsocket"],
});

const App = () => {
  const [userName, setUserName] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [userNames, setUserNames] = useState([]);
  const [userNameConfirmed, setUserNameConfirmed] = useState(false);
  const [passedUserNameLenght, setPassedUserNameLenght] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBox = useRef(null);

  socket.on("chat message", (message) => {
    setMessages([...messages, message]);
    if (chatBox.current) {
      const messageInput = chatBox.current.nextElementSibling;
      const lastMessage = chatBox.current.lastElementChild;
      messageInput.removeAttribute("disabled");
      lastMessage.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  socket.on("user name", (clients) => {
    const clientArray = JSON.parse(clients);
    setUserNames(clientArray);
  });

  socket.on("disconnect", (name) => {
    setUserNames(userNames.filter((obj) => obj.name !== name));
  });

  socket.on("online", (count) => {
    setUserCount(count);
  });

  const handleUserNameInput = (e) => {
    const str = e.target.value;
    setUserName(str);
    if (str.length > 0) {
      setPassedUserNameLenght(true);
    } else {
      setPassedUserNameLenght(false);
    }
  };

  const handleSubmitUserInput = (e) => {
    if (e.key === "Enter") {
      submitUserInfo();
    }
  };

  const submitUserInfo = () => {
    if (userName && userName.length > 0) {
      socket.emit("user name", userName);
      setUserNameConfirmed(true);
    }
  };

  const handleMessageInput = (e) => {
    setMessageInputValue(e.target.value);
  };

  const handleMessage = (e) => {
    if (e.key === "Enter") {
      const currentUser = e.target.dataset.user;
      if (messageInputValue.length > 0) {
        socket.emit("chat message", { currentUser, messageInputValue });
        setMessageInputValue("");
      }
      if (chatBox.current) {
        const messageInput = chatBox.current.nextElementSibling;
        messageInput.setAttribute("disabled", "");
      }
    }
  };

  const renderContent = () => {
    if (userNameConfirmed) {
      return (
        <section className="main-content">
          <div className="chatbox" ref={chatBox}>
            {_.map(messages, (obj, index) => {
              return (
                <p key={index}>
                  {obj.currentUser}: {obj.messageInputValue}
                </p>
              );
            })}
          </div>
          <input
            type="text"
            data-user={userName}
            onKeyPress={handleMessage}
            onChange={handleMessageInput}
            placeholder="Enter a message..."
            value={messageInputValue}
          />
        </section>
      );
    } else {
      return (
        <section className="overlay">
          <label htmlFor="nick-name">Please enter a username:</label>
          <input
            type="text"
            id="nick-name"
            placeholder="Your username..."
            onKeyPress={handleSubmitUserInput}
            onChange={handleUserNameInput}
            value={userName}
          />
          <button
            className={passedUserNameLenght ? "" : "disabled"}
            onClick={submitUserInfo}
          >
            Confirm
          </button>
        </section>
      );
    }
  };

  return (
    <Fragment>
      <header className="main-header">
        <figure className="main-header__logo">
          <img src="https://picsum.photos/100" alt="logo" />
          <figcaption>ChatApp</figcaption>
        </figure>
      </header>
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
      {renderContent()}
    </Fragment>
  );
};

export default App;
