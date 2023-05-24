import "./Input.css";

export function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="FormMessage">
      <input
        className="input"
        placeholder="Envoyer un message..."
        type="text"
        value={message || ""}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        {">"}
      </button>
    </form>
  );
}
