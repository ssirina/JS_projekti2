// Tähän tulee eventListenerit
document.getElementById("hakuBtn").addEventListener("click", haeFakta);

//funktiot


//haetaan 
function haeFakta() {
    var request = new XMLHttpRequest;
    var url = "https://meowfacts.herokuapp.com/";

    //TEE MYÖS VIRHEILMOITUKSET!!!

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            //console.log(request.responseText);
            parseFakta(request.responseText);
        }
    }
}

//parsitaan, otetaan halutut tiedot
function parseFakta(fakta) {
    var jsonObjekti = JSON.parse(fakta);
    var fakta = jsonObjekti.data[0];
    //console.log(fakta);
    naytaFakta(fakta);
}

//lykätään fakta nätisti esille
//käytä session storagea laskemaan kuinka monta klikkausta on tehty. Jos klikkauksia on alle 1, tehdään vaan uusi node. Jos enemmän, poistetaan ensin yksi node.


function naytaFakta(fakta) {
    //console.log("Tämä fakta näytetään: " + fakta);

    //haetaan oikea paikka
    var paikka = document.getElementById("faktapaikka");
    //jos childnodeja on, poistetaan ne
    paikka.removeChild(paikka.childNodes[0]);

    //tehdään uusi node
    var p = document.createElement("p");
    //tehdään text node
    var fakta = document.createTextNode(fakta);
    // lisätään text node nodeen
    p.appendChild(fakta);
    //laitetaan koko hässäkkä oikealle paikalle dokumenttiin
    document.getElementById("faktapaikka").appendChild(p);

}
