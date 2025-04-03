import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './routes/Routing';
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from './context/FavoriteProvider';


function App() {

  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  )
}

export default App
