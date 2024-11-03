import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MarketPage from "./pages/MarketPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [],
  },
  {
    path:"/trade/:id",
    element:<MarketPage/>
  }
]);

function App() {
  return (
    <> <QueryClientProvider client={new QueryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
