import { verifier, verifierChoice } from ".";

export function numOutCheck(selection: string) {
    
    let message;
    let multiplicite = 1;

    if(verifier(selection)){
        message = {
            "isError": true,
            "message": "Mauvaise saisie"
        }

        return message;
    }

    var _echar = selection.trim().substring(1).split('-');

    // Verification du nombre de numeros saisi pour le pari
    if (_echar.length < 1 || _echar.length > 10) {

        message = {
            "isError": true,
            "message": "Choix entre 1 et 10"
        }

        return message;
    }
    
    message = verifierChoice(_echar);

    if (message?.isError) return message;

    multiplicite = message?.multiplicite;
    var dataChoice = message?.data; 

     message = {
         "isError": false,
         "message": "Hors tirage",
         "data": dataChoice,
         "multiplicite": multiplicite,
         "code": "numOut"
     }

     return message;
}
