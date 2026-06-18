import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, ArrowRight, Tag, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Appel dynamique vers l'API Backend lors du chargement de la page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem 0' }}>
      
      {/* Header Héro */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          MongoDB Store
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Explorez notre catalogue généré dynamiquement depuis notre cluster MongoDB Atlas.
        </p>
        <Link to="/demo" className="btn-primary" style={{ textDecoration: 'none' }}>
          Voir le Dashboard d'Évaluation MongoDB <ArrowRight size={18} />
        </Link>
      </div>

      {/* Catalogue Dynamique */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <ShoppingBag size={28} color="var(--accent)" />
        <h2>Nos Produits Récents</h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid var(--glass-border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Chargement du catalogue depuis Atlas...</p>
        </div>
      ) : (
        <div className="grid">
          {products.map(product => (
            <div key={product._id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid var(--glass-border)' }} 
              />
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{product.name}</h3>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)' }}>{product.price}€</span>
                </div>
                
                {product.categoryId && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <Tag size={14} /> {product.categoryId.name}
                  </div>
                )}
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.85rem', color: product.stock > 0 ? '#4ade80' : '#f87171' }}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    <ShoppingCart size={16} /> Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
