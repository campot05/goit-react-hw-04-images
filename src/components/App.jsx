import { useState } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import '../index.css';
export function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} />
    </div>
  );
}
