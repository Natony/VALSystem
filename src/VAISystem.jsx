import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Network, HelpCircle, Menu, Download, Calendar, Users, Settings, BarChart3, Package, Wrench, Tag, FileText, CheckSquare, Building, Upload, Camera, Plus, X } from 'lucide-react';

const VAISystem = () => {
  const [selectedTab, setSelectedTab] = useState('spare-parts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    period: 'Period of time',
    plant: 'Plant : 8800',
    storage: 'Storage location',
    material: 'Material : 189887'
  });

  const [sparePartsData, setSparePartsData] = useState([
    {
      id: 1,
      name: "CB Bảo vệ động cơ Schneider",
      materialCode: "189887",
      description: "CB BẢO VỆ ĐỘNG CƠ SCHNEIDER GV2ME14 (6-10A)",
      stockOut: 2,
      location: "SS-06-A5",
      unitPrice: "250.000 VND",
      restock: 0,
      image: "/img/189887.jpg"
    },
    {
      id: 2,
      name: "Relay trung gian RXM2AB2BD Schneider",
      materialCode: "190626",
      description: "Relay trung gian RXM2AB2BD Schneider",
      stockOut: 2,
      location: "SS-06-A3",
      unitPrice: "180.000 VND",
      restock: 0,
      image: "/img/190626.jpg"
    },
    {
      id: 3,
      name: "Motor",
      materialCode: "191445",
      description: "Motor",
      stockOut: 2,
      location: "SS-06-A2",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/191445.jpg"
    },
        {
      id: 4,
      name: "CB CHỐNG GIẬT SCHNEIDER A9D31606 6A 1P+N",
      materialCode: "249403",
      description: "CB CHỐNG GIẬT SCHNEIDER A9D31606 6A 1P+N",
      stockOut: 2,
      location: "SS-06-A4",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/249403.jpg"
    },

    {
      id: 5,
      name: "BRKR,CIRCUIT:CHINT;DZ47-60-D16;400V;3P",
      materialCode: "280240",
      description: "BRKR,CIRCUIT:CHINT;DZ47-60-D16;400V;3P",
      stockOut: 2,
      location: "SS-06-A4",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/280240.jpg"
    },
    {
      id: 6,
      name: "BRKR,CIRCUIT:SCHNDR;63A;30MA;RCCB-ID",
      materialCode: "189917",
      description: "BRKR,CIRCUIT:SCHNDR;63A;30MA;RCCB-ID",
      stockOut: 2,
      location: "SS-06-A4",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/189917.jpg"
    },
    {
      id: 7,
      name: "BRKR,CIRCUIT:SCHNDR;A9F74132;220-240VAC",
      materialCode: "189872",
      description: "BRKR,CIRCUIT:SCHNDR;A9F74132;220-240VAC",
      stockOut: 2,
      location: "SS-06-A4",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/189872.jpg"
    },
    {
      id: 8,
      name: "BRKR,CIRCUIT:SCHNDR;A9F74250;220-240VAC",
      materialCode: "189877",
      description: "BRKR,CIRCUIT:SCHNDR;A9F74250;220-240VAC",
      stockOut: 2,
      location: "SS-06-A4",
      unitPrice: "95.000 VND",
      restock: 0,
      image: "/img/189877.jpg"
    },
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

  const handleAddEquipment = (newEquipment) => {
    const newId = Math.max(...sparePartsData.map(item => item.id)) + 1;
    const equipment = {
      id: newId,
      name: newEquipment.name,
      materialCode: newEquipment.materialCode,
      description: newEquipment.description,
      stockOut: parseInt(newEquipment.stockOut) || 0,
      location: newEquipment.location,
      unitPrice: newEquipment.unitPrice,
      restock: 0,
      image: `https://via.placeholder.com/80x80/e3f2fd/1976d2?text=${encodeURIComponent(newEquipment.materialCode)}`
    };
    setSparePartsData(prev => [...prev, equipment]);
    setShowAddForm(false);
  };

  const filteredParts = sparePartsData.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-4">
          {/* VAI Logo */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
              <img src="/img/logo.jpg" alt="VAI Logo" className="w-full h-full object-cover" />
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
                placeholder="Tìm kiếm thiết bị theo tên, mã, mô tả hoặc vị trí..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Tìm thấy <span className="font-semibold text-blue-600">{filteredParts.length}</span> thiết bị khớp với "<span className="font-semibold">{searchQuery}</span>"
              </div>
            )}
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
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 ml-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm thiết bị</span>
            </button>
          </div>

          {/* Add Equipment Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thêm thiết bị mới</h3>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleAddEquipment({
                    name: formData.get('name'),
                    materialCode: formData.get('materialCode'),
                    description: formData.get('description'),
                    stockOut: formData.get('stockOut'),
                    location: formData.get('location'),
                    unitPrice: formData.get('unitPrice')
                  });
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên thiết bị</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên thiết bị"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã thiết bị</label>
                      <input 
                        type="text" 
                        name="materialCode" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mã thiết bị"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                      <textarea 
                        name="description" 
                        required 
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mô tả thiết bị"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                        <input 
                          type="number" 
                          name="stockOut" 
                          required 
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí</label>
                        <input 
                          type="text" 
                          name="location" 
                          required 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="SS-06-XX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND)</label>
                      <input 
                        type="text" 
                        name="unitPrice" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập giá thiết bị"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Thêm thiết bị
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Stats and Info Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
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
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Danh sách thiết bị ({filteredParts.length})
                </h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Spare part</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Stock out</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border">Location</th>
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
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-75 transition-opacity"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/80x80/f0f0f0/666?text=${encodeURIComponent(item.materialCode)}`;
                              }}
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
                            <div className="font-bold text-blue-600">{item.name}</div>
                            <div className="font-semibold text-gray-900">#{item.materialCode}</div>
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
                        <div className="text-lg font-semibold text-gray-900">{item.restock}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default VAISystem;