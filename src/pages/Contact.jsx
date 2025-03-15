import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        ></textarea>
      </div>
      <div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Message
        </motion.button>
      </div>
    </form>
  )
}

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 pb-4">
      <button className="flex justify-between items-center w-full text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: 180 }}>
              ▲
            </motion.span>
          ) : (
            <motion.span initial={{ rotate: 180 }} animate={{ rotate: 0 }}>
              ▼
            </motion.span>
          )}
        </span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </div>
  )
}

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-sky-600" />
                      Phone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">+8801734734246</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-sky-600" />
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">amigobd99@gmail.com</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-sky-600" />
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">Rampura Banasree , Dhaka Block E Road 1</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-sky-600" />
                      Business Hours
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">24/7 Open</dd>
                  </div>
                </dl>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <FAQItem
                question="What is your return policy?"
                answer="We offer a 30-day return policy for all unworn and unwashed items. Please refer to our Returns page for more details."
              />
              <FAQItem
                question="How long does shipping take?"
                answer="Domestic orders typically take 3-5 business days. International shipping can take 7-14 business days, depending on the destination."
              />
              <FAQItem
                question="Do you offer size exchanges?"
                answer="Yes, we offer free size exchanges within 14 days of purchase. Please contact our customer service team to initiate an exchange."
              />
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}

export default Contact

