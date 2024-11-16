export const MessageTemplate=({name, amount,remain,course}:{name:string,amount:number,remain:number,course:string})=>{

return {
  apply: `Hello, ${name} You have successfully submitted your application for scholarship at Future Focus Academy. we will inform you as soon as possible if you are admitted.`,
  techup: `Hello,  ${name} Thank you for applying to the TechUp program at  Future Focus Academy!  You’ll hear from us soon with the next steps. Stay tuned and best of luck! – TechUp Team.`,
  pay: `Hello, ${name} you have successfully paid ${amount} Frw for school fees at Future Focus Academy. remaining balance is ${remain}  Frw. thank you`,
  register: `Hello, ${name} you have successfully paid 10,000 Rwf for the registration at Future focus academy. Our team will keep giving you updates`,
  admit: `Congratulations ${name}, You are now admitted for a scholarship at Future Focus Academy in ${course}. Visit our office as soon as possible for registration to secure your spot. Call/WhatsApp us on +250798664112 for more details.`,
};}