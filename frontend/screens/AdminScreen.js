// import React, { useState } from 'react';
// import { 
//   BarChart, PieChart, LineChart, XAxis, YAxis, Tooltip, Bar, Line, Pie, Cell, ResponsiveContainer 
// } from 'recharts';
// import { 
//   Menu, X, BarChart2, MessageSquare, Ban, Bell, ChevronLeft, ChevronRight, User 
// } from 'lucide-react';

// export default function AdminDashboard() {
//   const [blacklist, setBlacklist] = useState([
//     { id: 1, name: 'Spam Bot 2345' },
//     { id: 2, name: 'Fake Account' }
//   ]);
//   const [feedback, setFeedback] = useState([
//     { id: 1, user: 'Ali Raza', initial: 'A', message: 'Helpful app!', date: '2025-04-21' },
//     { id: 2, user: 'Sara Khan', initial: 'S', message: 'Needs faster matching.', date: '2025-04-19' },
//   ]);
//   const [input, setInput] = useState('');
//   const [activeSection, setActiveSection] = useState('statistics');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const addToBlacklist = () => {
//     if (input.trim()) {
//       setBlacklist([...blacklist, { id: Date.now(), name: input.trim() }]);
//       setInput('');
//     }
//   };

//   const removeUser = (id) => {
//     setBlacklist(blacklist.filter(user => user.id !== id));
//   };

//   // Mock data for charts
//   const monthlyDonations = [
//     { name: 'Jan', value: 20 },
//     { name: 'Feb', value: 45 },
//     { name: 'Mar', value: 28 },
//     { name: 'Apr', value: 80 },
//     { name: 'May', value: 99 },
//     { name: 'Jun', value: 43 }
//   ];
  
//   const bloodTypes = [
//     { name: 'A+', value: 35, color: '#870D25' },
//     { name: 'O+', value: 20, color: '#D2042D' },
//     { name: 'B+', value: 25, color: '#F28B82' },
//     { name: 'AB+', value: 10, color: '#FFC107' },
//   ];
  
//   const userGrowth = [
//     { name: 'Jan', value: 50 },
//     { name: 'Feb', value: 60 },
//     { name: 'Mar', value: 70 },
//     { name: 'Apr', value: 80 },
//     { name: 'May', value: 90 },
//     { name: 'Jun', value: 110 }
//   ];

//   const renderContent = () => {
//     switch(activeSection) {
//       case 'statistics':
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <StatCard 
//                 icon={<User size={24} />} 
//                 label="Donors" 
//                 value="2,547" 
//                 color="border-red-900" 
//                 bgColor="bg-red-50"
//                 textColor="text-red-900"
//               />
//               <StatCard 
//                 icon={<div className="w-6 h-6">💧</div>} 
//                 label="Donations" 
//                 value="1,823" 
//                 color="border-red-600" 
//                 bgColor="bg-red-50"
//                 textColor="text-red-600"
//               />
//               <StatCard 
//                 icon={<div className="w-6 h-6">📋</div>} 
//                 label="Requests" 
//                 value="489" 
//                 color="border-yellow-500" 
//                 bgColor="bg-yellow-50"
//                 textColor="text-yellow-600"
//               />
//               <StatCard 
//                 icon={<div className="w-6 h-6">🏥</div>} 
//                 label="Hospitals" 
//                 value="76" 
//                 color="border-green-500" 
//                 bgColor="bg-green-50"
//                 textColor="text-green-600"
//               />
//             </div>

//             {/* Charts */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-bold mb-6 text-gray-700">Monthly Donations</h2>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={monthlyDonations}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" name="Donations" fill="#870D25" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-bold mb-6 text-gray-700">Blood Type Distribution</h2>
//                 <div className="flex flex-col md:flex-row items-center">
//                   <div className="h-64 w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={bloodTypes}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           outerRadius={80}
//                           dataKey="value"
//                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                         >
//                           {bloodTypes.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="w-full md:w-1/2">
//                     <ul className="mt-4 md:mt-0 space-y-3">
//                       {bloodTypes.map((type, index) => (
//                         <li key={index} className="flex items-center">
//                           <div 
//                             className="w-4 h-4 mr-3 rounded-sm" 
//                             style={{ backgroundColor: type.color }}
//                           ></div>
//                           <span className="text-gray-700">{type.name}: <span className="font-medium">{type.value}%</span></span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-bold mb-6 text-gray-700">User Growth</h2>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={userGrowth}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="value" name="Users" stroke="#D2042D" strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 'feedback':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">User Feedback</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {feedback.map(item => (
//                 <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex">
//                   <div className="w-12 h-12 rounded-full bg-red-900 text-white flex items-center justify-center mr-4 flex-shrink-0">
//                     {item.initial}
//                   </div>
//                   <div>
//                     <div className="font-semibold text-red-900">{item.user}</div>
//                     <div className="text-gray-700 my-1">{item.message}</div>
//                     <div className="text-xs text-gray-500">{item.date === '2025-04-21' ? '4 days ago' : '6 days ago'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'blocklist':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Blacklist Management</h2>
//             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//               <div className="flex flex-col md:flex-row mb-4">
//                 <input
//                   className="flex-1 border border-gray-300 rounded-lg p-3 mb-3 md:mb-0 md:mr-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   placeholder="Enter username or email to block"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button 
//                   onClick={addToBlacklist} 
//                   className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transition duration-200 hover:bg-red-700"
//                 >
//                   <Ban size={20} className="mr-2" />
//                   Block User
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {blacklist.map(user => (
//                 <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div className="flex items-center text-gray-800">
//                     <Ban size={20} className="mr-3 text-red-600" />
//                     <span className="font-medium">{user.name}</span>
//                   </div>
//                   <button 
//                     onClick={() => removeUser(user.id)} 
//                     className="text-red-600 p-1 hover:bg-red-50 rounded-full transition duration-200"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return <div>Select a section from the sidebar</div>;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
//       {/* Sidebar */}
//       <div 
//         className={`fixed md:relative z-30 h-full bg-gradient-to-b from-red-900 to-red-800 text-white transform transition-all duration-300 ease-in-out shadow-xl md:shadow-none
//           ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:w-16 md:translate-x-0'}
//         `}
//       >
//         <div className={`flex flex-col h-full ${!sidebarOpen && 'md:items-center'}`}>
//           {/* Logo and header */}
//           <div className={`p-4 ${!sidebarOpen && 'md:p-3'}`}>
//             <div className="flex items-center justify-between">
//               {sidebarOpen && (
//                 <h1 className="text-xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300">
//                   Blood Admin
//                 </h1>
//               )}
//               <button 
//                 onClick={toggleSidebar}
//                 className="md:hidden focus:outline-none"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
          
//           {/* Navigation links */}
//           <nav className="mt-4 flex-1">
//             <ul>
//               <li>
//                 <button 
//                   className={`w-full text-left py-3 pl-4 pr-3 flex items-center transition-colors ${
//                     activeSection === 'statistics' 
//                       ? 'bg-red-700 border-l-4 border-white' 
//                       : 'hover:bg-red-800 border-l-4 border-transparent'
//                   }`}
//                   onClick={() => setActiveSection('statistics')}
//                 >
//                   <BarChart2 size={20} className="flex-shrink-0" />
//                   {sidebarOpen && <span className="ml-3">Statistics</span>}
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   className={`w-full text-left py-3 pl-4 pr-3 flex items-center transition-colors ${
//                     activeSection === 'feedback' 
//                       ? 'bg-red-700 border-l-4 border-white' 
//                       : 'hover:bg-red-800 border-l-4 border-transparent'
//                   }`}
//                   onClick={() => setActiveSection('feedback')}
//                 >
//                   <MessageSquare size={20} className="flex-shrink-0" />
//                   {sidebarOpen && <span className="ml-3">Feedback</span>}
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   className={`w-full text-left py-3 pl-4 pr-3 flex items-center transition-colors ${
//                     activeSection === 'blocklist' 
//                       ? 'bg-red-700 border-l-4 border-white' 
//                       : 'hover:bg-red-800 border-l-4 border-transparent'
//                   }`}
//                   onClick={() => setActiveSection('blocklist')}
//                 >
//                   <Ban size={20} className="flex-shrink-0" />
//                   {sidebarOpen && <span className="ml-3">Blacklist</span>}
//                 </button>
//               </li>
//             </ul>
//           </nav>

//           {/* Bottom section with controls */}
//           <div className={`p-4 ${!sidebarOpen && 'md:p-3'}`}>
//             <div className={`flex items-center ${!sidebarOpen && 'md:justify-center'}`}>
//               <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
//                 <User size={16} />
//               </div>
//               {sidebarOpen && <span className="ml-3 font-medium">Admin User</span>}
//             </div>
//           </div>

//           {/* Toggle button for larger screens */}
//           <div className="hidden md:block absolute -right-3 top-20">
//             <button 
//               onClick={toggleSidebar}
//               className="bg-red-800 text-white rounded-full p-1 shadow-lg focus:outline-none"
//             >
//               {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Header */}
//         <header className="bg-white shadow-sm z-20">
//           <div className="flex items-center justify-between px-4 md:px-6 py-3">
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setSidebarOpen(true)}
//                 className={`text-gray-600 mr-4 md:hidden focus:outline-none ${sidebarOpen ? 'hidden' : 'block'}`}
//               >
//                 <Menu size={24} />
//               </button>
//               <div className="text-lg font-medium text-gray-700 truncate">
//                 {activeSection === 'statistics' && 'Dashboard Overview'}
//                 {activeSection === 'feedback' && 'User Feedback'}
//                 {activeSection === 'blocklist' && 'Blacklist Management'}
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
//                 <Bell size={24} />
//               </button>
//               <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 font-bold">
//                 A
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <div className="max-w-7xl mx-auto">
//             {renderContent()}
//           </div>
//         </main>
//       </div>

//       {/* Overlay for mobile when sidebar is open */}
//       {sidebarOpen && (
//         <div 
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// }

// function StatCard({ icon, label, value, color, bgColor, textColor }) {
//   return (
//     <div className={`bg-white p-4 rounded-lg shadow-md ${bgColor} border-l-4 ${color} transition-transform duration-300 transform hover:scale-105`}>
//       <div className={`flex items-center ${textColor}`}>
//         {icon}
//       </div>
//       <div className="mt-3">
//         <div className="font-bold text-xl md:text-2xl">{value}</div>
//         <div className="text-sm text-gray-600">{label}</div>
//       </div>
//     </div>
//   );
// }