import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { AppRouter } from './providers/router';

const App = () => (
  <BrowserRouter>
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
