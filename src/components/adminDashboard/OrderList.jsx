import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X, Plus, Edit2, Trash2, Eye, CheckCircle, Clock, AlertCircle, User, MapPin, Phone, CreditCard, Truck } from 'lucide-react';

function OrderList() {
  // State untuk sidebar
  const [activeSidebar, setActiveSidebar] = useState(null); // 'detail', 'add', atau null
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State untuk form add order
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    address: '',
    phone: '',
    paymentMethod: 'Cash',
    shipping: 'Dine In',
    items: [
      { name: '', size: 'Regular', quantity: 1, temperature: 'Ice', type: 'Dine In', price: 0 }
    ]
  });

  // Data order
  const orders = [
    {
      id: 1,
      orderNumber: '#12354-09893',
      date: '26 January 2023',
      items: [
        { name: 'Hazelnut Latte', size: 'R', quantity: 1 },
        { name: 'Caramel Machiatto', size: 'L', quantity: 1 }
      ],
      status: 'Done',
      total: 40000,
      customer: {
        fullName: 'Ghaluh Wizard Anggoro',
        address: 'Griya bandung indah',
        phone: '082116304338',
        paymentMethod: 'Cash',
        shipping: 'Dine In'
      },
      details: [
        {
          name: 'Hazelnut Latte',
          quantity: 2,
          size: 'Regular',
          temperature: 'Ice',
          type: 'Dine In',
          price: 40000,
          unitPrice: 20000
        },
        {
          name: 'Caramel Machiatto',
          quantity: 2,
          size: 'Regular',
          temperature: 'Ice',
          type: 'Dine In',
          price: 40000,
          unitPrice: 20000
        }
      ]
    },
    {
      id: 2,
      orderNumber: '#12354-09894',
      date: '27 January 2023',
      items: [
        { name: 'Hazelnut Latte', size: 'L', quantity: 1 },
        { name: 'Caramel Machiatto', size: 'L', quantity: 1 }
      ],
      status: 'Pending',
      total: 40000,
      customer: {
        fullName: 'John Doe',
        address: 'Jl. Merdeka No. 123',
        phone: '081234567890',
        paymentMethod: 'Credit Card',
        shipping: 'Delivery'
      }
    },
    {
      id: 3,
      orderNumber: '#12354-09895',
      date: '28 January 2023',
      items: [
        { name: 'Hazelnut Latte', size: 'L', quantity: 1 },
        { name: 'Caramel Machiatto', size: 'L', quantity: 1 }
      ],
      status: 'On Progress',
      total: 40000,
      customer: {
        fullName: 'Jane Smith',
        address: 'Jl. Sudirman No. 45',
        phone: '085678901234',
        paymentMethod: 'Cash',
        shipping: 'Dine In'
      }
    },
    {
      id: 4,
      orderNumber: '#12354-09896',
      date: '29 January 2023',
      items: [
        { name: 'Hazelnut Latte', size: 'L', quantity: 1 },
        { name: 'Caramel Machiatto', size: 'L', quantity: 1 }
      ],
      status: 'Waiting',
      total: 40000,
      customer: {
        fullName: 'Robert Johnson',
        address: 'Jl. Gatot Subroto No. 78',
        phone: '087812345678',
        paymentMethod: 'Debit Card',
        shipping: 'Delivery'
      }
    },
    {
      id: 5,
      orderNumber: '#12354-09897',
      date: '30 January 2023',
      items: [
        { name: 'Hazelnut Latte', size: 'L', quantity: 1 },
        { name: 'Caramel Machiatto', size: 'L', quantity: 1 }
      ],
      status: 'On Progress',
      total: 40000,
      customer: {
        fullName: 'Sarah Williams',
        address: 'Jl. Thamrin No. 90',
        phone: '081112223333',
        paymentMethod: 'Cash',
        shipping: 'Dine In'
      }
    }
  ];

  // Status options untuk filter
  const statusOptions = ['All', 'Done', 'Pending', 'On Progress', 'Waiting'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'E-Wallet'];
  const shippingOptions = ['Dine In', 'Delivery', 'Take Away'];

  // Filter order berdasarkan search dan status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format harga ke IDR
  const formatPrice = (price) => {
    return `IDR ${price.toLocaleString('id-ID')}`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done':
        return <CheckCircle size={16} />;
      case 'Pending':
        return <Clock size={16} />;
      case 'On Progress':
        return <AlertCircle size={16} />;
      case 'Waiting':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  // Handle order click untuk membuka sidebar detail
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setActiveSidebar('detail');
  };

  // Handle add order button
  const handleAddOrderClick = () => {
    setActiveSidebar('add');
  };

  // Close sidebar
  const handleCloseSidebar = () => {
    setActiveSidebar(null);
    setSelectedOrder(null);
    // Reset form jika sedang di mode add
    if (activeSidebar === 'add') {
      setNewOrder({
        customerName: '',
        address: '',
        phone: '',
        paymentMethod: 'Cash',
        shipping: 'Dine In',
        items: [
          { name: '', size: 'Regular', quantity: 1, temperature: 'Ice', type: 'Dine In', price: 0 }
        ]
      });
    }
  };

  // Handle status update
  const handleStatusUpdate = (newStatus) => {
    // Di sini biasanya akan ada API call untuk update status
    console.log(`Update status to: ${newStatus}`);
    alert(`Status updated to ${newStatus}`);
    handleCloseSidebar();
  };

  // Handle add order form input
  const handleAddOrderInput = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle item input
  const handleItemInput = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setNewOrder(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  // Add new item
  const handleAddItem = () => {
    setNewOrder(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { name: '', size: 'Regular', quantity: 1, temperature: 'Ice', type: 'Dine In', price: 0 }
      ]
    }));
  };

  // Remove item
  const handleRemoveItem = (index) => {
    if (newOrder.items.length > 1) {
      const updatedItems = newOrder.items.filter((_, i) => i !== index);
      setNewOrder(prev => ({
        ...prev,
        items: updatedItems
      }));
    }
  };

  // Handle add order submit
  const handleAddOrderSubmit = (e) => {
    e.preventDefault();
    // Di sini biasanya akan ada API call untuk membuat order baru
    console.log('New Order:', newOrder);
    alert('Order added successfully!');
    handleCloseSidebar();
  };

  // Calculate total for add order
  const calculateTotal = () => {
    return newOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Calculate paginated orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Check if sidebar is open
  const isSidebarOpen = activeSidebar !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay untuk mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Main Container */}
      <div className="relative">
        {/* Order Detail Sidebar */}
        {activeSidebar === 'detail' && selectedOrder && (
          <div 
            className={`
              fixed top-0 right-0 z-40 h-full w-full md:w-96 
              bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Order {selectedOrder.orderNumber}</h2>
                  <p className="text-sm text-gray-600">Order Information</p>
                </div>
                <button
                  onClick={handleCloseSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sidebar Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Order Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <User size={18} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Full Name</div>
                        <div className="font-medium">{selectedOrder.customer.fullName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Address</div>
                        <div className="font-medium">{selectedOrder.customer.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={18} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Phone</div>
                        <div className="font-medium">{selectedOrder.customer.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard size={18} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Payment Method</div>
                        <div className="font-medium">{selectedOrder.customer.paymentMethod}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck size={18} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Shipping</div>
                        <div className="font-medium">{selectedOrder.customer.shipping}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Status</span>
                      </div>
                      <div className="relative">
                        <select
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)} border-0 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 appearance-none pr-8`}
                          value={selectedOrder.status}
                          onChange={(e) => handleStatusUpdate(e.target.value)}
                        >
                          <option value="Waiting">Waiting</option>
                          <option value="On Progress">On Progress</option>
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Transaction */}
                <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Transaksi:</span>
                    <span className="text-2xl font-bold text-indigo-600">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Your Order Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Order</h3>
                  <div className="space-y-4">
                    {selectedOrder.details?.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                        <div className="text-sm text-gray-600 mb-2">
                          {item.quantity}pcs | {item.size} | {item.temperature} | {item.type}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Price:</span>
                          <div className="text-right">
                            <div className="font-medium">{formatPrice(item.price)}</div>
                            <div className="text-sm text-gray-500">({formatPrice(item.unitPrice)} per item)</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleStatusUpdate('Done')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Order Sidebar */}
        {activeSidebar === 'add' && (
          <div 
            className={`
              fixed top-0 right-0 z-40 h-full w-full md:w-96 
              bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Add New Order</h2>
                  <p className="text-sm text-gray-600">Create a new customer order</p>
                </div>
                <button
                  onClick={handleCloseSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sidebar Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleAddOrderSubmit}>
                  {/* Customer Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="customerName"
                            value={newOrder.customerName}
                            onChange={handleAddOrderInput}
                            placeholder="Enter full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="address"
                            value={newOrder.address}
                            onChange={handleAddOrderInput}
                            placeholder="Enter address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="tel"
                            name="phone"
                            value={newOrder.phone}
                            onChange={handleAddOrderInput}
                            placeholder="Enter phone number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 text-gray-400" size={20} />
                          <select
                            name="paymentMethod"
                            value={newOrder.paymentMethod}
                            onChange={handleAddOrderInput}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                          >
                            {paymentMethods.map(method => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shipping Method
                        </label>
                        <div className="relative">
                          <Truck className="absolute left-3 top-3 text-gray-400" size={20} />
                          <select
                            name="shipping"
                            value={newOrder.shipping}
                            onChange={handleAddOrderInput}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                          >
                            {shippingOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus size={16} />
                        Add Item
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {newOrder.items.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-gray-800">Item {index + 1}</h4>
                            {newOrder.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={18} />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemInput(index, 'name', e.target.value)}
                                placeholder="Enter product name"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
                              <select
                                value={item.size}
                                onChange={(e) => handleItemInput(index, 'size', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                              >
                                <option value="Regular">Regular</option>
                                <option value="Large">Large</option>
                                <option value="Extra Large">Extra Large</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleItemInput(index, 'quantity', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Price (IDR)</label>
                              <input
                                type="number"
                                min="0"
                                value={item.price}
                                onChange={(e) => handleItemInput(index, 'price', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </form>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseSidebar}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleAddOrderSubmit}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Create Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:mr-96' : ''}`}>
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order List</h1>
              <p className="text-gray-600">Manage customer orders and status</p>
            </div>

            {/* Action Bar: Status Filter + Search + Add Order */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* Kiri: Status Filter dan Search */}
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                {/* Status Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto"
                  >
                    <Filter size={20} />
                    <span className="font-medium">Status: {statusFilter}</span>
                    <ChevronDown size={20} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10"
                        onClick={() => setIsFilterOpen(false)}
                      />
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setStatusFilter(status);
                              setIsFilterOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-80">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Order Number"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Search Order Number</p>
                </div>
              </div>

              {/* Kanan: Add Order Button */}
              <button 
                onClick={handleAddOrderClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm w-full md:w-auto"
              >
                <Plus size={20} />
                <span>Add Order</span>
              </button>
            </div>

            {/* Tabel Order */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. Order
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedOrders.map((order, index) => (
                      <tr 
                        key={order.id}
                        className={`
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          hover:bg-gray-100 transition-colors cursor-pointer
                        `}
                        onClick={() => handleOrderClick(order)}
                      >
                        {/* No. Order */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{order.orderNumber}</div>
                        </td>
                        
                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.date}</div>
                        </td>
                        
                        {/* Order Items */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <span className="text-gray-500">•</span>
                                <span>{item.name} {item.size}{item.quantity}x</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        
                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </div>
                        </td>
                        
                        {/* Total */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</div>
                        </td>
                        
                        {/* Action */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                            <button 
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                              title="View Details"
                              onClick={() => handleOrderClick(order)}
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Tabel: Pagination */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Info jumlah order */}
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-semibold">{paginatedOrders.length}</span> order of <span className="font-semibold">100</span> order
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(9, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md ${page === currentPage 
                              ? 'bg-indigo-600 text-white' 
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;