import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const orderWhatsApp = (item) => {
    const text = `নমস্কার, আমি "${item.title}" অর্ডার করতে চাই। দাম: ₹${item.is_offer_active && item.offer_price ? item.offer_price : item.regular_price}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif', maxWidth: 500, margin: '0 auto', background: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: 20, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#047857', margin: 0, fontSize: 22 }}>🏪 আমাদের অনলাইন দোকান</h1>
        <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: 14 }}>সরাসরি WhatsApp-এ অর্ডার করুন</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>সকল প্রোডাক্ট</h3>
        <a href="/add" style={{ background: '#047857', color: '#fff', padding: '6px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 'bold' }}>
          + নতুন যোগ করুন
        </a>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>লোড হচ্ছে...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 16 }}>
          <p style={{ color: '#6b7280', marginBottom: 12 }}>এখনও কোনো প্রোডাক্ট যুক্ত করা হয়নি!</p>
          <a href="/add" style={{ color: '#047857', fontWeight: 'bold' }}>প্রথম প্রোডাক্ট যোগ করুন</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {products.map((item) => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 14, padding: 12, display: 'flex', gap: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <img src={item.image_url || 'https://via.placeholder.com/100'} alt={item.title} style={{ width: 85, height: 85, objectFit: 'cover', borderRadius: 10, background: '#f3f4f6' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 16 }}>{item.title}</h4>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: 17, color: '#047857' }}>
                      ₹{item.is_offer_active && item.offer_price ? item.offer_price : item.regular_price}
                    </span>
                    {item.is_offer_active && item.offer_price && (
                      <span style={{ textDecoration: 'line-through', color: '#9ca3af', marginLeft: 6, fontSize: 13 }}>
                        ₹{item.regular_price}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => orderWhatsApp(item)}
                  style={{ background: '#25D366', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 8, fontWeight: 'bold', fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 6 }}
                >
                  WhatsApp অর্ডার
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
