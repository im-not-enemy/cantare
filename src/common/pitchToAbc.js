const abcArray = ['C','D','E','F','G','A','B','c']

const numberToString = (pitchNumber) => {
    pitchNumber = parseInt(pitchNumber)

    if (0 <= pitchNumber && pitchNumber < abcArray.length) return abcArray[pitchNumber]

    else if (abcArray.length <= pitchNumber){
        const octaveOffset = 7
        const octaveString = "'"
        const countOctave = Math.floor(pitchNumber/octaveOffset)
        let pitchString = abcArray[pitchNumber % octaveOffset]
        for (let i=0;i<countOctave;i++){
            pitchString = pitchString + octaveString
        }
        return pitchString
    }

    else if (pitchNumber < 0){
        const octaveOffset = 7
        const octaveString = ","
        const countOctave = Math.floor(1+Math.abs(pitchNumber)/octaveOffset)
        let pitchString = abcArray[countOctave * octaveOffset + pitchNumber]
        for (let i=0;i<countOctave;i++){
            pitchString = pitchString + octaveString
        }
        return pitchString
    }
}
const accidentalToString = (accidental) => {
    switch (accidental){
        case "sharp":
            return "^"
            break;
        case "dblsharp":
            return "^^"
            break;
        case "flat":
            return "_"
            break;
        case "dblflat":
            return "__"
            break;
        case "natural":
            return "="
            break;
    }
}

const pitchToAbc = (pitchObj) => {
    const pitchNumber = String(pitchObj.pitch)
    const accidental = pitchObj.accidental
    if (accidental) return accidentalToString(accidental) + numberToString(pitchNumber)
    else return numberToString(pitchNumber)
}

export default pitchToAbc