import React from 'react';
import { Header } from './components/Header';
import { MainCard } from './components/MainCard';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Header />
          <ProtectedRoute>
            <MainCard />
          </ProtectedRoute>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;