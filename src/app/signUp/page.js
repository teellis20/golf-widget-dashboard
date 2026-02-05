'use client';

import { useState, useEffect } from "react";
import { createClient } from '../../lib/supabase/client'
import { useRouter } from "next/navigation";


export default function SignUpPage() {
    const [isDirty, setIsDirty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        courseName: '',
        courseEmail: '',
        sharedPassword: '',
        courseAddress: ''
    });

    const router = useRouter()


    useEffect(() => {
        // Check if all form field has been modified
        const isChanged = Object.values(formData).every(value => value.trim() !== '');
        setIsDirty(isChanged);
    }, [formData]);

    const handleInputChange = (field, value) => {
        // console.log(field, value);
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        setIsDirty(true);
    };

    const validateForm = () => {
        // Basic validation logic
        for (const key in formData) {
            if (formData[key].trim() === '') {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("Form validation failed. Please fill in all fields.");
            return;
        }
        setIsDirty(false);
        console.log("Submitting sign up form with data:", formData);
        // Add further submission logic here (e.g., API call)
        try {
            
           const supabase = createClient();
           const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.courseEmail,
                password: formData.sharedPassword,
                
            });

            if (authError) {
                console.log('Error creating user, ', authError)
                setIsDirty(true)
                return
            }
            
            const { data: rpcData, error: rpcError } = await supabase.rpc(
                'create_course_and_rep',
                {
                    p_user_id: authData.user.id,
                    p_course_name: formData.courseName,
                    p_course_address: formData.courseAddress,
                    p_contact_name: formData.contactName,
                    p_contact_email: formData.contactEmail,
                    p_contact_phone: formData.contactPhone,
                }
            );

            if (rpcError) {
                console.log('rpc error: ', rpcError)
            
                try {
                    await fetch('/api/deleteUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Essential header
                        },
                        body: JSON.stringify({userId: authData.user.id}),
                    })
                } catch (e) {
                    console.log('error deleting new auth user, ', e)
                }

                alert("Signup failed, please try again");
                setIsDirty(true);
                return;
            }

            console.log("Sign up successful:", { authData, rpcData });
            router.replace('/');

      
        } catch (error) {
            console.log("Error during sign up:", error);
        }
        

    }

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
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium">Contact Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="john@oakvalleygc.com"
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium">Contact Phone</label>
                <input
                  type="tel"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="(407) 555-1234"
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
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
                  onChange={(e) => handleInputChange('courseName', e.target.value)}
                />
              </div>

              {/* Course Email */}
              <div>
                <label className="block text-sm font-medium">Course Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="proshop@oakvalleygc.com"
                  onChange={(e) => handleInputChange('courseEmail', e.target.value)}
                />
              </div>

              {/* Shared Password */}
              <div>
                <label className="block text-sm font-medium">Shared Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border rounded-lg p-2"
                  placeholder="••••••••"
                  onChange={(e) => handleInputChange('sharedPassword', e.target.value)}
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
                  onChange={(e) => handleInputChange('courseAddress', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used to automatically determine weather and location data.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button onClick={(handleSubmit)} disabled={!isDirty} className="w-full bg-green-700 text-white rounded-xl py-3 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
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
