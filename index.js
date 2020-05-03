// Afficher les données de l'API dans la console

// var req = new XMLHttpRequest();
// La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
// req.open("GET", "http://localhost:3000/api/furniture/");
// Gestion de l'événement indiquant la fin de la requête
//req.addEventListener("load", function () {
    // Affiche la réponse reçue pour la requête
    // console.log(req.responseText);
// });
// req.send(null);

ajaxGet("http://localhost:3000/api/furniture/", function (reponse) {
    // Séparation du texte pour obtenir un tableau contenant les langages
    var products = reponse.split(";");
    var listeElt = document.getElementById("products"); 
    // Ajout de chaque langage dans la liste
    products.forEach(function (product) {
        var productElt = document.createElement("p");
        productElt.textContent = product;
        productElt.setAttribute('class','product')
        listeElt.appendChild(productElt);
    });
});

// COMMENT AVOIR ACCES AUX ELEMENTS DU TABLEAU DE PRODUCTS ?
