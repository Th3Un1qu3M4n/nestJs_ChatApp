import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// import "./ChatRoom.css";
// import useChat from "../useChat";

const ChatRoom = (props) => {
//   const { roomId } = props.match.params; // Gets roomId from URL
//   const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
//   const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  

//   const handleSendMessage = () => {
//     sendMessage(newMessage);
//     setNewMessage("");
//   };

    const socket = io('localhost:8000')
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState('')
    const [name, setName] = useState('')
    const [joined, setJoined] = useState(false)
    const [typingString, setTypingString] = useState('')


    useEffect(()=>{
      
      socket.on('message', (message) => {
        // console.log("Total Messages", messages)
        setMessages([...messages, message])
      })

      socket.on('typing', ({name, isTyping}) => {
        if(isTyping){
          setTypingString(`${name} is typing ...`)
        }else{
          setTypingString('')
        }
      })
    })

    useEffect(()=>{
      
    },[joined])

    const joinChat = () => {
      socket.emit('join', {name: name}, () => {
        console.log("joining chat room")
        setJoined(true)
        setName(name)
        socket.emit('findAllMessages', {}, (response) =>{
          setMessages(response)
        })
      })
    }


    const sendMessage = () => {
      socket.emit('createMessage', {name: name, text: messageText}, ()=>{
        setMessageText('')
      } )
    }

    let timeout;

    const emitTyping = () => {
      socket.emit('typing', {isTyping: true})
      timeout = setTimeout(()=>{
        socket.emit('typing', {isTyping: false})
      }, 2000)
    }
    const handleMessageTextChange = (event) => {
      setMessageText(event.target.value);
      emitTyping()
    };

  return (
    <>{ !joined ?
    <div className="not-joined">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-input-field"
      />
      <button onClick={joinChat}>Join Chat</button>
      

    </div>
    :
    <div className="chat-room-container">
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((msg, i) => (
            <li
              key={i}
              className="message-item">
                [{msg.name}]: {msg.text}
            </li>
          ))}
        </div>
      </div>
      {/* <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>*/}
      {typingString!=='' &&
      <div className="someone-typing"> {typingString}</div>
      }
      <textarea
        value={messageText}
        onChange={handleMessageTextChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={()=>sendMessage()} className="send-message-button">
        Send
      </button> 
    </div>
    }
    </>
  );
};

export default ChatRoom;