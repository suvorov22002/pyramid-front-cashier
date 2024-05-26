import { Slip, Statut } from "../data"
import { BetKeno } from "../data/betKeno"

const allEvents_G: Slip[] = [
    {"event":9945684567, "odd":6500, "game":"Keno", "selection":"3-80-20-11-3-8-10-21-28-32", 
        "resultat":"20-11-3-8-10-21-28-32-66-50-2-77-43-41-30-17-39-72-35-9", 
        "prix":500,"coefficient":0.5,"status":"gagnant"},
    {"event":4568, "odd":3.1, "game":"Keno", "selection":"3-80-20-11-3-8-10-21-28-32",  
        "resultat":"21-28-32-66-50-42-77-43-41-30-17-39-72-35-9-20-11-3-8-10", "prix":500,"coefficient":1,"status":"perdant"}
]
const betKeno_G: BetKeno = {
    coefficient: 0,
    multipleRound: 2,
    codeGame: "Keno",
    barcode: "903461284356730236",
    codePartner: "SUPERBET",
    salle: "SUPERBET",
    cashierLogin: "JOSELU",
    numeroTirage: 4567,
    status: Statut.TCKGAGNANT,
    codeBonus: 33,
    numeroTicket: 6567,
    montantMise: 1000,
    montantGainMax: 1750,
    odds: 3.5,
    codePari: "numAll",
    selection: "3-80-20-11-3-8-10-21-28-32",
    slips: allEvents_G
}

const allEvents_P: Slip[] = [
    {"event":9945684567, "odd":10, "game":"Keno", "selection":"3-80-20-11-3-8-10-21-28-32", 
        "resultat":"20-11-3-8-10-21-28-32-66-50-2-77-43-41-30-17-39-72-35-9", 
        "prix":1000,"coefficient":0.5,"status":"perdant"},
    {"event":4568, "odd":10, "game":"Keno", "selection":"3-80-20-11-3-8-10-21-28-32",  
        "resultat":"21-28-32-66-50-42-77-43-41-30-17-39-72-35-9-20-11-3-8-10", "prix":1000,"coefficient":1,"status":"perdant"},
]
const betKeno_P: BetKeno = {
    coefficient: 0,
    multipleRound: 2,
    codeGame: "Keno",
    barcode: "903461284356730100",
    codePartner: "SUPERBET",
    salle: "SUPERBET",
    cashierLogin: "JOSELU",
    numeroTirage: 4567,
    status: Statut.TCKPERDANT,
    codeBonus: 33,
    numeroTicket: 6566,
    montantMise: 1000,
    //montantGainMax: 1750,
    odds: 3.5,
    codePari: "numAll",
    selection: "3-80",
    slips: allEvents_P
}

const allEvents_N: Slip[] = [
    {"event":9945684567, "odd":10, "game":"Keno", "selection":"20-11-3", 
        "resultat":"20-11-3-8-10-21-28-32-66-50-2-77-43-41-30-17-39-72-35-9", 
        "prix":500,"coefficient":0.5,"status":"perdant"},
    {"event":9945684568, "odd":10, "game":"Keno", "selection":"20-11-3",  
        "resultat":"21-28-32-66-50-42-77-43-41-30-17-39-72-35-9-20-11-3-8-10", "prix":500,"coefficient":1,"status":"perdant"},
        {"event":9945684569, "odd":10, "game":"Keno", "selection":"20-11-3",  
        "resultat":"21-28-32-66-50-42-77-43-41-30-17-39-72-35-9-20-11-3-8-10", "prix":500,"coefficient":1,"status":"encours"},
]
const betKeno_N: BetKeno = {
    coefficient: 0,
    multipleRound: 2,
    codeGame: "Keno",
    barcode: "903461284356730300",
    codePartner: "SUPERBET",
    salle: "SUPERBET",
    cashierLogin: "JOSELU",
    numeroTirage: 9945684567,
    status: Statut.TCKNEVAL,
    codeBonus: 35,
    numeroTicket: 6590,
    montantMise: 1500,
    //montantGainMax: 1750,
    odds: 3.5,
    codePari: "numAll",
    selection: "20-11-3",
    slips: allEvents_N
}

const allEvents_A: Slip[] = [
    {"event":9945684570, "odd":1.87, "game":"Keno", "selection":"pair", 
        "resultat":"20-11-3-8-10-21-28-32-66-50-2-77-43-41-30-17-39-72-35-9", 
        "prix":2000,"coefficient":1,"status":"gagnant"},
]
const betKeno_A: BetKeno = {
    coefficient: 0,
    multipleRound: 2,
    codeGame: "Keno",
    barcode: "903461284356730001",
    codePartner: "SUPERBET",
    salle: "SUPERBET",
    cashierLogin: "JOSELU",
    numeroTirage: 9945684570,
    status: Statut.TCKALRPAID,
    codeBonus: 35,
    numeroTicket: 6590,
    montantMise: 2000,
    montantGainMax: 3740,
    odds: 1.87,
    codePari: "PAIR",
    selection: "pair",
    slips: allEvents_A
}

export {betKeno_G, betKeno_P, betKeno_N, betKeno_A}