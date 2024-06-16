import { verifier, verifierChoice } from ".";

export function numSimple(selection: string) {

    let message;
    let multiplicite = 1;

    var _echar = selection.trim().split('.');

    if (_echar.length < 1 || _echar.length > 10) {

        message = {
            "isError": true,
            "message": "Choix entre 2 et 10"
        }

        return message;
    }

    message = verifierChoice(_echar);

    if (message?.isError) return message;
    
    multiplicite = message?.multiplicite;
    var dataChoice = message?.data; 
    var code = "num".concat(_echar.length.toString())
   
    message = {
        "isError": false,
        "message": _echar.length+' Numeros',
        "data": dataChoice,
        "multiplicite": multiplicite,
        "code": code
    }

    return message;
}