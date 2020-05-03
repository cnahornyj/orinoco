/*
Exercice : Remplir la liste avec le contenu du fichier langages.txt
*/

ajaxGet("http://localhost/javascript-web-srv/data/langages.txt", function (reponse) {
    // Séparation du texte pour obtenir un tableau contenant les langages
    var langages = reponse.split(";");
    var listeElt = document.getElementById("langages");
    // Ajout de chaque langage dans la liste
    langages.forEach(function (langage) {
        var langageElt = document.createElement("li");
        langageElt.textContent = langage;
        listeElt.appendChild(langageElt);
    });
});