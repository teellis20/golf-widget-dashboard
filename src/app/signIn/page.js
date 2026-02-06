
'use client';
const { useState, useEffect} = require("react");
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const validate = (email, password) => {
        if (!email || !password) {
            console.log("Validation failed: Missing fields");
            setValidated(false);
            return false;
        }
        if (email.trim() === '' || password.trim() === '') {
            console.log("Validation failed: Empty fields");
            email.trim() === '' ? setEmail('') : setPassword('');
            setValidated(false);
            return false;
        }
        setValidated(true);
    }

    useEffect(() => {
        const checkIfSignedIn = async () => {
            const supabase = createClient();
            const {data} = await supabase.auth.getUser()

            if (data.user) router.replace('/')

        }

        checkIfSignedIn();
    })


    useEffect(() => {
        validate(email, password);
    }, [email, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(false);
        const formData = {
            email,
            password
        };
        console.log("Form submitted with data:", formData);

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithPassword(formData)
            
            if ( error) {
                console.log('sign in error: ', error)
                // console.log('data user?? ', data.user)
                setError(true)
                return
            }
            
            router.replace('/');
            // if submission fails, set error to true
            // setError(true);
        } catch (e) {
            console.log('sign in error: ', error)
                // console.log('data user?? ', data.user)
                setError(true)
                return
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome Back!</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Course Email</label>
            <input
              name="email"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2"
              placeholder="proshop@oakvalleygc.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2"
              placeholder="••••••••"
            />
            <p hidden={!error} className="text-sm text-red-500 mt-2">Incorrect login information. Please check and try again</p>
          </div>


          {/* Submit */}
          <button disabled={!validated} onClick={handleSubmit} 
            className="w-full bg-green-700 text-white rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <a href="/signUp" className="text-blue-700 cursor-pointer">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}
