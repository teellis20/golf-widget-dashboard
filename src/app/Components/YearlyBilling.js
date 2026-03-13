export default function YearlyBilling({handleCheckout}) {
    return (
        <div className="relative bg-white rounded-2xl p-10 shadow transition-all duration-300
                border-2 border-green-700
                hover:scale-[1.03] hover:shadow-2xl
                hover:ring-4 hover:ring-green-100">

            {/* Best value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2
                            bg-green-700 text-white text-xs font-medium
                            px-3 py-1 rounded-full">
                Best Value
            </div>

            <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold">Yearly</h2>

                <div className="flex justify-center items-end gap-2">
                <span className="text-5xl font-bold animate-fadeIn">$32.50</span>
                <span className="text-gray-500 mb-1">/month</span>
                </div>

                <p className="text-sm text-gray-500">
                Billed annually ($390) 
                </p>

                <p className="text-green-700 text-sm font-medium">
                Save $78 per year
                </p>

                <div className="text-sm text-gray-600 space-y-2 pt-2">
                    <p>• Live course status widget</p>
                    <p>• Daily dashboard updates</p>
                    <p>• Pin location scheduler</p>
                    <p>• Cart rule management</p>
                    <p>• Weather delays & course closures</p>
                </div>

                <button onClick={handleCheckout} className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-medium hover:bg-green-800 transition">
                Start Free Trial
                </button>
            </div>
            </div>
    )
}