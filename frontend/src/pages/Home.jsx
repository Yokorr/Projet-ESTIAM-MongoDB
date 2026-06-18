import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '50%', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
          <ShoppingBag size={64} color="var(--accent)" />
        </div>
      </div>
      
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        MongoDB E-Commerce
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Une application full-stack moderne propulsée par React, Node.js et MongoDB Atlas. Conçue avec 10 collections interconnectées pour une performance optimale.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/demo" className="btn-primary" style={{ textDecoration: 'none' }}>
          Accéder au Dashboard d'Évaluation <ArrowRight size={18} />
        </Link>
      </div>

      {/* Placeholder for future product catalog */}
      <div className="glass-panel" style={{ marginTop: '5rem', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '1rem' }}>Catalogue de Produits (À venir)</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Le catalogue interagira avec la collection 'Products' via les routes CRUD standards. 
          Pour la soutenance, concentrez-vous sur le Dashboard d'évaluation qui démontre toute la puissance de MongoDB.
        </p>
      </div>
    </div>
  );
}
