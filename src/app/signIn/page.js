
'use client';
const { useState, useEffect} = require("react");

export default function SignUpPage() {

    const [credentials, setCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);

    const validate = (credentials, password) => {
        if (!credentials || !password) {
            console.log("Validation failed: Missing fields");
            setValidated(false);
            return false;
        }
        if (credentials.trim() === '' || password.trim() === '') {
            console.log("Validation failed: Empty fields");
            credentials.trim() === '' ? setCredentials('') : setPassword('');
            setValidated(false);
            return false;
        }
        setValidated(true);
    }


    useEffect(() => {
        validate(credentials, password);
    }, [credentials, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(false);
        const formData = {
            credentials,
            password
        };
        console.log("Form submitted with data:", formData);
        
        // Add further submission logic here (e.g., API call)
        // if submission fails, set error to true
        // setError(true);
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
            <label className="block text-sm font-medium">Email or Course ID</label>
            <input
              name="credentials"
              id="credentials"
              type="text"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
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
