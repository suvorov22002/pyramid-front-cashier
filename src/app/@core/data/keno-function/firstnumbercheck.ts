import { verifier } from ".";

export function firstNumber(selection: string, place: '-40.5' | '+40.5', rang: number, placeholder: string) {
    let message;
    let multiplicite = 1;

    if (verifier(selection)) {
        message = {
            "isError": true,
            "message": "Mauvaise saisie"
        }

        return message;
    }


    if (selection.length > rang && selection.toLowerCase().charAt(rang) !== 'n') {
        message = {
            "isError": true,
            "message": "Mauvaise saisie"
        }

        return message;
    }
    else if (selection.toLowerCase().charAt(rang) === 'n') {

        var multiChar = selection.toLowerCase().split("n");

        if (Number.isInteger(parseInt(multiChar[1])) === false || parseInt(multiChar[1]) > 6) {

            message = {
                "isError": true,
                "message": "Multiplicité incorrecte (1 - 6)"
            }

            return message;
        }

        selection = multiChar[0];
        multiplicite = parseInt(multiChar[1]);

    }

    var dataChoice: string;
    var code: string;

    switch (selection) {

        case '1+':
            dataChoice = '1er numero > '.concat(place);
            code = "numI40";
            break;

        case '1-':
            dataChoice = '1er numero < '.concat(place);
            code = "numS40";
            break;
    }

    message = {
        "isError": false,
        "message": "1er numero",
        "data": dataChoice,
        "multiplicite": multiplicite,
        "code": code
    }

    return message;
}
