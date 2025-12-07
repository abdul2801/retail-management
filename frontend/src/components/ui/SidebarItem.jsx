import React from "react";
import { ChevronDown } from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active = false, hasSubmenu = false }) => (
  <div
    className={`flex items-center justify-between p-2 rounded-md cursor-pointer group ${
      active ? "bg-white border border-gray-300 shadow-sm" : "hover:bg-gray-200"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? "text-black" : "text-gray-500"} />
      <span
        className={`text-sm font-['IBM_Plex_Sans'] ${
          active ? "text-black" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
    {hasSubmenu && <ChevronDown size={14} className="text-gray-400" />}
  </div>
);

export default SidebarItem;
