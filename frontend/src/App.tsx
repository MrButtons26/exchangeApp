import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,

    children: [{}],
  },
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
