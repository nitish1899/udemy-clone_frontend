"use client";

import React from "react";

interface FooterProps {
  className?: string;
}

// export default function Footer({ className = "" }: FooterProps) {
//   return (
//     <footer className={`bg-gray-900 text-white p-4 text-center ${className}`}>
//       © {new Date().getFullYear()} MyApp. All rights reserved.
//     </footer>
//   );
// }

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout for Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Finance & Accounting
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  IT & Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Design
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Teach & Business */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Teach & Business
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Teach on Udemy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Udemy for Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Udemy Clone. All rights reserved.</p>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
