import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [name, setName] = React.useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/chatRoom`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default Home;