import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn 
} from "lucide-react"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        password: formData.password
      };

      const response = await fetch('https://api.amigofabric.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      // set data.token to localStorage
      localStorage.setItem('token', data.token);
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.message === 'Login failed') {
        setFormData(prev => ({
          ...prev,
          email: 'Invalid email or password'
        }));
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <LogIn className="mr-2" />
              Sign In
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account? {" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage