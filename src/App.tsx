import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 py-10">
      <div className="max-w-lg mx-auto">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
