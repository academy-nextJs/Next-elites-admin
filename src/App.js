import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ** Router Import
import Router from "./router/Router";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
