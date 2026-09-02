import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/app.routes.jsx';


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
