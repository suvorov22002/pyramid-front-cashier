import { verifier } from ".";

export function numberParity(selection: string, rang: number, placeholder: string) {
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

        case '188':
            dataChoice = 'premier pair';
            code = "num1p";
            break;

        case '189':
            dataChoice = 'dernier pair';
            code = "num20p";
            break;

        case '198':
            dataChoice = 'premier impair';
            code = "num1ip";
            break;

        case '199':
            dataChoice = 'dernier impair';
            code = "num20ip";
            break;

    }

    message = {
        "isError": false,
        "message": placeholder,
        "data": dataChoice,
        "multiplicite": multiplicite,
        "code": code
    }

    return message;
}