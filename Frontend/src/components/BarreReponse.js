/*import React, { useState } from "react";
import { stringSimilarity } from "string-similarity-js";


export function BarreReponse({ YTurl }) {
    //console.log(YTurl)
    const reponseAttendue = YTurl.title;
    const [reponse, setReponse] = useState('');
    const [similarite, setSimilarite] = useState(0);
    


    function testSimilarite() {
        console.log(stringSimilarity(reponseAttendue, reponse))
        return stringSimilarity(reponseAttendue, reponse);
    }
    function clickPress(event) {
        
        if (event.key === 'Enter') {
            setSimilarite(testSimilarite())
        }
    }

    if (YTurl === '') {
        return (<div></div>)
    }
    else {
        return (
            <div>
                <input
                    className="inputJeu"
                    placeholder="Tenter une réponse..."
                    type="text"
                    value={message}
                    onKeyPress={(e) => clickPress(e)}
                    onChange={(event => setReponse(event.target.value))}

                />
                <button className="sendButtonJeu" onClick={testSimilarite}>Essayer</button>
                <p>Similarité : {similarite}</p>
            </div>
        )
    }

}
*/