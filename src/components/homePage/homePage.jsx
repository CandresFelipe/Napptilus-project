import { ListView } from './listView.jsx';
import { SearchBar } from './searchBar.jsx';

export function HomePage() {
  return (
    <div>
      <SearchBar />
      <ListView />
    </div>
  );
}
