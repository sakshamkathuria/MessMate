import { NavLink } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-8 text-sm text-gray-500">
      
      {/* Top Section */}
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-gray-200">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white rounded-lg w-9 h-9 flex items-center justify-center">
              <UtensilsCrossed size={18} />
            </div>
            <span className="text-lg font-bold text-gray-900">
              MessMate
            </span>
          </div>

          <p className="max-w-80 mt-3">
            Your daily mess companion to track meals, manage attendance,
            and simplify billing — all in one place.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-4">
            <a href="#" className="hover:text-orange-500">Facebook</a>
            <a href="#" className="hover:text-orange-500">Instagram</a>
            <a href="#" className="hover:text-orange-500">Twitter</a>
            <a href="#" className="hover:text-orange-500">Mail</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/billing">Billing</NavLink></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>Chitkara University</li>
            <li>Chandigarh, Punjab</li>
            <li>+91 80549 69067</li>
            <li>support@messmate.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} MessMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
