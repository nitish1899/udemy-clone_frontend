"use client";

import React from "react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`w-64 bg-gray-800 text-white p-4 hidden sm:block ${className}`}>
      <ul className="space-y-4">
        <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Dashboard</a></li>
        <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Profile</a></li>
        <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Settings</a></li>
      </ul>
    </aside>
  );
}


// "use client";

// import React from "react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-gray-800 text-white p-4 hidden sm:block">
//       <ul className="space-y-4">
//         <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Dashboard</a></li>
//         <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Profile</a></li>
//         <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Settings</a></li>
//       </ul>
//     </aside>
//   );
// }
