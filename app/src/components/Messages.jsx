import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "./Message";

export function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="overflow-auto flex-auto">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name}></Message>
        </div>
      ))}
    </ScrollToBottom>
  );
}
