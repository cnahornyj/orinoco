checkForm = () => {
    if(formNameValidate() == true && formSurnameValidate() == true && formEmailValidate() == true && formAdresseValidate() == true && formVilleValidate() == true){
        contact = {
            prenom: saisiePrenom,
            nom: saisieNom,
            adresse_electronique: saisieMail,
            adresse: saisieAdresse,
            ville: saisieVille
        }
        return true;
    } else {
        alert('Il manque des informations !');
        return false;
    }
}