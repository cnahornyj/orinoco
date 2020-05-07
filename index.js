// Récupération des données avec AJAX et affichage
/* ajaxGet("http://localhost:3000/api/furniture/", function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    var products = JSON.parse(reponse);
    var listElt = document.getElementById("products");
    // Afficher les meubles et leurs caractéristiques
    products.forEach(function (product) {
        // Création d'articles de class "product"
        var article = document.createElement("article"); // Création d'articles
        article.classList.add("product"); // Add classe "product" aux articles
        listElt.appendChild(article); // Rendre les articles enfants de la section "products"

        // Création des images de class "img_article" dans article dans les articles
        var productImage = document.createElement("IMG");
        productImage.classList.add("img_article");
        productImage.src = product.imageUrl;
        article.appendChild(productImage);

        var divDescription = document.createElement("div"); // Création des éléments div
        divDescription.classList.add("description"); // Add une classe description sur les éléments div
        article.appendChild(divDescription);

        var productName = document.createElement("p");
        divDescription.appendChild(productName);
        productName.classList.add("name");
        productName.textContent = product.name;

        var productDescription = document.createElement("p");
        divDescription.appendChild(productDescription);
        divDescription.classList.add("text_description");
        productDescription.textContent = product.description;

        var divPrice = document.createElement("div"); // Création des éléments div
        divPrice.classList.add("price"); // Add une classe description sur les éléments div
        article.appendChild(divPrice);

        var productPrice = document.createElement("p");
        divPrice.appendChild(productPrice);
        productPrice.textContent = product.price + ",00€";

        var productButton = document.createElement("a");
        divPrice.appendChild(productButton);
        productButton.classList.add("selection");
        productButton.textContent = "Sélectionner";
        productButton.href = "produit.html";
    })
}); */

// Récupération des données avec la méthode GET fetch //
/*
fetch("http://localhost:3000/api/furniture/")
.then((res) => res.json())
.then((data) => {
    let sectionProduits = document.getElementById("produits");
    data.forEach(function(product){

        // Création du HTML
        let bloc = document.createElement("article");
        let imageArticle = document.createElement("img");
        let blocGauche = document.createElement("div");
        let nomArticle = document.createElement("p");
        let description = document.createElement("p");
        let blocDroit = document.createElement("div");
        let prix = document.createElement("p");
        let lienArticle = document.createElement("a");

        // Attribution des classes
        bloc.setAttribute("class","product");
        imageArticle.setAttribute("class", "img_article");
        blocGauche.setAttribute("class", "bloc_gauche"); 
        nomArticle.setAttribute("class","texte_nom");
        description.setAttribute("class","texte_description");
        blocDroit.setAttribute("class","bloc_droit");
        lienArticle.setAttribute("class", "selection");

        // Hiérarchie dans les éléments créés
        sectionProduits.appendChild(bloc);
        bloc.appendChild(imageArticle);
        bloc.appendChild(blocGauche);
        blocGauche.appendChild(nomArticle);
        blocGauche.appendChild(description);
        bloc.appendChild(blocDroit);
        blocDroit.appendChild(prix);
        blocDroit.appendChild(lienArticle);

        // Remplissage du contenu des balises
        imageArticle.src = product.imageUrl;
        nomArticle.textContent = product.name;
        description.textContent = product.description;
        prix.textContent = product.price/100 + ",00€";
        lienArticle.textContent = "Découvrir";
    });
})
.catch(error => console.log("Erreur : " + error))*/

var reqUrl = ('http://localhost:3000/api/furniture/');
var req = new XMLHttpRequest();
req.open('GET', reqUrl);
req.responseType = 'json';
req.send();
req.onload = function() {
    var products = req.response;
    showProducts(products);
  }

function showProducts(products) {
    let sectionProducts = document.getElementById("produits");
    products.forEach(function(product){

        // Création du HTML
        let bloc = document.createElement("article");
        let imageArticle = document.createElement("img");
        let blocGauche = document.createElement("div");
        let nomArticle = document.createElement("p");
        let description = document.createElement("p");
        let blocDroit = document.createElement("div");
        let prix = document.createElement("p");
        let lienArticle = document.createElement("a");

        // Hiérarchie dans les éléments créés
        sectionProducts.appendChild(bloc);
        bloc.appendChild(imageArticle);
        bloc.appendChild(blocGauche);
        blocGauche.appendChild(nomArticle);
        blocGauche.appendChild(description);
        bloc.appendChild(blocDroit);
        blocDroit.appendChild(prix);
        blocDroit.appendChild(lienArticle);

        // Attribution des classes
        bloc.setAttribute("class","product");
        imageArticle.setAttribute("class", "img_article");
        blocGauche.setAttribute("class", "bloc_gauche"); 
        nomArticle.setAttribute("class","texte_nom");
        description.setAttribute("class","texte_description");
        blocDroit.setAttribute("class","bloc_droit");
        lienArticle.setAttribute("class", "selection");

        // Remplissage du contenu des balises
        imageArticle.src = product.imageUrl;
        nomArticle.textContent = product.name;
        description.textContent = product.description;
        prix.textContent = product.price/100 + ",00€";
        lienArticle.textContent = "Découvrir";
        lienArticle.href = "produit.html?" + product._id;
    });
}



