import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { SingleMessage } from "./Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAPIUrl } from "../../conf/conf";
function Messages(props) {
  const { user: target_user } = props;
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [newSocket, setNewSocket] = useState(null);
  // const messageList = [
  //   {
  //     id: 1,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message: "Can be verified on any platform using docker",
  //   },
  //   {
  //     id: 2,
  //     user: {
  //       id: user.id,
  //       name: "Jhon Doe",
  //       image: user.profile.profile_picture,
  //     },
  //     message:
  //       "Your error message says permission denied, npm global installs must be given root privileges.",
  //   },
  //   {
  //     id: 3,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message: "Command was run with root privileges. I`'`m sure about that.",
  //   },
  //   {
  //     id: 4,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message: "I`'`ve update the description so it`'`s more obviously now",
  //   },
  //   {
  //     id: 5,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message: "FYI https://askubuntu.com/a/700266/510172",
  //   },
  //   {
  //     id: 6,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message:
  //       "Check the line above (it ends with a # so, I`'`m running it as root ) # npm install -g @vue/devtools",
  //   },
  //   {
  //     id: 7,
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       image: user.profile.profile_picture,
  //     },
  //     message:
  //       "Any updates on this issue? I`'`m getting the same error when trying to install devtools. Thanks",
  //   },
  //   {
  //     id: 8,
  //     user: {
  //       id: 1,
  //       name: "Jhon Doe",
  //       image:
  //         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     message: "Thanks for your message David. I thought I`'`m alone with this issue.",
  //   },
  // ];
  const handleMessageSend = () => {
    if (messageInput.trim() !== "") {
      const message = {
        id: new Date().toISOString(),
        user: {
          id: user.id,
          name: user.username,
          image: user.profile.profile_picture,
        },
        message: messageInput,
      };
      newSocket.send(JSON.stringify(message));
      setMessageInput("");
    }
  };

  useEffect(() => {
    let loc = window.location;
    let wsStart = loc.protocol === "https:" ? "wss://" : "ws://";
    let endpoint = getAPIUrl("chatSocket").replace(loc.protocol, wsStart);

    const socket = new WebSocket(
      endpoint + "?token=" + user.access + "&receiver_user_id=" + target_user.id
    );

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    setNewSocket(socket);

    return () => {
      socket.close();
      setNewSocket(null);
    };
  }, [target_user.id, user.access]);
  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src={target_user.profile.profile_picture}
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{target_user.username}</span>
            </div>
            <span className="text-lg text-gray-600">{target_user.profile.bio}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <FontAwesomeIcon icon={faVideo} />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messages?.map((message) => (
          <SingleMessage
            key={message.id}
            message={message?.message}
            image={message?.user.image}
            isThisMyMessage={message?.user.id === user.id}
          />
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={handleMessageSend}>
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Messages.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Messages;
