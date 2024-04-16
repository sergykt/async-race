import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App = () => (
  <BrowserRouter>
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
