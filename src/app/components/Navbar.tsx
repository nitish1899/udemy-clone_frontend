"use client";

import { useState } from "react";
import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm h-16">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          Udemy
        </Link>

        {/* Explore - Hidden on Mobile */}
        <button className="text-gray-700 hover:text-black text-lg hidden lg:block">
          Explore
        </button>
      </div>

      {/* Search Bar */}
      <div className={`relative flex-grow mx-4 ${showSearch ? "block" : "hidden lg:flex"}`}>
        <Search className="absolute left-4 top-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full pl-12 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Mobile Search Button */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="lg:hidden p-2 rounded-full bg-gray-100"
      >
        <Search size={24} />
      </button>

      {/* Right Section */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link href="#" className="text-gray-700 hover:text-black text-lg">
          Udemy Business
        </Link>
        <Link href="#" className="text-gray-700 hover:text-black text-lg">
          Teach on Udemy
        </Link>
        <Link href="#" className="text-gray-700 hover:text-black text-lg">
          My Learning
        </Link>

        {/* Icons */}
        <button>
          <ShoppingCart className="text-gray-700 hover:text-black" size={24} />
        </button>
        <button>
          <Bell className="text-gray-700 hover:text-black" size={24} />
        </button>

        {/* Login & Signup Buttons */}
        <Link href="/login">
          <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white">
            Log in
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Sign up
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link href="#" className="text-gray-700 hover:text-black text-lg">
              Explore
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black text-lg">
              Udemy Business
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black text-lg">
              Teach on Udemy
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black text-lg">
              My Learning
            </Link>

            {/* Login & Signup in Mobile Menu */}
            <Link href="/login">
              <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white w-full">
                Log in
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


// "use client";

// import { useState } from "react";
// import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm h-16">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4">
//         {/* Mobile Menu Button */}
//         <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>

//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-purple-600">
//           Udemy
//         </Link>

//         {/* Explore - Hidden on Mobile */}
//         <button className="text-gray-700 hover:text-black text-lg hidden lg:block">
//           Explore
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div
//         className={`relative flex-grow mx-4 ${
//           showSearch ? "block" : "hidden lg:flex"
//         }`}
//       >
//         <Search className="absolute left-4 top-3 text-gray-500" size={20} />
//         <input
//           type="text"
//           placeholder="Search for anything"
//           className="w-full pl-12 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Mobile Search Button */}
//       <button
//         onClick={() => setShowSearch(!showSearch)}
//         className="lg:hidden p-2 rounded-full bg-gray-100"
//       >
//         <Search size={24} />
//       </button>

//       {/* Right Section */}
//       <div className="hidden lg:flex items-center space-x-6">
//         <Link href="#" className="text-gray-700 hover:text-black text-lg">
//           Udemy Business
//         </Link>
//         <Link href="#" className="text-gray-700 hover:text-black text-lg">
//           Teach on Udemy
//         </Link>
//         <Link href="#" className="text-gray-700 hover:text-black text-lg">
//           My Learning
//         </Link>

//         {/* Icons */}
//         <button>
//           <ShoppingCart className="text-gray-700 hover:text-black" size={24} />
//         </button>
//         <button>
//           <Bell className="text-gray-700 hover:text-black" size={24} />
//         </button>

//         {/* User Profile */}
//         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white text-lg">
//           NK
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden">
//           <div className="flex flex-col p-4 space-y-4">
//             <Link href="#" className="text-gray-700 hover:text-black text-lg">
//               Explore
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-black text-lg">
//               Udemy Business
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-black text-lg">
//               Teach on Udemy
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-black text-lg">
//               My Learning
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import { Search, ShoppingCart, Bell } from "lucide-react";
// // import Image from "next/image";

// // export default function Navbar() {
// //   const [search, setSearch] = useState("");

// //   return (
// //     <nav className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm h-16">
// //       {/* Left Section */}
// //       <div className="flex items-center space-x-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold flex items-center">
// //           <span className="text-purple-600">Udemy</span>
// //         </div>

// //         {/* Explore */}
// //         <button className="text-gray-700 hover:text-black text-lg">
// //           Explore
// //         </button>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="flex-grow mx-8">
// //         <div className="relative w-full max-w-2xl">
// //           <Search className="absolute left-4 top-3 text-gray-500" size={20} />
// //           <input
// //             type="text"
// //             placeholder="Search for anything"
// //             className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Right Section */}
// //       <div className="flex items-center space-x-6">
// //         <a href="#" className="text-gray-700 hover:text-black text-lg">
// //           Udemy Business
// //         </a>
// //         <a href="#" className="text-gray-700 hover:text-black text-lg">
// //           Teach on Udemy
// //         </a>
// //         <a href="#" className="text-gray-700 hover:text-black text-lg">
// //           My Learning
// //         </a>

// //         {/* Icons */}
// //         <button>
// //           <ShoppingCart className="text-gray-700 hover:text-black" size={24} />
// //         </button>
// //         <button>
// //           <Bell className="text-gray-700 hover:text-black" size={24} />
// //         </button>

// //         {/* User Profile */}
// //         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white text-lg">
// //           NK
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }
