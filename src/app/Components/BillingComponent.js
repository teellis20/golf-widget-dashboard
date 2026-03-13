"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MonthlyBilling from "./MonthlyBilling";
import YearlyBilling from "./YearlyBilling";

export default function BillingComponent() {
    const [billingCycle, setBillingCycle] = useState("monthly");
    const price = billingCycle === "monthly" ? "$39" : "$32.50";
    const period = billingCycle === "monthly" ? "/month" : "/month";
    const router = useRouter()
    
    const handleCheckout = async () => {
        //for toggle version remove plan from params
        // const plan = billingCycle
        // console.log('BILLING CYCLE!: ', plan)

        const res = await fetch(
            '/api/checkout_sessions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({plan: billingCycle}),
                }
        )
        
        if (!res.url) {
            alert('There was a problem, refresh and try again')
            return
        }

        const { url } = await res.json();
        router.replace(url); // manually redirect

    }

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      
//       {/* Page Header */}
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-semibold">Billing</h1>
//         <p className="text-gray-500">
//           Choose the plan that works best for your course.
//         </p>
//       </div>

//       {/* Pricing Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* Monthly Plan */}
//         <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Monthly</h2>

//             <div className="flex items-end gap-2">
//               <span className="text-4xl font-bold">$35</span>
//               <span className="text-gray-500 mb-1">/month</span>
//             </div>

//             <p className="text-gray-500 text-sm">
//               Flexible month-to-month access to the dashboard and widget.
//             </p>

//             <ul className="space-y-2 text-sm text-gray-600 pt-2">
//               <li>• Live website widget</li>
//               <li>• Dashboard management</li>
//               <li>• Daily course updates</li>
//               <li>• Pin rotation scheduler</li>
//               <li>• Weather delay & closure notices</li>
//             </ul>
//           </div>

//           <button
//             className="mt-8 w-full bg-green-700 text-white py-3 rounded-xl font-medium hover:bg-green-800 transition"
//             onClick={() => {
//               console.log("Start monthly checkout")
//               handleCheckout('monthly');
//             }}
//           >
//             Choose Monthly
//           </button>
//         </div>

//         {/* Yearly Plan */}
//         <div className="bg-white rounded-2xl shadow p-8 border-2 border-green-700 flex flex-col justify-between relative">
          
//           {/* Badge */}
//           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
//             Best Value
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Yearly</h2>

//             <div className="flex items-end gap-2">
//               <span className="text-4xl font-bold">$350</span>
//               <span className="text-gray-500 mb-1">/year</span>
//             </div>

//             <p className="text-green-700 text-sm font-medium">
//               Includes 2 months free
//             </p>

//             <ul className="space-y-2 text-sm text-gray-600 pt-2">
//               <li>• Everything in Monthly</li>
//               <li>• Priority feature updates</li>
//               <li>• Save $70 per year</li>
//             </ul>
//           </div>

//           <button
//             className="mt-8 w-full bg-green-700 text-white py-3 rounded-xl font-medium hover:bg-green-800 transition"
//             onClick={() => {
//               console.log("Start yearly checkout");
//               handleCheckout('yearly');
//             }}
//           >
//             Choose Yearly
//           </button>
//         </div>

//       </div>

//       {/* Extra Info */}
//       <div className="text-center text-sm text-gray-500 pt-6">
//         Subscriptions can be cancelled anytime from your billing settings.
//       </div>

//     </div>
//   );

return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Billing</h1>
        <p className="text-gray-500">
          Simple pricing for keeping your golfers informed.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-xl p-1 flex items-center gap-1">

          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              billingCycle === "monthly"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition relative ${
              billingCycle === "yearly"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs text-green-700 font-semibold">
              2 months free
            </span>
          </button>

        </div>
      </div>

      {/* Monthly Pricing Card */}
            {billingCycle === 'monthly' 
                ? <MonthlyBilling price={price} handleCheckout={handleCheckout} period={period} />
                : <YearlyBilling handleCheckout={handleCheckout}/> 
            }

    </div>
  );
}