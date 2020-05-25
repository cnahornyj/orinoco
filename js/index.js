const url = 'http://localhost:3000/api/furniture/';

/* Récupération des données de l'API et affichage de la liste des produits sur la page d'accueil OU
message d'erreur */

fetch(url)
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
        bloc.setAttribute("class","produit");
        imageArticle.setAttribute("class", "img_article");
        blocGauche.setAttribute("class", "bloc_gauche"); 
        nomArticle.setAttribute("class","texte_nom");
        description.setAttribute("class","texte_description");
        blocDroit.setAttribute("class","bloc_droit");
        prix.setAttribute("class","price_article");
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
        lienArticle.href = "produit.html?" + product._id;
    });
})
.catch((error) => {
    let sectionError = document.getElementById("error");

    let icon = document.createElement("i");
    let message = document.createElement("p");

    sectionError.appendChild(icon);
    sectionError.appendChild(message);

    icon.setAttribute("id","error_logo");
    icon.setAttribute("class", "fas fa-exclamation-triangle fa-5x");
    message.setAttribute("id","error_message");
    
    message.textContent = "Une erreur est survenue quant à la récupération des données ou la page demandée n'existe pas ! Veuillez réessayer"
})

// Affichage de la page de description d'un produit grâce aux paramètres de l'URL

function getProduct(){
    let id = location.search.substring(1); 
    // console.log(id);
    fetch(url + id)
    .then(res => res.json())
    .then((data) => {
        console.log(`Le produit affiché est ${data.name}.`);
        let sectionProduit = document.getElementById("main");

        // Création du HTML
        let bloc = document.createElement("section");
        let blocPhoto = document.createElement("div");
        let photo = document.createElement("img");
        let blocDescription = document.createElement("div");
        let nameProduct = document.createElement("h2");
        let descriptionProduct = document.createElement("p");
        let label = document.createElement("label");
        let selectColor = document.createElement("select");
        let price = document.createElement("p");
        let addBasket = document.createElement("button");

        // Hiérarchie dans les éléments créés
        sectionProduit.appendChild(bloc);
        bloc.appendChild(blocPhoto);
        blocPhoto.appendChild(photo);
        bloc.appendChild(blocDescription);
        blocDescription.appendChild(nameProduct);
        blocDescription.appendChild(descriptionProduct);
        blocDescription.appendChild(label);
        blocDescription.appendChild(selectColor);
        blocDescription.appendChild(price);
        blocDescription.append(addBasket);

        // Attribution des id et classes
        bloc.setAttribute("id","produit");
        blocPhoto.setAttribute("id","photo_product");
        photo.setAttribute("id","img_product");
        blocDescription.setAttribute("id","description");

        // Remplissage du contenu des balises
        photo.src = data.imageUrl;
        nameProduct.textContent = data.name;
        descriptionProduct.textContent = "Description : " + data.description;
        price.textContent = data.price/100 + ",00€";
        label.textContent = "Choisir une couleur ";
        addBasket.textContent = "Ajouter au panier";
        // addBasket.addEventListener = ("click", addPanier());

        data.varnish.forEach(function(color) {
            // console.log(color);
            let options = document.createElement('option');
            selectColor.appendChild(options);
            options.textContent = color;
          });
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec fetch: ' + error.message);
    });
}

// Initialisation du localStorage
 if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
} else {
	console.log("Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
};

/*
let userPanier = JSON.parse(localStorage.getItem("userPanier"));

let furniture = {
    name: 'Clara',
    price: 3445,
    id: 'baaaed67'
}

console.log(furniture);

let furniture_serialized = JSON.stringify(furniture);

console.log(furniture_serialized);

localStorage.setItem("userPanier", furniture_serialized);
*/

/*
let furnituree = {
    name: 'Alexis',
    price: 3445,
    id: 'baaarx67'
}

console.log(furnituree);

let furnituree_serialized = JSON.stringify(furnituree);

console.log(furnituree_serialized);

localStorage.setItem("userPanier", furniture_serialized);
*/





// Initialiser un localstorage avec un tableau vide
// Au clic sur le bouton "Ajouter au panier" push un objet furniture avec nom et prix dans le tableau
// Persistance des données

