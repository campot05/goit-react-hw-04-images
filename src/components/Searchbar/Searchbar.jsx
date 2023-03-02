import { useState } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handlechange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return alert('Введите слово для поиска');
    }

    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <CiSearch className={css.icon} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handlechange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
