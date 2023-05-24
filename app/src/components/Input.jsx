import "./Input.css";

export function Input({ message, sendMessage }) {
  return (
    <form className="FormMessage">
      <input className="input" placeholder="Envoyer un message..." type="text" ref={message} onKeyDown={(event) => (event.key === "Enter" ? sendMessage(event) : null)} />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        {">"}
      </button>
    </form>
  );
}
