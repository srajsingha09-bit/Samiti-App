import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('clothing');
  const [regularPrice, setRegularPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isOfferActive, setIsOfferActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { data: shops } = await supabase.from('shops').select('id').limit(1);
    let shopId = shops && shops[0] ? shops[0].id : null;

    if (!shopId) {
      const { data: newShop } = await supabase.from('shops').insert([{
        shop_name: 'আমার দোকান',
        slug: 'my-shop-' + Date.now(),
        category: category,
        owner_name: 'মালিক',
        whatsapp_number: '919876543210'
      }]).select();
      shopId = newShop && newShop[0] ? newShop[0].id : null;
    }

    const { error } = await supabase.from('products').insert([{
      shop_id: shopId,
      title,
      category,
      regular_price: parseFloat(regularPrice),
      offer_price: offerPrice ? parseFloat(offerPrice) : null,
      is_offer_active: isOfferActive,
      image_url: imageUrl || 'https://via.placeholder.com/300'
    }]);

    setSaving(false);
    if (error) {
      alert('ভুল হয়েছে: ' + error.message);
    } else {
      alert('প্রোডাক্ট সফলভাবে যোগ হয়েছে!');
      window.location.href = '/';
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: '20px auto', padding: 16, fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', padding: 20, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#1f2937' }}>নতুন প্রোডাক্ট যোগ করুন</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: '#4b5563', display: 'block', marginBottom: 4 }}>ব্যবসার ধরন</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>
              <option value="clothing">পোশাক (Clothing)</option>
              <option value="grocery">মুদিখানা (Grocery)</option>
              <option value="jewellery">জুয়েলারি (Jewellery)</option>
              <option value="shoes">জুতো (Shoes)</option>
              <option value="parlour">পার্লার (Parlour)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: '#4b5563', display: 'block', marginBottom: 4 }}>প্রোডাক্টের নাম</label>
            <input type="text" placeholder="যেমন: সুতির শাড়ি" required value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 13, color: '#4b5563', display: 'block', marginBottom: 4 }}>আসল দাম (₹)</label>
              <input type="number" placeholder="500" required value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#4b5563', display: 'block', marginBottom: 4 }}>অফার দাম (₹)</label>
              <input type="number" placeholder="400" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ background: '#fef3c7', padding: 10, borderRadius: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400e', fontWeight: 'bold', fontSize: 14 }}>
              <input type="checkbox" checked={isOfferActive} onChange={(e) => setIsOfferActive(e.target.checked)} /> 
              অফার চালু রাখুন
            </label>
          </div>

          <div>
            <label style={{ fontSize: 13, color: '#4b5563', display: 'block', marginBottom: 4 }}>ছবির লিঙ্ক (URL)</label>
            <input type="text" placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" disabled={saving} style={{ background: '#047857', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
            {saving ? 'সেভ হচ্ছে...' : 'প্রোডাক্ট সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
