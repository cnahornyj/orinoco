const url = 'http://localhost:3000/api/furniture/';

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
.catch(error => console.log("Erreur : " + error))

function getProduct(){
    let id = location.search.substring(1); 
    console.log(id);
    fetch(url + id)
    .then(res => res.json())
    .then((data) => {
        // console.log(data);
        let sectionProduit = document.getElementById("main");

        let bloc = document.createElement("section");
        let blocPhoto = document.createElement("div");
        let photo = document.createElement("img");
        let blocDescription = document.createElement("div");
        let nameProduct = document.createElement("h2");
        let descriptionProduct = document.createElement("p");
        let label = document.createElement("label");
        let selectColor = document.createElement("select");
        // let optionValue = document.createElement("option");
        let price = document.createElement("p");

        sectionProduit.appendChild(bloc);
        bloc.appendChild(blocPhoto);
        blocPhoto.appendChild(photo);
        bloc.appendChild(blocDescription);
        blocDescription.appendChild(nameProduct);
        blocDescription.appendChild(descriptionProduct);
        blocDescription.appendChild(label);
        blocDescription.appendChild(selectColor);
        blocDescription.appendChild(price);

        bloc.setAttribute("id","produit");
        blocPhoto.setAttribute("id","photo_product");
        photo.setAttribute("id","img_product");
        blocDescription.setAttribute("id","description");

        photo.src = data.imageUrl;
        nameProduct.textContent = data.name;
        descriptionProduct.textContent = "Description : " + data.description;
        price.textContent = data.price/100 + ",00€";
        label.textContent = "Choisir une couleur ";

        data.varnish.forEach(function(color) {
            console.log(color);
            let options = document.createElement('option');
            selectColor.appendChild(options);
            options.textContent = color;
          }); 
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec fetch: ' + error.message);
    });
}