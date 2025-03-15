import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronRight,

  Music2,
} from 'lucide-react';

import logo from "../assets/amigo.jpg"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
      {/* About Section */}
<div className="space-y-6">
  <img src={logo} alt="" className='w-32 h-24' />
  <p className="text-sm leading-relaxed">
    Discover the latest trends in fashion and explore our handpicked collection of premium clothing, accessories, and lifestyle products.
  </p>
  <div className="flex space-x-4">
    <a href="https://www.facebook.com/share/15nWd5y3cH/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
      <Facebook className="w-5 h-5" />
    </a>
    <a href="https://www.tiktok.com/@amigobd99?_t=ZS-8tmQ9St2PEg&_r=1" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
  <Music2 className="w-5 h-5" />
</a>


    <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
      <Twitter className="w-5 h-5" />
    </a>
    <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
      <Youtube className="w-5 h-5" />
    </a>

   
  </div>
</div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', link: '/about' },
                { name: 'Contact', link: '/contact' },

                { name: 'Terms of Service', link: '/terms&condition' },
                { name: 'Privacy Policy', link: '/privacy&policy' },

              ].map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="flex items-center group">
                    <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="ml-2 group-hover:text-purple-500 transition-colors duration-300">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-500 mt-1" />
                <p className="text-sm">Rampura Banasree , Dhaka
                  Block E
                  Road-1</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-500" />
                <p className="text-sm">+8801734734246</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <p className="text-sm">amigobd99@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Newsletter</h4>
            <p className="text-sm">Subscribe to our newsletter and get 10% off your first purchase</p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-300">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;