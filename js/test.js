const produitSell = "furniture";
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

let idProduit = "";

if(localStorage.getItem("userBasket")) {
	console.log("Administration : le panier de l'utilisateur existe déjà dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage");
  let panierInit = [];
  localStorage.setItem("userBasket", JSON.stringify(panierInit));
};

let contact;
let products = [];

let userBasket = JSON.parse(localStorage.getItem("userBasket"));

function getProduits(){
	return new Promise((resolve) => {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Administration : connection ok");

				//L'appel est réussi => suppression des message d'erreur
				error = document.getElementById("error");
				//On supprime le message d'erreur s'il existe
				if(error){
					error.remove();
				}
			}else{
				console.log("Administration : ERROR connection API");
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
        lienArticle.setAttribute("href", "produit.html?id=" + produit._id);
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
        idProduit = location.search.substring(4);
        const produitSelected = await getProduits();
        console.log("Administration : Vous regardez la page du produit id_"+ produitSelected._id);

        // A COMMENTER
        document.getElementById("img_product").setAttribute("src", produitSelected.imageUrl);
        document.getElementById("name_product").innerHTML = produitSelected.name;
        document.getElementById("description_product").innerHTML = produitSelected.description;
        document.getElementById("price_product").innerHTML = produitSelected.price / 100 + ",00€";
    
        // A COMMENTER
        produitSelected.varnish.forEach((produit) => {
            let optionProduit = document.createElement("option");
            document.getElementById("option_select").appendChild(optionProduit).innerHTML = produit;
    });
};

function addPanier(){
        // Au clic de l'user pour mettre le produit dans le panier
        let inputBuy = document.getElementById("add_product");
        inputBuy.addEventListener("click", async function() {
            const produits = await getProduits();
        // Récupération du panier dans le localStorage et ajout du produit dans le panier avant renvoi dans le localStorage
        userBasket.push(produits);
        localStorage.setItem("userBasket", JSON.stringify(userBasket));
        console.log("Administration : le produit a été ajouté au panier");
        setTimeout(function() {
            document.getElementById('add_done').textContent = "Vous avez ajouté ce produit à votre panier !";
        },500);
        function add_done_remove(){
            document.getElementById("add_done").textContent="";
        }
        window.setTimeout(add_done_remove, 4000);
        // console.log(produits);
    });
};

function addition(){
    // Vérifie si un produit est dans le panier
    if(JSON.parse(localStorage.getItem("userBasket")).length > 0){
      // S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
      document.getElementById("empty_basket").remove();

      //Création de la structure principale du tableau  
      let facture = document.createElement("table");
      let ligneTableau = document.createElement("tr");
      let colonneNom = document.createElement("th");
      let colonnePrixUnitaire = document.createElement("th");
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

      // Pour chaque produit du panier, on créé une ligne avec le nom et le prix
      
      // init de l'incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      
      JSON.parse(localStorage.getItem("userBasket")).forEach((produit)=>{
        //Création de la ligne
        let ligneProduit = document.createElement("tr");
        let nomProduit = document.createElement("td");
        let prixUnitProduit = document.createElement("td");
        let removeProduit = document.createElement("i");

        // Attribution des class pour le css
        ligneProduit.setAttribute("id", "produit"+i);
        removeProduit.setAttribute("id", "remove"+i);
        removeProduit.setAttribute('class', "fas fa-trash-alt annulerProduit");
        // Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
        // bind permet de garder l'incrementation du i qui représente l'index du panier au moment de la création de l'event
        // annulerProduit L233
        removeProduit.addEventListener('click', annulerProduit.bind(i));
        i++;

        // Insertion dans le HTML
        facture.appendChild(ligneProduit);
        ligneProduit.appendChild(nomProduit);
        ligneProduit.appendChild(prixUnitProduit);
        ligneProduit.appendChild(removeProduit);

        // Contenu des lignes
        nomProduit.innerHTML = produit.name;
        prixUnitProduit.textContent = produit.price / 100 + " €";
    });

      // Dernière ligne du tableau : Total
      facture.appendChild(ligneTotal);
      ligneTotal.appendChild(colonneRefTotal);
      colonneRefTotal.textContent = "Total à payer";
      ligneTotal.appendChild(colonnePrixPaye);
      colonnePrixPaye.setAttribute("id", "total_sum");

      // Calcul du montant total
      let totalPaye = 0;
      JSON.parse(localStorage.getItem("userBasket")).forEach((produit)=>{
      	totalPaye += produit.price / 100;
      });

      // Affichage du prix total à payer
      console.log(`Total à payer : ${totalPaye}€`);
      document.getElementById("total_sum").textContent = `${totalPaye},00€`;
  };
}

function annulerProduit(i){
    console.log(`Administration : Enlever le produit à l'index ${i}`);
    // Recupérer le array
    userBasket.splice(i, 1); 
    console.log(`Administration : ${userBasket}`);
    // Vider le localstorage
    localStorage.clear();
    console.log(`Administration : localStorage vidé`);
    // Mettre à jour le localStorage avec le nouveau Basket
    localStorage.setItem('userBasket', JSON.stringify(userBasket));
    console.log(`Administration : localStorage mis à jour`);
    // Réactualiser la page avec le nouveau montant du panier/ou panier vide
    window.location.reload();
};

function checkInput(){

  let checkString = /^[A-Z]{1}[a-z]/;
  let checkMail = /.+@.+\..+/;
  let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formMail = document.getElementById("formMail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;

  if(checkString.test(formNom)==false){
    alert("error with your name");
    return false;
  } else if(checkString.test(formPrenom)==false) {
    alert("error with your firstname");
    return false;
  } else if(checkMail.test(formMail)==false){
    alert("error with your mail");
    return false;
  } else if(checkAdresse.test(formAdresse)==false){
    alert("error with your address");
    return false;
  } else if(checkString.test(formVille)==false){
    alert("error with your city");
    return false;
  } else {
    return true;
  };
};

function checkPanier(){
  let etatPanier = JSON.parse(localStorage.getItem("userBasket"));
  if(etatPanier == null){
    alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger");
    return false;
  }else{
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
    products.push(produit._id);
    });
    return true;
  }
};

function validForm(){
  let btnForm = document.getElementById("envoiPost");
  btnForm.addEventListener("click", function(event){
    event.preventDefault();
    if(checkPanier() == true && checkInput() == true){
      let contact = {
        firstName: document.getElementById("formNom").value,
        lastName: document.getElementById("formPrenom").value,
        address: document.getElementById("formMail").value,
        city: document.getElementById("formAdresse").value,
        email: document.getElementById("formVille").value
      }
      let objet = {
        contact,
        products
      };
      let objetRequest = JSON.stringify(objet);
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/api/furniture/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE){
        console.log(this.responseText);
        localStorage.setItem('order', this.responseText);
        window.location.href = "confirmation.html";
        }
      }
      request.send(objetRequest);
    }else{
      console.log("Administration : ERROR");
    };
  });
};

function resultOrder(){
if(localStorage.getItem("order") != null){
  let order = JSON.parse(localStorage.getItem("order"));
  document.getElementById("firstName").innerHTML = order.contact.firstName;
  document.getElementById("lastName").innerHTML = order.contact.lastName;
  let priceOrder = 0;
  let displayPrice = order.products;
  displayPrice.forEach((element) =>{
    priceOrder += element.price / 100;
  });
  document.getElementById("priceOrder").innerHTML = priceOrder;
  document.getElementById("orderId").innerHTML = order.orderId;
  setTimeout(function() {
    localStorage.removeItem("order");
    localStorage.clear();
    let products = [];
    let contact;
    window.location = "./index.html";
  },7000);
}else{
  //alert("Aucune commande passée, vous êtes arrivé ici par erreur");
  let order = document.getElementById("order_result");
  let error = createElement("i");
  error.setAttribute("class","fas fa-exclamation-triangle fa-5x");
  order.appendChild(error);
  // error message
  // setTimeOut after 3 seconds redirection to index.html
  window.open("./index.html");
  }
}