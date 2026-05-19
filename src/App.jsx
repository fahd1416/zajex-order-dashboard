import React, { useState, useEffect } from 'react';
import { AnalyticsCards } from './components/AnalyticsCards';
import { OrdersTable } from './components/OrdersTable';
import { OrderDrawer } from './components/OrderDrawer';
import { supabase } from './lib/supabase';
import { Package, Loader2 } from 'lucide-react';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // 1. Initial Fetch
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Supabase fetch error:", error);
          setOrders([]);
        } else {
          setOrders(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // 2. Realtime Subscription
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload);
        
        if (payload.eventType === 'INSERT') {
          setOrders(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setOrders(prev => prev.map(order => order.id === payload.new.id ? payload.new : order));
        } else if (payload.eventType === 'DELETE') {
          setOrders(prev => prev.filter(order => order.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8 max-w-[1400px]">
        <header className="flex items-center gap-4 mb-8">
          <div className="bg-white p-2 rounded-lg shadow-sm border flex items-center justify-center">
            {/* The user needs to save the logo image as public/logo.png */}
            <img src="/logo.png" alt="ZAJEX" className="h-10 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <Package size={28} className="text-primary hidden" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ZAJEX Live Orders</h1>
            <p className="text-muted-foreground">Real-time logistics management</p>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <main className="space-y-4">
            <AnalyticsCards orders={orders} />
            <OrdersTable orders={orders} onRowClick={handleRowClick} />
          </main>
        )}

        <OrderDrawer 
          order={selectedOrder} 
          isOpen={isDrawerOpen} 
          onClose={closeDrawer} 
        />
      </div>
    </div>
  );
}

export default App;
