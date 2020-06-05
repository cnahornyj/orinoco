// Contrôle du prénom en fin de saisie
document.getElementById("prenom").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexPrenom = /[A-Z]+[a-z]+/;
    var validitePrenom = "";
    if (!regexPrenom.test(e.target.value)) {
        validitePrenom = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aidePrenom").textContent = validitePrenom;
});

// Contrôle du nom en fin de saisie
document.getElementById("nom").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexNom = /[A-Z]+[a-z]+/;
    var validiteNom = "";
    if (!regexNom.test(e.target.value)) {
        validiteNom = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aideNom").textContent = validiteNom;
});

// Contrôle du courriel en fin de saisie
document.getElementById("email").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexCourriel = /.+@.+\..+/;
    var validiteCourriel = "";
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "Adresse mail invalide";
    }
    document.getElementById("aideEmail").textContent = validiteCourriel;
});

// Contrôle du prénom en fin de saisie
document.getElementById("ville").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexVille = /[A-Z]+[a-z]+/;
    var validiteVille = "";
    if (!regexVille.test(e.target.value)) {
        validiteVille = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aideVille").textContent = validiteVille;
});


// Créer une regex globale

// PROBLEME POSSIBLE AVEC checkInput FORT POSSIBLE
validForm = () =>{
    //Ecoute de l'event click du formulaire
    let btnForm = document.getElementById("envoiPost");
    btnForm.addEventListener("click", function(){
      //Lancement des verifications du panier et du form => si Ok envoi
      if(checkPanier() == true && checkForm() == true){
      	console.log("Administration : L'envoi peut etre fait");
      //Création de l'objet à envoyer
      let objet = {
      	contact,
      	products
      };
      console.log("Administration : " + objet);
     //Conversion en JSON
     let objetRequest = JSON.stringify(objet);
     console.log("Administration : " + objetRequest);
     //Envoi de l'objet via la function
     envoiDonnees(objetRequest);

     //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
     contact = {};
     products = [];
     localStorage.clear();
 }else{
 	console.log("Administration : ERROR");
 };
});
};

envoiDonnees = (objetRequest) => {
    return new Promise((resolve)=>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
            {
        //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans la page de confirmation
        sessionStorage.setItem("order", this.responseText);

        //Chargement de la page de confirmation
        document.forms["form-panier"].action = './confirmation.html';
        document.forms["form-panier"].submit();

        resolve(JSON.parse(this.responseText));
    }
};
request.open("POST", APIURL + "order");
request.setRequestHeader("Content-Type", "application/json");
request.send(objetRequest);
});
};

