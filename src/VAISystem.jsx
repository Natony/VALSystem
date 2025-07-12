import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Network, HelpCircle, Menu, Download, Calendar, Users, Settings, BarChart3, Package, Wrench, Tag, FileText, CheckSquare, Building, Upload, Camera } from 'lucide-react';

const VAISystem = () => {
  const [selectedTab, setSelectedTab] = useState('spare-parts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    period: 'Period of time',
    plant: 'Plant : 8800',
    storage: 'Storage location',
    material: 'Material : 189887'
  });

  const [sparePartsData, setSparePartsData] = useState([
    {
      id: 1,
      materialCode: "189887",
      description: "CB BẢO VỆ ĐỘNG CƠ SCHNEIDER GV2ME14 (6-10A)",
      stockOut: 2,
      location: "SS-06-A5",
      unitPrice: "",
      restock: 0,
      image: "mobility-dashboard\img\SS-06-A5.jpg"
    },
    {
      id: 2,
      materialCode: "190626",
      description: "SCHNEIDER CONTACTOR LC1D18M7",
      stockOut: 2,
      location: "SS-06-A3",
      unitPrice: "",
      restock: 0,
      image: "mobility-dashboard\img\SS-06-A3.jpg"
    },
    {
      id: 3,
      materialCode: "191445",
      description: "INDUSTRIAL CONNECTOR",
      stockOut: 2,
      location: "SS-06-A2",
      unitPrice: "",
      restock: 0,
      image: "mobility-dashboard\img\SS-06-A2.jpg"
    }
  ]);

  const tabs = [
    { id: 'task-analysis', label: 'Task analysis' },
    { id: 'task-status', label: 'Task status' },
    { id: 'spare-parts', label: 'Spare parts' },
    { id: 'taxonomy-guide', label: 'Taxonomy guide' }
  ];

  const sidebarItems = [
    { label: 'Spare parts', active: true, icon: Package },
    { label: 'Request restock', active: false, icon: Package },
    { label: 'Supplier catalogs', active: false, icon: Building },
    { label: 'Check lists', active: false, icon: CheckSquare },
    { label: 'My activities', active: false, icon: BarChart3 },
    { label: 'Task', active: false, icon: CheckSquare },
    { label: 'Maintenance plan', active: false, icon: Wrench },
    { label: 'Dashboard', active: false, icon: BarChart3 }
  ];

  const handleImageUpload = (partId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSparePartsData(prev => 
          prev.map(part => 
            part.id === partId 
              ? { ...part, image: e.target.result }
              : part
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredParts = sparePartsData.filter(part =>
    part.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-4">
          {src = "mobility-dashboard\img\logo.jpg" }
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VAI</span>
            </div>
            <div>
              <div className="font-bold text-gray-800">VAI System</div>
              <div className="text-xs text-gray-500">Inventory Management</div>
            </div>
          </div>
        </div>

        <nav className="px-2">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 cursor-pointer transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Searching for a piece of equipment, a task"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* VAI Logo */}
          <div className="flex justify-start mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">VAI</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              Filter
            </button>
            {Object.entries(selectedFilters).map(([key, value]) => (
              <select
                key={key}
                value={value}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, [key]: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>{value}</option>
                {key === 'period' && <option>Last 30 days</option>}
                {key === 'plant' && <option>Plant : 8801</option>}
                {key === 'storage' && <option>SS-06</option>}
                {key === 'material' && <option>Material : 190626</option>}
              </select>
            ))}
          </div>

          {/* Stats and Info Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Stock quantity</h3>
              <div className="text-3xl font-bold text-gray-900">
                {filteredParts.reduce((sum, part) => sum + part.stockOut, 0)}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Material description</h3>
              <div className="text-sm text-gray-900">
                {selectedFilters.material === 'Material : 189887' 
                  ? 'CB BẢO VỆ ĐỘNG CƠ SCHNEIDER GV2ME14 (6-10A)'
                  : 'Various Materials'
                }
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Storage bin Layout</h3>
              <div className="text-lg font-semibold text-gray-900">SS-06-A5</div>
            </div>
          </div>

          {/* Spare Parts Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Spare part</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Stock out</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Unit price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Restock</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredParts.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 border">
                        <div className="flex items-center space-x-4">
                          <div className="relative group">
                            <img
                              src={item.image}
                              alt={item.description}
                              className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-75 transition-opacity"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded cursor-pointer transition-all">
                              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(item.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.materialCode}</div>
                            <div className="text-sm text-gray-600 max-w-xs">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border text-center">
                        <div className="text-lg font-semibold text-gray-900">{item.stockOut}</div>
                      </td>
                      <td className="px-6 py-4 border text-center">
                        <div className="text-sm font-medium text-gray-900">{item.location}</div>
                      </td>
                      <td className="px-6 py-4 border text-center">
                        <input
                          type="text"
                          placeholder="Enter price"
                          value={item.unitPrice}
                          onChange={(e) => {
                            setSparePartsData(prev => 
                              prev.map(part => 
                                part.id === item.id 
                                  ? { ...part, unitPrice: e.target.value }
                                  : part
                              )
                            );
                          }}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 border text-center">
                        <div className="text-lg font-semibold text-gray-900">{item.restock}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              Found {filteredParts.length} equipment(s) matching "{searchQuery}"
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VAISystem;