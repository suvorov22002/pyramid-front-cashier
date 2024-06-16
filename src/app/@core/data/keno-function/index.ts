export function verifier(echar) {
    let __echar = [];
    let v = false;
    __echar = echar.split(".");

    if (__echar.length > 1) v = true;

    return v;

}

export function verifierChoice(_echar: string[]) {

    let message = {};
    let multiplicite = 1;

    if(isNaN(+_echar[0]) === true || _echar[0] === '' || _echar[0] === undefined) {
        message = {
            "isError": true,
            "message": "1ère saisie non valide"
        }

        return message;
    }

    for (let j = 0; j < _echar.length; j++) {

        if (isNaN(+_echar[j]) === true || _echar[j] === '' || _echar[j] === undefined) {
            
            if(_echar[j] === '' || _echar[j] === undefined) {
                
                message = {
                    "isError": true,
                    "message": "Mauvaise saisie"
                }
        
                return message;
            }
            //check possible multiple round
            if (j === (_echar.length - 1)) {

                var multiChar = _echar[j].toLowerCase().split("n");

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

                if (parseInt(multiChar[0]) < 1 || parseInt(multiChar[0]) > 80) {

                    message = {
                        "isError": true,
                        "message": "Saisi incorrecte (1 - 80)"
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

                _echar.pop();
                _echar.push(multiChar[0]);
                multiplicite = parseInt(multiChar[1]);
                

            }
            else {
                message = {
                    "isError": true,
                    "message": "Mauvaise saisie"
                }

                return message;
            }
        }
        else {
            // Check if the given number is between 1 and 80 (Keno's rules)
            if (parseInt(_echar[j]) < 1 || parseInt(_echar[j]) > 80) {

                message = {
                    "isError": true,
                    "message": "Saisi incorrecte (1 - 80)"
                }

                return message;
            }
        }
    }

    // Check if there is repeated number
    const uniqueArray = (array) => Array.from(new Set(array))
    var sameEchar = uniqueArray(_echar);

    if (sameEchar.length !== _echar.length) {
        message = {
            "isError": true,
            "message": "Numéro dupliqué"
        }

        return message;
    }

    var _echars = _echar.map(e => parseInt(e));
    _echars = _echars.sort(function (a, b) { return a - b });

    message = {
        "isError": false,
        "multiplicite": multiplicite,
        "data": _echars.join('-')
    }

    return message;

}

export function buscarDraw(aleaChoix: number, jeuAlea: number) {

    // Create an array of numbers from 1 to 80
    const numbers = Array.from({ length: 80 }, (_, i) => i + 1);

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    // Select the first n numbers from the shuffled array
    const combi =  numbers.slice(0, aleaChoix);

    if(jeuAlea == 0){
        return combi.join('.');
    }
    else if(jeuAlea == 1){
        return "-".concat(combi.join('-'));
    }
    else if(jeuAlea == 2){
        return "+".concat(combi.join('-'));
    }
}

export * from '.';