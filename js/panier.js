// Contrôle du prénom en fin de saisie
document.getElementById("prenom").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexPrenom = /[A-Z]+[a-z]+/;
    var validitePrenom = "";
    if (!regexPrenom.test(e.target.value)) {
        validitePrenom = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aidePrenom").textContent = validitePrenom;
});

// Contrôle du nom en fin de saisie
document.getElementById("nom").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexNom = /[A-Z]+[a-z]+/;
    var validiteNom = "";
    if (!regexNom.test(e.target.value)) {
        validiteNom = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aideNom").textContent = validiteNom;
});

// Contrôle du courriel en fin de saisie
document.getElementById("email").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexCourriel = /.+@.+\..+/;
    var validiteCourriel = "";
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "Adresse mail invalide";
    }
    document.getElementById("aideEmail").textContent = validiteCourriel;
});

// Contrôle du prénom en fin de saisie
document.getElementById("ville").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexVille = /[A-Z]+[a-z]+/;
    var validiteVille = "";
    if (!regexVille.test(e.target.value)) {
        validiteVille = "D'abord une majuscule puis des minuscules";
    }
    document.getElementById("aideVille").textContent = validiteVille;
});


// Créer une regex globale