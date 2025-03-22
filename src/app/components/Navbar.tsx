"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js 13+

export default function Navbar() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const getUserInitials = (name: string) => {
    if (!name) return "U"; // Default initial if no name is available
    const nameParts = name.trim().split(" ");
    const initials =
      nameParts.length > 1
        ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
        : nameParts[0][0].toUpperCase();
    return initials;
  };

  const handleLogout = async () => {
    try {
      // Call backend logout API to clear HTTP-only cookies
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are included
      });

      // NextAuth signOut - just redirects, does NOT call API again
      await signOut({ redirect: true, callbackUrl: "/" });
      // await signOut();
      // router.push("/"); // Manually redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      <div
        className={`relative flex-grow mx-4 ${
          showSearch ? "block" : "hidden lg:flex"
        }`}
      >
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

        {/* Check if user is logged in */}
        {session?.user ? (
          <div className="flex items-center space-x-4">
            {/* User Profile Picture */}
            {/* <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <Image
                src={"/default-avatar.png"}
                alt={getUserInitials(session.user.name)}
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </div> */}

            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase">
              {getUserInitials(session.user.name)}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Login & Signup Buttons */}
            <Link href="/login">
              <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white cursor-pointer">
                Log in
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer">
                Sign up
              </button>
            </Link>
          </>
        )}
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
            {session?.user ? (
              <button
                onClick={() => signOut()}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white w-full"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// "use client";

// import { useState } from "react";
// import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react";
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

//         {/* Login & Signup Buttons */}
//         <Link href="/login">
//           <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white cursor-pointer">
//             Log in
//           </button>
//         </Link>
//         <Link href="/signup">
//           <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer">
//             Sign up
//           </button>
//         </Link>
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

//             {/* Login & Signup in Mobile Menu */}
//             <Link href="/login">
//               <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white w-full">
//                 Log in
//               </button>
//             </Link>
//             <Link href="/signup">
//               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full">
//                 Sign up
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
