import React from "react";
import {
  LayoutGrid, Users, UserPlus, Home, FileText, Building2, ChevronDown
} from "lucide-react";
import SidebarItem from "../ui/SidebarItem";

export default function SalesSidebar() {
  return (
    <div className="w-full md:w-[220px] bg-[#F3F3F3] flex flex-col border-r border-gray-200">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1">
          <SidebarItem icon={LayoutGrid} label="Leads" />
          <SidebarItem icon={Users} label="Sales" active={true} />
          <SidebarItem icon={UserPlus} label="New Lead" />
        </div>
        <div className="h-px bg-gray-200 mx-2" />
        <div className="space-y-1">
          <SidebarItem icon={Home} label="Services" hasSubmenu />
          <SidebarItem icon={Users} label="Customers" />
          <SidebarItem icon={LayoutGrid} label="Products" />
          <SidebarItem icon={Users} label="Employees" />
        </div>
        <div className="h-px bg-gray-200 mx-2" />
        <div className="space-y-1">
          <SidebarItem icon={FileText} label="Invoices" hasSubmenu />
          <SidebarItem icon={FileText} label="Proforma Invoices" />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-[#F3F3F3]">
        <div className="bg-white border border-[#D3D4DD] rounded p-2 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Vault</span>
              <span className="text-[10px] text-gray-500">Business</span>
            </div>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}
