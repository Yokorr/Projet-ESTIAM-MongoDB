import React, { useState } from 'react';
import axios from 'axios';
import { Play, Database, CheckCircle, Code } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/demo';

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runQuery = async (endpoint) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.get(`${API_URL}/${endpoint}`);
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Évaluation MongoDB Atlas</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Ce tableau de bord permet d'exécuter et de visualiser en temps réel les requêtes MongoDB avancées demandées dans le cahier des charges.
        </p>
      </div>

      <div className="grid">
        {/* Card 1: Lookup */}
        <div className="glass-panel demo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Database size={24} color="var(--accent)" />
            <h3>Jointures ($lookup)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Récupère les produits, y associe leurs avis clients et les informations de leur fournisseur.
          </p>
          <button className="btn-primary" onClick={() => runQuery('lookup')} disabled={loading}>
            <Play size={16} /> Exécuter la Requête
          </button>
        </div>

        {/* Card 2: Advanced Filters */}
        <div className="glass-panel demo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CheckCircle size={24} color="var(--accent)" />
            <h3>Filtres, Tri & Projection</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Recherche avec $gt et $lte, tri par prix décroissant et sélection de champs spécifiques.
          </p>
          <button className="btn-primary" onClick={() => runQuery('advanced-query')} disabled={loading}>
            <Play size={16} /> Exécuter la Requête
          </button>
        </div>

        {/* Card 3: Aggregation */}
        <div className="glass-panel demo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Code size={24} color="var(--accent)" />
            <h3>Agrégation ($group)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Regroupe les commandes par statut, calcule le chiffre d'affaires total et la moyenne.
          </p>
          <button className="btn-primary" onClick={() => runQuery('aggregate-group')} disabled={loading}>
            <Play size={16} /> Exécuter la Requête
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="glass-panel" style={{ marginTop: '3rem', animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>{result.title}</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Requête Mongoose / MongoDB :</h4>
            <pre>{result.query}</pre>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Résultat JSON :</h4>
            <pre style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
