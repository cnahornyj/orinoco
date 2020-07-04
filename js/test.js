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

let userBasket = JSON.parse(localStorage.getItem("userBasket"));

let contact;
let products = [];

function getProducts(){
	return new Promise((resolve) => {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
				resolve(JSON.parse(this.responseText));
				console.log("Administration : connection ok");
				// Supprimer le message d'erreur si l'appel est réussi
				error = document.getElementById("error");
				// Supprimer le message d'erreur s'il existe
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
  const produits = await getProducts();
  // Créer la section accueillant la liste des produits
  let listProduct = document.createElement("section");
  listProduct.setAttribute("id", "list-articles");
  // Ajouter la section dans le HTML
  let main = document.getElementById("main");
  main.appendChild(listProduct);
  // Pour chaque produit de l'API créer l'encadré HTML du produit
  produits.forEach((produit) => { 
    // Créer le HTML
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
    // Attribuer les classes
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
    // Hiérarchiser les éléments créés
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
    // Remplir le contenu des balises
    imageArticle.src = produit.imageUrl;
    nomArticle.textContent = produit.name;
    description.textContent = produit.description;
    prix.textContent = produit.price/100 + ",00€";
    lienArticle.textContent = "Découvrir";
  });
};

async function productDetails(){
  // Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
  idProduit = location.search.substring(4);
  const produitSelected = await getProducts();
  console.log("Administration : Vous regardez la page du produit id_"+ produitSelected._id);

  document.getElementById("img_product").setAttribute("src", produitSelected.imageUrl);
  document.getElementById("name_product").innerHTML = produitSelected.name;
  document.getElementById("description_product").innerHTML = produitSelected.description;
  document.getElementById("price_product").innerHTML = produitSelected.price / 100 + ",00€";
  
  produitSelected.varnish.forEach((produit) => {
    let optionProduit = document.createElement("option");
    document.getElementById("option_select").appendChild(optionProduit).innerHTML = produit;
  });
};

function addProduct(){
  // Mettre le produit dans le panier au clic
  let inputBuy = document.getElementById("add_product");
  inputBuy.addEventListener("click", async function() {
    const produits = await getProducts();
  // Récupérer le panier dans le localStorage et ajouter le produit dans le panier avant renvoi dans le localStorage
    userBasket.push(produits);
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    console.log("Administration : le produit a été ajouté au panier");
    // Notifier l'utilisateur de l'ajout au panier
    setTimeout(function() {
      document.getElementById('add_done').textContent = "Vous avez ajouté ce produit à votre panier !";
    },500);
    function add_done_remove(){
      document.getElementById("add_done").textContent="";
    }
    window.setTimeout(add_done_remove, 2000);
  });
};

function addition(){
  // Vérifier si un produit est dans le panier
  if(JSON.parse(localStorage.getItem("userBasket")).length > 0){
    // S'il n'est pas vide supprimer le message et créer le tableau récapitulatif
    document.getElementById("empty_basket").remove();

    // Créer la structure du tableau  
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPaye = document.createElement("td");

    // Placer la structure dans la page et le contenu des entêtes
    let factureSection = document.getElementById("basket-resume");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = "Nom du produit";
    ligneTableau.appendChild(colonnePrixUnitaire);
    colonnePrixUnitaire.textContent = "Prix du produit";

    // Pour chaque produit du panier, créer une ligne avec le nom et le prix
    
    // Init de l'incrémentation de l'id des lignes pour chaque produit
    let i = 0;
    
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit)=>{
      // Créer la ligne
      let ligneProduit = document.createElement("tr");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("i");

      // Attribuer les classes
      ligneProduit.setAttribute("id", "produit"+i);
      removeProduit.setAttribute("id", "remove"+i);
      removeProduit.setAttribute('class', "fas fa-trash-alt removeProduct");
      // Pour chaque produit créer un event sur l'icone de la corbeille pour annuler ce produit
      // bind permet de garder l'incrementation du i qui représente l'index du panier au moment de la création de l'event
      removeProduit.addEventListener('click', removeProduct.bind(i));
      i++;

      // Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      // Remplir le contenu des balises
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

function removeProduct(i){
    console.log(`Administration : Enlever le produit à l'index ${i}`);
    // Recupérer le array
    userBasket.splice(i, 1); 
    console.log(`Administration : ${userBasket}`);
    // Vider le localstorage
    localStorage.clear();
    console.log(`Administration : localStorage vidé`);
    // Mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('userBasket', JSON.stringify(userBasket));
    console.log(`Administration : localStorage mis à jour`);
    // Réactualiser la page avec le nouveau montant du panier/ou panier vide
    window.location.reload();
};

function checkBasket(){
  // Vérifier que le panier contient un/des produit(s)
  let etatPanier = JSON.parse(localStorage.getItem("userBasket"));
  if(etatPanier.length < 1 || etatPanier == null){
    alert("Votre panier est vide !");
    return false;
  }else{
    // Pour chaque produit dans le panier envoyé l'identifiant dans products
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
    products.push(produit._id);
    });
    return true;
  }
};

function checkInput(){
  // Regex
  let checkString = /^[A-Z]{1}[a-z]/;
  let checkMail = /.+@.+\..+/;
  let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

  // Inputs de l'utilisateur
  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formMail = document.getElementById("formMail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;

  // Vérifier les inputs de l'utilisateur
  if(checkString.test(formNom)==false){
    alert("Votre nom doit commencer par une majuscule suivis de minuscules");
    return false;
  } else if(checkString.test(formPrenom)==false) {
    alert("Votre prénom doit commencer par une majuscule suivis de minuscules");
    return false;
  } else if(checkMail.test(formMail)==false){
    alert("Votre email doit être au format xxx@yyy.zzz");
    return false;
  } else if(checkAdresse.test(formAdresse)==false){
    alert(`Votre adresse contient un ou plusieurs des caractères interdits suivants : `+ '[^@&"()!_$*€£`%+=\/;?#]' + " ou n'est pas renseignée." );
    return false;
  } else if(checkString.test(formVille)==false){
    alert("Le nom de votre ville doit commencer par une majuscule suivis de minuscules");
    return false;
  } else {
    return true;
  };
};

function validOrder(){
  let btnForm = document.getElementById("sendPost");
  // Au clic sur le bouton d'envoi vérification de checkBasket() et checkInput()
  btnForm.addEventListener("click", function(event){
    event.preventDefault();
    if(checkBasket() == true && checkInput() == true){
      // Création de l'objet contact contenant les coordonnées de l'utilisateur
      let contact = {
        firstName: document.getElementById("formNom").value,
        lastName: document.getElementById("formPrenom").value,
        address: document.getElementById("formMail").value,
        city: document.getElementById("formAdresse").value,
        email: document.getElementById("formVille").value
      }
      // Création de l'objet à envoyer à l'API
      let objet = {
        contact,
        products
      };
      // Conversion en JSON
      let objetRequest = JSON.stringify(objet);
      // Envoi de l'objet
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/api/furniture/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE){
        console.log(this.responseText);
        // Récupération de la réponse du serveur
        localStorage.setItem('order', this.responseText);
        // Redirection vers la page de confirmation
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
  // Afficher un message de remerciement pour l'utilisateur
  let order = JSON.parse(localStorage.getItem("order"));
  document.getElementById("firstName").innerHTML = order.contact.firstName;
  document.getElementById("lastName").innerHTML = order.contact.lastName;
  // Calculer le montant total de la commande
  let priceOrder = 0;
  let displayPrice = order.products;
  displayPrice.forEach((element) =>{
    priceOrder += element.price / 100;
  });
  document.getElementById("priceOrder").innerHTML = priceOrder;
  document.getElementById("orderId").innerHTML = order.orderId;
  // Réinitialiser le localStorage, products, contact et redirection vers la page d'accueil
  setTimeout(function() {
    localStorage.clear();
    let products = [];
    let contact;
    window.location = "./index.html";
  },7000);
}else{
  // Retirer le message d'ordre de commande si le localStorage ne contient pas l'item order
  let order = document.getElementById("order_result");
  order.remove();
  // Afficher un message d'erreur et rediriger l'utilisateur vers la page d'accueil
  let resultCommand = document.getElementById("confirmation_commande");
  let resultCommandError = document.createElement("div");
  resultCommandError.setAttribute("id","order_result_error");
  let iconError = document.createElement("i");
  iconError.setAttribute("class","fas fa-exclamation-triangle fa-5x");
  iconError.setAttribute("id","error_logo");
  let messageError = document.createElement("p");
  messageError.innerHTML = "Aucune commande passée, vous êtes arrivé(e) ici par erreur !";
  resultCommand.appendChild(resultCommandError);
  resultCommandError.appendChild(iconError);
  resultCommandError.appendChild(messageError);
  setTimeout(function() {
    window.location = "./index.html";
  },4500);
  }
}