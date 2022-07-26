export default interface TicketInfo {
    registration:string,
    info:{distance:number,
        isValid:boolean,
        cityAssingned:string,
        pay:boolean}
}