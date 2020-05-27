const produitSell = "furniture";
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

let idProduit = "";

if (localStorage.getItem("userPanier")) {
	console.log("Administration : le panier de l'utilisateur existe déjà dans le localStorage");
} else {
	console.log("Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
};

//Tableau et objet demandés pour la commande
let contact;
let products = [];

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem("userPanier"));

getProduits = () => {
	return new Promise((resolve) => {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Administration : connection ok");
                console.log(this.responseText);
                let sectionError = document.getElementById("error");
                sectionError.remove();
			} else {
				let sectionError = document.getElementById("error");

                let icon = document.createElement("i");
                let message = document.createElement("p");

                sectionError.appendChild(icon);
                sectionError.appendChild(message);

                icon.setAttribute("id","error_logo");
                icon.setAttribute("class", "fas fa-exclamation-triangle fa-5x");
                message.setAttribute("id","error_message");
                
                message.textContent = "Une erreur est survenue quant à la récupération des données ou la page demandée n'existe pas ! Veuillez réessayer";
                console.log("Problème avec l'API");
			}
		}
		request.open("GET", APIURL + idProduit);
		request.send();
	});
};

async function allProductsList(){
    const produits = await getProduits();

    //Création de la section accueillant la liste des produits
    let listProduct = document.createElement("section");
    listProduct.setAttribute("id", "list-articles");
    //Ajout de la section dans le HTML
    let main = document.getElementById("main");
    main.appendChild(listProduct);

    //Pour chaque produit de l'API on créé l'encadré HTML du produit
    produits.forEach((produit) =>
    { 
        // Création du HTML
        let bloc = document.createElement("article");
        let blocPhoto = document.createElement("div");
        let imageArticle = document.createElement("img");
        let blocDescription = document.createElement("div");
        let blocGauche = document.createElement("div");
        let nomArticle = document.createElement("p");
        let description = document.createElement("p");
        let blocDroit = document.createElement("div");
        let prix = document.createElement("p");
        let lienArticle = document.createElement("a");
        // Attribution des classes
        bloc.setAttribute("class","article");
        blocPhoto.setAttribute("class","bloc_photo");
        imageArticle.setAttribute("class", "img_article");
        blocDescription.setAttribute("class","bloc_description");
        blocGauche.setAttribute("class", "bloc_gauche"); 
        nomArticle.setAttribute("class","name_article");
        description.setAttribute("class","description_article");
        blocDroit.setAttribute("class","bloc_droit");
        prix.setAttribute("class","price_article");
        lienArticle.setAttribute("class", "selection_article");
        lienArticle.setAttribute("href", "produit.html?" + produit._id);
        // Hiérarchie dans les éléments créés
        listProduct.appendChild(bloc);
        bloc.appendChild(blocPhoto);
        blocPhoto.appendChild(imageArticle);
        bloc.appendChild(blocDescription);
        blocDescription.appendChild(blocGauche);
        blocGauche.appendChild(nomArticle);
        blocGauche.appendChild(description);
        blocDescription.appendChild(blocDroit);
        blocDroit.appendChild(prix);
        blocDroit.appendChild(lienArticle);
        // Remplissage du contenu des balises
        imageArticle.src = produit.imageUrl;
        nomArticle.textContent = produit.name;
        description.textContent = produit.description;
        prix.textContent = produit.price/100 + ",00€";
        lienArticle.textContent = "Découvrir";
  });
};

async function detailProduit(){
        //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
        idProduit = location.search.substring(1);
        const produitSelected = await getProduits();
        console.log("Administration : Vous regardez la page du produit id_"+ produitSelected._id);

        let sectionProduit = document.getElementById("main");

        document.getElementById("img_product").setAttribute("src", produitSelected.imageUrl);
        document.getElementById("name_product").innerHTML = produitSelected.name;
        document.getElementById("description_product").innerHTML = produitSelected.description;
        document.getElementById("price_product").innerHTML = produitSelected.price / 100 + ",00€";
    
        produitSelected.varnish.forEach((produit) => {
            let optionProduit = document.createElement("option");
            document.getElementById("option_select").appendChild(optionProduit).innerHTML = produit;
    });
};

addPanier = () => {
        //Au clic de l'user pour mettre le produit dans le panier
        let inputBuy = document.getElementById("add_product");
        inputBuy.addEventListener("click", async function() {
            const produits = await getProduits();
        //Récupération du panier dans le localStorage et ajout du produit dans le panier avant renvoi dans le localStorage
        userPanier.push(produits);
        localStorage.setItem("userPanier", JSON.stringify(userPanier));
        console.log("Administration : le produit a été ajouté au panier");
        alert("Vous avez ajouté ce produit dans votre panier")
    });
};


addition = () => {
    //Vérifie si un prduit est dans le panier
    if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
      // S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
      document.getElementById("empty_basket").remove();

      //Création de la structure principale du tableau  
      let facture = document.createElement("table");
      let ligneTableau = document.createElement("tr");
      let colonneNom = document.createElement("th");
      let colonnePrixUnitaire = document.createElement("th");
      let colonneRemove = document.createElement("th");
      let ligneTotal = document.createElement("tr");
      let colonneRefTotal = document.createElement("th");
      let colonnePrixPaye = document.createElement("td");

      //Placement de la structure dans la page et du contenu des entetes
      let factureSection = document.getElementById("basket-resume");
      factureSection.appendChild(facture);
      facture.appendChild(ligneTableau);
      ligneTableau.appendChild(colonneNom);
      colonneNom.textContent = "Nom du produit";
      ligneTableau.appendChild(colonnePrixUnitaire);
      colonnePrixUnitaire.textContent = "Prix du produit";

      //Pour chaque produit du panier, on créé une ligne avec le nom et le prix
      
      //Init de l'incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      
      JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
        //Création de la ligne
        let ligneProduit = document.createElement("tr");
        let nomProduit = document.createElement("td");
        let prixUnitProduit = document.createElement("td");
        let removeProduit = document.createElement("i");

        //Attribution des class pour le css
        ligneProduit.setAttribute("id", "produit"+i);
        removeProduit.setAttribute("id", "remove"+i);
        removeProduit.setAttribute('class', "fas fa-trash-alt annulerProduit");
        //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
        //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
        //annulerProduit L233
        removeProduit.addEventListener('click', annulerProduit.bind(i));
        i++;

        //Insertion dans le HTML
        facture.appendChild(ligneProduit);
        ligneProduit.appendChild(nomProduit);
        ligneProduit.appendChild(prixUnitProduit);
        ligneProduit.appendChild(removeProduit);

        //Contenu des lignes
        nomProduit.innerHTML = produit.name;
        prixUnitProduit.textContent = produit.price / 100 + " €";
    });

      //Dernière ligne du tableau : Total
      facture.appendChild(ligneTotal);
      ligneTotal.appendChild(colonneRefTotal);
      colonneRefTotal.textContent = "Total à payer";
      ligneTotal.appendChild(colonnePrixPaye);
      colonnePrixPaye.setAttribute("id", "total_sum");

      //Calcule de l'addition total
      let totalPaye = 0;
      JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
      	totalPaye += produit.price / 100;
      });

      //Affichage du prix total à payer dans l'addition
      console.log(`Total à payer : ${totalPaye}€`);
      document.getElementById("total_sum").textContent = `${totalPaye},00€`;
  };
}

annulerProduit = (i) => {
    console.log("Administration : Enlever le produit à l'index " + i);
    //recupérer le array
    userPanier.splice(i, 1); 
    console.log("Administration : " + userPanier);
    //vide le localstorage
    localStorage.clear();
    console.log("Administration : localStorage vidé");
    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log("Administration : localStorage mis à jour");
    //relancer la création de l'addition
    window.location.reload();
};