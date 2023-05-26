import "./infoBar.css";
import { AiOutlineClose } from "react-icons/ai";
import { HiStatusOnline } from "react-icons/hi";

export function InfoBar({ room }) {
  return (
    <div className="infobar">
      <div className="leftInnerContainer">
        <HiStatusOnline className="text-green-500 mr-2" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <AiOutlineClose className="text-red-500" />
        </a>
      </div>
    </div>
  );
}
