import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  UserPlus 
} from "lucide-react"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          confirm_password: formData.confirmPassword
        };
        const response = await fetch('https://api.amigofabric.com/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error registering:', error);
        if (error.message === 'Registration failed') {
          setFormData(prev => ({
            ...prev,
            email: 'Invalid email or password'
          }));
        };
      }
    }
  }

  return (
    <div className=" mt-12 min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join our platform and start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`
                  w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2
                  ${errors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-green-500'}
                `}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              <UserPlus className="mr-2" />
              Sign Up
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account? {" "}
              <a href="#" className="text-green-600 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage