import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Keep Your Golfers Informed — Without Updating Your Website Every Day
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          A simple widget for your golf course website that shows today's cart
          rules, course conditions, pin locations, weather, and sunset time.
          Update everything in seconds from a clean dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition">
            Request Demo
          </button>
          <button className="px-8 py-4 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-100 transition">
            See How It Works
          </button>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Problems This Solves For Golf Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Endless Phone Calls",
                desc: "Staff constantly answer the same questions: cart rules, course conditions, and closing times."
              },
              {
                title: "Website Updates Are Painful",
                desc: "Most course websites require logging into a CMS or calling a web developer just to update a rule."
              },
              {
                title: "Golfers Show Up Confused",
                desc: "Players arrive without knowing cart restrictions or weather delays."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow">
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "1. Install The Widget",
              desc: "Add a simple script tag to your website once. It automatically displays today's course information."
            },
            {
              title: "2. Update From The Dashboard",
              desc: "Each morning, update cart rules, course conditions, and pin location in seconds."
            },
            {
              title: "3. Golfers Always See Today's Info",
              desc: "The widget updates instantly so golfers know exactly what to expect before arriving."
            }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-green-600 font-bold text-lg mb-2">
                {item.title}
              </div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE VS AFTER */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Before vs After</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-4">Before</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Staff answer the same phone calls all day</li>
                <li>• Website rarely updated</li>
                <li>• Golfers arrive confused about conditions</li>
                <li>• Pin locations require paper sheets</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-4">After</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Golfers check the website first</li>
                <li>• Daily info always accurate</li>
                <li>• Fewer phone interruptions</li>
                <li>• Pin schedules automated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WIDGET PREVIEW */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Golfers See</h2>

        <div className="bg-white border rounded-2xl shadow-lg p-10 text-center">
          <p className="text-gray-500 mb-4">Widget Preview</p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Cart Rules</p>
              <p className="font-semibold">Cross at 90°</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Course Conditions</p>
              <p className="font-semibold">Open</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Sunset</p>
              <p className="font-semibold">8:42 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Simple Dashboard For Staff</h2>

          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-gray-500">
              Dashboard preview placeholder — update cart rules, conditions,
              pin locations, weather delays, and more in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* INSTALL SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Install In Under 2 Minutes
        </h2>

        <div className="bg-gray-900 text-green-400 rounded-2xl p-8 font-mono text-sm overflow-x-auto">
          {`<script src="https://yourdomain.com/widget.js" data-course="YOUR_COURSE_ID"></script>`}
        </div>

        <p className="text-center text-gray-600 mt-6">
          Copy, paste, and your course widget is live.
        </p>
      </section>

      {/* ROI */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Courses Love It
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="font-semibold text-xl mb-2">Save Staff Time</h3>
              <p className="text-gray-600">
                Reduce repetitive phone calls asking about cart rules or
                conditions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="font-semibold text-xl mb-2">Improve Player Experience</h3>
              <p className="text-gray-600">
                Golfers arrive informed and ready to play.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="font-semibold text-xl mb-2">Works With Any Website</h3>
              <p className="text-gray-600">
                Simple script install works with any existing course website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Make Course Updates Simple?
        </h2>

        <button className="px-10 py-5 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition">
          Request Demo
        </button>
      </section>
    </div>
  );
}
