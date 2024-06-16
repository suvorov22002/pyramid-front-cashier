
export interface RequestResponse<T> {
    codeResponse: string
    error: string
    message: string
    data: T
}

export interface Bet {
    id?: number | null;
    codeGame: string;
    barcode: string;
    codePartner: string;
    salle: string;
    cashierLogin: string;
    numeroTirage: number;
    status: Statut;
    codeBonus: number;
    numeroTicket: number;
    montantMise: number;
    montantGainMax?: number;
    montantGainMin?: number;
    odds: number;
    codePari?: string;
    selection?: string;
    createdAt?: Date;
    slips: Slip[];
    bonusAmount?: number;
}

export interface Slip {
    event: number;
    odd: number;
    game: string;
    selection: string;
    resultat: string;
    prix: number;
    coefficient: number;
    status: string;
}

export enum Statut {
    TCKGAGNANT = 'Gagnant',
    TCKPERDANT = 'Perdant',
    Balance = 'Balance insuffisant',
    UPartner = 'Non reconnu',
    TCKNEVAL = 'Non evalué',
    UNKNOWNCASHIER = 'Caissier non reconnu',
    UNKNOWNDRAW = 'Tirage non reconnu',
    TCKNRECON = 'Ticket non reconnu',
    TCKNREG = 'Non enregistré',
    TCKALRPAID = 'Dejà collecté',
    TCKNOTPAID = 'Non collecté'
}

export interface Shift {
    totalSlip: number;
    paidSlip: number;
    revoqSlip: number;
    totalPayin: number;
    totalPayout: number;
    totalBalance: number;
    totalRevoq: number;
    startDate: Date;
    startBalance: number;
    endBalance: number;
    endDate: Date;
    user: string;
}

