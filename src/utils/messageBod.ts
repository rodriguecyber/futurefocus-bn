export const MessageTemplate=({name, amount,remain,course}:{name:string,amount:number,remain:number,course:string})=>{

return {
  apply: `Hello, ${name} You have successfully submitted your application for scholarship at Future Focus Academy. +250798664112.`,
  techup: `Hello,  ${name} Thank you for applying to the TechUp program at  Future Focus Academy!  You’ll hear from us soon with the next steps.`,
  pay: `Hello, ${name} you have successfully paid ${amount}Frw for school fees at Future Focus Academy. remaining balance is ${remain}Frw.`,
  register: `Hello, ${name} you have successfully paid 10,000 Rwf for the registration at Future focus academy.`,
  admit: `Congratulations ${name}, You are now admitted for a scholarship at Future Focus Academy. Call +250798664112 for more details.`,
};}