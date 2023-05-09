import bk from "../assets/icons/bk.jpeg";
import clement from "../assets/icons/clement.png";
import luk from "../assets/icons/luk.png";
import rems from "../assets/icons/rems.png";
import malo from "../assets/icons/malo.jpeg";
import "./Contact.css";

export function Contact() {
  return (
    <div className="contactBig">
      <div className="contactUser">
        <img className="contactImg" src={malo} />
        <div>
          <div>Malo Le Corvec</div>
          <div>malo.le.corvec@efrei.net</div>
        </div>
      </div>
      <div className="contactUser">
        <img className="contactImg" src={bk} />
        <div>
          <div>Baptiste Keunebroek</div>
          <div>baptiste.keunebroek@efrei.net</div>
        </div>
      </div>

      <div className="contactUser">
        <img className="contactImg" src={clement} />
        <div>
          <div>Clément Le Corre</div>
          <div>clement.le.corre@efrei.net</div>
        </div>
      </div>

      <div className="contactUser">
        <img className="contactImg" src={luk} />
        <div>
          <div>Lucas Le Page</div>
          <div>lucas.le.page@efrei.net</div>
        </div>
      </div>
      <div className="contactUser">
        <img className="contactImg" src={rems} />
        <div>
          <div>Remi Paucton</div>
          <div>remi.paucton@efrei.net</div>
        </div>
      </div>
    </div>
  );
}
