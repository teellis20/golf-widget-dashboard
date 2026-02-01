import React from "react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Create Your Course Account</h1>
          <p className="text-gray-500 mt-2">
            Set up your golf course widget in minutes
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">

          {/* CONTACT SECTION */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Primary Contact</h2>
            <p className="text-sm text-gray-500 mb-4">
              Used for billing, Stripe receipts, and important account notices.
            </p>

            <div className="space-y-4">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium">Contact Name</label>
                <input
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="John Smith"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium">Contact Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="john@oakvalleygc.com"
                />
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Course & Staff Access</h2>
            <p className="text-sm text-gray-500 mb-4">
              This is the shared login used by pro‑shop and clubhouse staff.
            </p>

            <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-600 mb-5">
              Use a general clubhouse email (ex: <span className="font-medium">proshop@oakvalleygc.com</span>)
              and a password staff can access if needed. Your <span className="font-medium">Course ID</span> will
              be generated automatically.
            </div>

            <div className="space-y-4">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium">Course Name</label>
                <input
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="Oak Valley Golf Club"
                />
              </div>

              {/* Course Email */}
              <div>
                <label className="block text-sm font-medium">Course Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="proshop@oakvalleygc.com"
                />
              </div>

              {/* Shared Password */}
              <div>
                <label className="block text-sm font-medium">Shared Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Choose a password staff members can share if needed.
                </p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium">Course Address</label>
                <input
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="123 Fairway Dr, Orlando, FL 32801"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used to automatically determine weather and location data.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-green-700 text-white rounded-xl py-3 font-medium">
            Create Course Account
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <a href="/signIn" className="text-blue-700 cursor-pointer">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
