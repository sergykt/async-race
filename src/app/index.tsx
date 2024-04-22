import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { StoreProvider } from './providers/StoreProvider';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <QueryClientProvider>
        <AppRouter />
      </QueryClientProvider>
    </StoreProvider>
  </BrowserRouter>
);

export default App;
