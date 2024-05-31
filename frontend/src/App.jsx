import { AuthProvider } from "./Context/AuthState.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Route.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Provider>
  );
};

export default App;
