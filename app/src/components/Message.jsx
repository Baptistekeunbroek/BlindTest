import "./Message.css";

export function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  if (user === name.trim()) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText">{user}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
}
