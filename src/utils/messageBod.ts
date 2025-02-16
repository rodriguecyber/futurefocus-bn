export const MessageTemplate=({name, amount,remain}:{name:string,amount?:number,remain?:number})=>{

return {
  apply: `Hello, ${name} You have successfully submitted your application for scholarship at Future Focus Academy. +250798664112.`,
  pay: `Hello, ${name} you have successfully paid ${amount}Frw for school fees at Future Focus Academy. remaining balance is ${remain}Frw.`,
  register: `Hello, ${name} you have successfully paid 10,000 Rwf for the registration at Future focus academy.`,
  admit: `Congratulations ${name}, You are now admitted for a scholarship at Future Focus Academy. Call +250798664112 for more details.`,
};}