import BillingComponent from "../Components/BillingComponent";

export default async function BillingPage ({ searchParams }) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log('Order canceled -- checkout when ready')
  }
  // return (
  //   <div>
  //     <h2>Stripe Test</h2>
  //     <form action='/api/checkout_sessions' method="POST">
  //       <section>
  //         <button
  //           type="submit"
  //           role="link"  
  //         >Checkout</button>
  //       </section>
  //     </form>
      

  //   </div>
  // )

  return <BillingComponent />

 
}