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

achat = () => {
  JSON.parse(localStorage.getItem("userBasket")).forEach((produit) =>{
    products.push(produit._id);
  });
  console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
  let name = document.getElementById("name").value;
  let firstname = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
};