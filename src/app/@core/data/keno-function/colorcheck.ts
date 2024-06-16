import { verifier } from ".";

export function colorChoice(selection: string, place: '1er' | '20e') {

    let message;
    let multiplicite = 1;

    if(verifier(selection)){
        message = {
            "isError": true,
            "message": "Mauvaise saisie"
        }

        return message;
    }

    var _echar = selection.trim().substring(1);

    if (_echar.length < 1 || _echar === undefined) {

        message = {
            "isError": true,
            "message": "Mauvaise saisie"
        }

        return message;
    }

    if (isNaN(+_echar) === true) {

        var multiChar = _echar.toLowerCase().split("n");
        
        if (multiChar.length < 2) {
            message = {
                "isError": true,
                "message": "Mauvaise saisie"
            }

            return message;
        }

        if (Number.isInteger(parseInt(multiChar[0])) === false) {

            message = {
                "isError": true,
                "message": "Mauvaise saisie"
            }

            return message;
        }

        if (Number.isInteger(parseInt(multiChar[1])) === false) {

            message = {
                "isError": true,
                "message": "Multiplicité incorrecte (1 - 6)"
            }

            return message;
        }

        if (parseInt(multiChar[0]) < 1 || parseInt(multiChar[0]) > 4) {

            message = {
                "isError": true,
                "message": "Saisi incorrecte (1 - 4)"
            }

            return message;
        }

        if (parseInt(multiChar[1]) > 6) {

            message = {
                "isError": true,
                "message": "Multiplicité incorrecte (1 - 6)"
            }

            return message;
        }

        _echar = multiChar[0];
        multiplicite = parseInt(multiChar[1]);

    }
    else {

        if (parseInt(_echar) < 1 || parseInt(_echar) > 4) {

            message = {
                "isError": true,
                "message": "Saisi incorrecte (1 - 4)"
            }

            return message;
        }

    }

    var numColor = parseInt(_echar);
    var dataChoice: string;
    var code: string;

    switch(numColor) {

        case 1: //Couleur verte between 1 and 20
            dataChoice = place.concat(' couleur verte');
            code = place === '1er' ? "num1cv" : "num20cv";
            break;
        
        case 2: //Couleur verte between 21 and 40
            dataChoice = place.concat(' couleur bleu');
            code = place === '1er' ? "num1cb" : "num20cb";
            break;
        
        case 3: //Couleur verte between 41 and 60
            dataChoice = place.concat(' couleur rouge');
            code = place === '1er' ? "num1cr" : "num20cr";
            break;

        case 4: //Couleur verte between 61 and 80
            dataChoice = place.concat(' couleur orange');
            code = place === '1er' ? "num1co" : "num20co";
            break;
            
    }

    message = {
        "isError": false,
        "message": "Couleur ".concat(place).concat(' boule'),
        "data": dataChoice,
        "multiplicite": multiplicite,
        "code": code
    }

    return message;

}