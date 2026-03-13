export default function MonthlyBilling({handleCheckout, price, period}) {
    return (
        <div className="bg-white rounded-2xl shadow p-10 text-center space-y-6">

            <h2 className="text-xl font-semibold">Course Widget Platform</h2>

            {/* Price */}
            <div className="flex justify-center items-end gap-2">
            <span
                // key={billingCycle}
                className="text-5xl font-bold animate-fadeIn"
            >
                {price}
            </span>
            <span className="text-gray-500 mb-1">{period}</span>
            </div>

            {/* {billingCycle === "yearly" && (
            <div>
            <p className="text-gray-700 text-sm font-medium">
                (billed annually)
            </p>
            <p className="text-green-700 text-sm font-medium">
                Save $78 per year
            </p>
            </div>
            )} */}

            {/* Features */}
            <div className="text-sm text-gray-600 space-y-2 pt-2">
            <p>• Live course status widget</p>
            <p>• Daily dashboard updates</p>
            <p>• Pin location scheduler</p>
            <p>• Cart rule management</p>
            <p>• Weather delays & course closures</p>
            </div>

            {/* CTA */}
            <button
            onClick={handleCheckout}
            className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:bg-green-800 transition"
            >
            Start Free Trial
            </button>

            <p className="text-xs text-gray-400">
            Cancel anytime. No contracts required.
            </p>
      </div>
    )
}