const produitSell = "furniture";
const APIURL = "http://localhost:3000/api/" + produitSell + "/";


let idProduit = "";

if (localStorage.getItem("userBasket")) {
	console.log("Administration : le panier de l'utilisateur existe déjà dans le localStorage");
} else {
	console.log("Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage");
  	// Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userBasket", JSON.stringify(panierInit));
};

// Tableau et objet demandés pour la commande
let contact;
let products = [];

// L'utilisateur a maintenant un panier
let userBasket = JSON.parse(localStorage.getItem("userBasket"));

getProduits = () => {
	return new Promise((resolve) =>{
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

addPanier = () => {
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

addition = () => {
    // Vérifie si un produit est dans le panier
    if(JSON.parse(localStorage.getItem("userBasket")).length > 0){
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
        // bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
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

annulerProduit = (i) => {
    console.log(`Administration : Enlever le produit à l'index ${i}`);
    // Recupérer le array
    userPanier.splice(i, 1); 
    console.log(`Administration : ${userPanier}`);
    // Vider le localstorage
    localStorage.clear();
    console.log(`Administration : localStorage vidé`);
    // Mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log(`Administration : localStorage mis à jour`);
    // Réactualiser la page avec le nouveau montant du panier/ou panier vide
    window.location.reload();
};

checkInput = () => {
    //Controle Regex
    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;
    //Source pour vérification email => emailregex.com
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    //message fin de controle
    let checkMessage = "";

    //Récupération des inputs
    let formNom = document.getElementById("formNom").value;
    let formPrenom = document.getElementById("formPrenom").value;
    let formMail = document.getElementById("formMail").value;
    let formAdresse = document.getElementById("formAdresse").value;
    let formVille = document.getElementById("formVille").value;


    // tests des différents input du formulaire
    // Test du nom => aucun chiffre ou charactère spécial permis
    if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == ""){
      checkMessage = "Vérifier/renseigner votre nom";
    }else{
      console.log("Administration : Nom ok");
    };
    // Test du nom => aucun chiffre ou charactère spécial permis
    if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
      checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre prénom";
    }else{
      console.log("Administration : Prénom ok");
    };
    // Test du mail selon le regex de la source L256
    if(checkMail.test(formMail) == false){
      checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
    }else{
      console.log("Administration : Adresse mail ok");
    };
    // Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
    if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
      checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
    }else{
      console.log("Administration : Adresse ok");
    };
    // Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
    if(checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == ""){
      checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
    }else{
      console.log("Administration : Ville ok")
    };
    // Si un des champs n'est pas bon => message d'alert avec la raison
    if(checkMessage != ""){
      alert("Il est nécessaire de :" + "\n" + checkMessage);
    } else {
      contact = {
        firstName: formNom,
        lastName: formPrenom,
        address: formAdresse,
        city: formVille,
        email: formMail
      };
    return contact;
    };
};

checkPanier = () => {
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("userBasket"));
  //Si le panier est vide ou null (suppression localStorage par)=>alerte
  if(etatPanier == null){
	//Si l'utilisateur à supprimer son localStorage etatPanier sur la page basket.html et qu'il continue le process de commande
	alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger");
	return false
}else if(etatPanier.length < 1 || etatPanier == null){
	console.log("Administration: ERROR => le localStorage ne contient pas de panier")
	alert("Votre panier est vide");
	return false;
}else{
	console.log("Administration : Le panier n'est pas vide")
    //Si le panier n'est pas vide on rempli le products envoyé à l'API
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) =>{
    	products.push(produit._id);
    });
    console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
    return true;
  }
};

envoiDonnees = (objetRequest) => {
  return new Promise((resolve) => { 
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
  if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
  {
    //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html
    sessionStorage.setItem("order", this.responseText);

    //Chargement de la page de confirmation
    document.forms["form-panier"].action = './order-confirm.html';
    document.forms["form-panier"].submit();

    resolve(JSON.parse(this.responseText));
  }
};
request.open("POST", APIURL + "order");
request.setRequestHeader("Content-Type", "application/json");
request.send(objetRequest);
});
};

validForm = () => {
  // Ecoute de l'event click du formulaire
  let btnForm = document.getElementById("envoiPost");
  btnForm.addEventListener("click", function(){
    //Lancement des verifications du panier et du form => si Ok envoi
    if(checkPanier() == true && checkInput() != null){
      console.log("Administration : L'envoi peut etre fait");
    //Création de l'objet à envoyer
    let objet = {
      contact,
      products
    };
    console.log("Administration : " + objet);
   // Conversion en JSON
   let objetRequest = JSON.stringify(objet);
   console.log("Administration : " + objetRequest);
   // Envoi de l'objet via la function
   envoiDonnees(objetRequest);

   // Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
   contact = {};
   products = [];
   localStorage.clear();
  }else{
  console.log("Administration : ERROR");
  };
});
};

resultOrder = () => {
  if(sessionStorage.getItem("order") != null){
    // Parse du session storage
    let order = JSON.parse(sessionStorage.getItem("order"));
    // Implatation de prénom et de id de commande dans le html sur la page de confirmation
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    document.getElementById("orderId").innerHTML = order.orderId; 
    
    // Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem("order");
  } else {
    // Avertissement et redirection vers l'accueil
    alert("Aucune commande passée, vous êtes arrivé ici par erreur");
    window.open("./index.html");
  }
}