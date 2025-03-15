import  { useState } from 'react'

import { 
  Target, 
  Eye, 
  Building, 
  Trophy, 
  Shield, 
  Globe, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Navigation,
  ExternalLink
} from "lucide-react"

const MissionVisionCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
    <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
      <Icon className="w-8 h-8 text-gray-800" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
)

const About = () => {
  const [selectedLocation] = useState({
    name: "Amigo Fabric Store",
    address: "Rampura Banasree , Dhaka Block E Road 1",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    },
    phone: "+8801734734246",
    email: "amigobd99@gmail.com",
    hours: "24/7 Open"
  })

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.address)}`

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 mt-16">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 italic">AmigoFabric Shop</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        {/* Mission and Vision Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <MissionVisionCard
              icon={Target}
              title="Our Mission"
              description="To revolutionize the online shopping experience by providing curated, high-quality fashion that empowers individuals to express their unique style with confidence and ease."
            />
            <MissionVisionCard
              icon={Eye}
              title="Our Vision"
              description="To become the global leader in personalized online fashion, setting new standards of customer experience, sustainability, and innovative retail technology."
            />
          </div>
        </section>

        {/* Company Story Section */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2023, B Shopping emerged from a deep passion to transform online fashion retail. 
                We believe in more than just selling clothes—we creating a platform that celebrates 
                individual expression and quality.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <Trophy className="w-10 h-10 mx-auto mb-2 text-gray-800" />
                  <h3 className="font-bold">5+ Years Experience</h3>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <Globe className="w-10 h-10 mx-auto mb-2 text-gray-800" />
                  <h3 className="font-bold">Global Presence</h3>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-200">
              <img 
                src="https://i.ibb.co.com/DggqK92Q/bj.jpg" 
                alt="B Shopping Team" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-gray-800 mr-4" />
                <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Navigation className="w-6 h-6 mr-3 text-gray-600" />
                  <span>{selectedLocation.address}</span>
                  <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 hover:text-gray-500"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-gray-600" />
                  <span>{selectedLocation.hours}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-gray-600" />
                  <span>{selectedLocation.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-gray-600" />
                  <span>{selectedLocation.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation.address)}&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Trust B Shopping?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-gray-800" />
                <h3 className="font-bold text-xl mb-3">Secure Transactions</h3>
                <p className="text-gray-700">Advanced encryption and secure payment gateways.</p>
              </div>
              <div className="text-center">
                <Building className="w-12 h-12 mx-auto mb-4 text-gray-800" />
                <h3 className="font-bold text-xl mb-3">Corporate Integrity</h3>
                <p className="text-gray-700">Transparent business practices and ethical standards.</p>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-gray-800" />
                <h3 className="font-bold text-xl mb-3">Global Quality</h3>
                <p className="text-gray-700">Rigorous quality control for premium products.</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>

  
    </div>
  )
}

export default About