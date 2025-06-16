'use client';
import { useState } from 'react';

const data = require('../public/avg_price_data.json');

export default function Home() {
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [processor, setProcessor] = useState('');
  const [grade, setGrade] = useState('');
  const [result, setResult] = useState(null);

  const categories = [...new Set(data.map(row => row['Asset Category']))];
  const makes = [...new Set(data.map(row => row['Make']).filter(m => category ? data.find(d => d['Make'] === m && d['Asset Category'] === category) : true))];
  const models = [...new Set(data.filter(row => row['Make'] === make && row['Asset Category'] === category).map(row => row['Model']))];
  const processors = [...new Set(data.filter(row => row['Make'] === make && row['Model'] === model).map(row => row['Processor Model']))];
  const grades = [...new Set(data.filter(row => row['Make'] === make && row['Model'] === model && row['Processor Model'] === processor).map(row => row['Grade']))];

  const handleSubmit = () => {
    const match = data.find(
      row =>
        row['Asset Category'] === category &&
        row['Make'] === make &&
        row['Model'] === model &&
        row['Processor Model'] === processor &&
        row['Grade'] === grade
    );
    setResult(match?.['Sales Price'] ? `$${match['Sales Price'].toFixed(2)}` : 'No data available');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', color: '#23714D', fontWeight: 'bold', textAlign: 'center' }}>
        Mender ASP Estimator
      </h1>

      <div style={{ marginTop: '2rem' }}>
        <label>Asset Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select...</option>
          {categories.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Make</label>
        <select value={make} onChange={e => setMake(e.target.value)}>
          <option value="">Select...</option>
          {makes.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Model</label>
        <select value={model} onChange={e => setModel(e.target.value)}>
          <option value="">Select...</option>
          {models.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Processor</label>
        <select value={processor} onChange={e => setProcessor(e.target.value)}>
          <option value="">Select...</option>
          {processors.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Grade</label>
        <select value={grade} onChange={e => setGrade(e.target.value)}>
          <option value="">Select...</option>
          {grades.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#23714D', color: 'white', border: 'none' }}>
        Get Average Sales Price
      </button>

      {result && (
        <div style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', color: '#1A4D2E' }}>
          {result}
        </div>
      )}
    </div>
  );
}
