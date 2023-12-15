import PropTypes from "prop-types";
function SingleMessage({ message, image, isThisMyMessage = false }) {
  return (
    <div className="chat-message">
      <div className={`flex items-end ${isThisMyMessage ? "justify-end" : "justify-start"}`}>
        <div
          className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
            isThisMyMessage ? "order-1 items-end" : "order-2 items-start"
          }`}>
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                isThisMyMessage
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              }`}>
              {message}
            </span>
          </div>
        </div>
        <img
          src={image}
          alt="My profile"
          className={`w-6 h-6 rounded-full ${isThisMyMessage ? "order-2" : "order-1"}`}
        />
      </div>
    </div>
  );
}

SingleMessage.propTypes = {
  message: PropTypes.string,
  image: PropTypes.string,
  isThisMyMessage: PropTypes.bool,
};
export default SingleMessage;
