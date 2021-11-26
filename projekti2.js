// Tähän tulee eventListenerit
document.getElementById("hakuBtn").addEventListener("click", haeKaikki);

//FUNKTIOT

// apiKey 3d1bfe98-e3d7-40ec-b6bb-b9254e328842
//url https://api.thecatapi.com/v1/images/search
// url esimerkistä https://thecatapi.com/v1/images?api_key=ABC123

function haeKaikki() {
    haeKuva();
    haeFakta();
}

function haeKuva() {
    console.log("haeKuva()")
    var request = new XMLHttpRequest;
    var url = "https://api.thecatapi.com/v1/images/search";
    //var apiKey = "3d1bfe98-e3d7-40ec-b6bb-b9254e328842";

    //url += apiKey;

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
            var jsonObjekti = JSON.parse(request.responseText);
            console.log(jsonObjekti);
            var kuva = jsonObjekti[0].url;
            console.log(kuva);
            naytaKuva(kuva);
        }
    }
}

function naytaKuva(kuva) {
    console.log(kuva);
    document.getElementById("image").src = kuva;
}

//haetaan fakta
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