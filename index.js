ajaxGet("http://localhost:3000/api/furniture/", function (reponse) {
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

        var productButton = document.createElement("button");
        divPrice.appendChild(productButton);
        productButton.textContent = "Sélectionner";
    })
});