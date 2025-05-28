import React from 'react';
import Header from './components/Header';
import ImageCaptioning from './components/ImageCaptioning';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ImageCaptioning />
      </main>
      <Footer />
    </div>
  );
}

export default App;