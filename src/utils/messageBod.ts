export const MessageTemplate=({name, amount,remain}:{name:string,amount:number,remain:number})=>{

return  {
    apply:`Hello, ${name} you have successfully applied for scholarship at Future Focus Academy. we will be in touch with you soon if your application accepted.`,
    pay:`Hello, ${name} you have successfully paid ${amount} Frw for school fees at Future Focus Academy. remaining balance is ${remain}  Frw.`,
    register:`Hello, ${name} you have successfully paid 10,000 Frw for Registration  at Future focus`,
    admit:`Hello ${name}, congratulations for being admitted for schorlaship at Future Focus Academy. visit our office for registration to secure your spot or contact us as soon as possible, registration fees is 10,000 Frw. for more info contact our office or contact us`,
}}