import { verifier } from ".";

export function sumCheck(selection: string, place: '-202,5' | '+202,5' | '-810,5' | '+810,5', rang: number, placeholder: string) {
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

        case '5+':
            dataChoice = 'somme > '.concat(place);
            code = "nums5p";
            break;

        case '5-':
            dataChoice = 'somme < '.concat(place);
            code = "nums5m";
            break;

        case '20+':
            dataChoice = 'somme > '.concat(place);
            code = "nums20p";
            break;

        case '20-':
            dataChoice = 'somme < '.concat(place);
            code = "nums20m";
            break;

    }

    message = {
        "isError": false,
        "message": "somme ".concat(placeholder).concat(' ').concat(place),
        "data": dataChoice,
        "multiplicite": multiplicite,
        "code": code
    }

    return message;
}