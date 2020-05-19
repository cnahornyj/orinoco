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


// Contrôle du téléphone en fin de saisie
document.getElementById("telephone").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexTelephone = /\b0[1-689]([-. ]?\d{2}){4}\b/;
    var validiteTelephone = "";
    if (!regexTelephone.test(e.target.value)) {
        validiteTelephone = "Non valide";
    }
    document.getElementById("aideTelephone").textContent = validiteTelephone;
});


// Contrôle du code postal en fin de saisie
document.getElementById("codepostal").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexCodepostal = /\b[0-9]{5}\b/;
    var validiteCodepostal = "";
    if (!regexCodepostal.test(e.target.value)) {
        validiteCodepostal = "Non valide";
    }
    document.getElementById("aideCodepostal").textContent = validiteCodepostal;
});

