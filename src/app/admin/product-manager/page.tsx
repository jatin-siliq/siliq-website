"use client";
import { useState, useEffect } from "react";
import { products, Product } from "@/lib/data";
import Image from "next/image";
import { Package, Users, ShoppingBag, TrendingUp, Menu, X, Search, ChevronDown, BarChart3, Save, Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "dashboard" | "products" | "customers" | "orders";
type CustomerData = { name: string; email: string; phone?: string; orders: number; totalSpent: number; couponsUsed?: string[]; addresses: unknown[]; createdAt?: string };

const API = process.env.NEXT_PUBLIC_API_URL || "https://siliq-api.onrender.com";

export default function ProductManagerPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [orders, setOrders] = useState<{ id: string; date: string; total: number; items: number; status: string; customer?: { name: string; email: string } }[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [custRes, ordRes] = await Promise.all([
        fetch(`${API}/api/customers`, { headers: { "Authorization": "Basic " + btoa("siliq:changeme123") } }).then(r => r.ok ? r.json() : { customers: [] }),
        fetch(`${API}/api/orders`, { headers: { "Authorization": "Basic " + btoa("siliq:changeme123") } }).then(r => r.ok ? r.json() : { orders: [] }),
      ]);
      setCustomers(custRes.customers || []);
      setOrders(ordRes.orders || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];
  const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const totalOrders = orders.length || customers.reduce((sum, c) => sum + (c.orders || 0), 0);

  const menuItems: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h1 className="text-sm font-semibold tracking-wide uppercase">SILIQ Manager</h1>
        <button onClick={loadData} className="p-2 -mr-2" aria-label="Refresh">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </header>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setMenuOpen(false)} />
            <motion.nav initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 shadow-xl flex flex-col">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wider uppercase">SILIQ Admin</span>
                <button onClick={() => setMenuOpen(false)} className="p-1"><X size={18} /></button>
              </div>
              <div className="flex-1 py-4">
                {menuItems.map(item => (
                  <button key={item.id} onClick={() => { setTab(item.id); setMenuOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm transition-colors ${tab === item.id ? "bg-gray-100 text-black font-medium" : "text-gray-600"}`}>
                    <item.icon size={18} strokeWidth={1.5} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex flex-col w-[240px] min-h-[calc(100vh-57px)] bg-white border-r border-gray-200 py-6">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${tab === item.id ? "bg-gray-100 text-black font-medium border-r-2 border-black" : "text-gray-600 hover:bg-gray-50"}`}>
              <item.icon size={18} strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl">
          {/* Mobile Tab Bar */}
          <div className="flex gap-1 overflow-x-auto pb-4 mb-4 lg:hidden" style={{ scrollbarWidth: "none" }}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)} className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-colors ${tab === item.id ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Dashboard */}
          {tab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold mb-5">Dashboard</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600", target: "products" as Tab },
                  { label: "Customers", value: customers.length, icon: Users, color: "bg-green-50 text-green-600", target: "customers" as Tab },
                  { label: "Orders", value: totalOrders, icon: ShoppingBag, color: "bg-purple-50 text-purple-600", target: "orders" as Tab },
                  { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-amber-50 text-amber-600", target: "orders" as Tab },
                ].map(stat => (
                  <button key={stat.label} onClick={() => setTab(stat.target)} className="bg-white rounded-xl p-4 border border-gray-100 text-left hover:border-gray-300 active:scale-[0.97] transition-all">
                    <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                      <stat.icon size={16} />
                    </div>
                    <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-sm font-medium mb-3">Low Stock Alert</h3>
                {products.filter(p => (p.stock || 0) <= 2).slice(0, 5).map(p => (
                  <div key={p.id} onClick={() => { setTab("products"); setExpandedProduct(p.id); }} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="36px" />
                      </div>
                      <span className="text-xs truncate">{p.name}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${(p.stock || 0) <= 1 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                      {p.stock || 0} left
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Products */}
          {tab === "products" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <span className="text-xs text-gray-500">{filteredProducts.length} items</span>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-400" />
                </div>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2.5 text-xs bg-white border border-gray-200 rounded-lg outline-none">
                  <option value="all">All</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)} className="w-full flex items-center gap-3 p-3 text-left cursor-pointer active:bg-gray-50">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-medium">₹{product.price.toLocaleString("en-IN")}</span>
                          {product.originalPrice && <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${product.inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                          {product.inStock ? `${product.stock || "∞"}` : "Out"}
                        </span>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${expandedProduct === product.id ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedProduct === product.id && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-3 pb-3 pt-1 border-t border-gray-50" onClick={e => e.stopPropagation()}>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-gray-50 rounded-lg p-2.5"><span className="text-gray-500">Category</span><p className="font-medium mt-0.5 capitalize">{product.category}</p></div>
                              <div className="bg-gray-50 rounded-lg p-2.5"><span className="text-gray-500">Rating</span><p className="font-medium mt-0.5">⭐ {product.rating}</p></div>
                              <div className="bg-gray-50 rounded-lg p-2.5"><span className="text-gray-500">Images</span><p className="font-medium mt-0.5">{product.images.length} photos</p></div>
                              <div className="bg-gray-50 rounded-lg p-2.5"><span className="text-gray-500">Stock</span><p className="font-medium mt-0.5">{product.stock || "∞"} units</p></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Customers */}
          {tab === "customers" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Customers</h2>
                <span className="text-xs text-gray-500">{customers.length} total</span>
              </div>
              {customers.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <Users size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">{loading ? "Loading..." : "No customers yet"}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customers.map((customer, i) => (
                    <div key={customer.email || i} className="bg-white rounded-xl border border-gray-100 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium uppercase flex-shrink-0">
                          {customer.name?.[0] || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{customer.name || "No name"}</p>
                          <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{customer.orders || 0} orders</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">₹{(customer.totalSpent || 0).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                        {customer.createdAt && (
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Clock size={10} />
                              {new Date(customer.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <ShoppingBag size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">{loading ? "Loading..." : "No orders yet"}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-medium">{order.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${order.status === "Processing" ? "bg-amber-50 text-amber-600" : order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">{order.customer?.name || "Customer"}</p>
                          <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString("en-IN")}</p>
                        </div>
                        <p className="text-sm font-semibold">₹{order.total?.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
