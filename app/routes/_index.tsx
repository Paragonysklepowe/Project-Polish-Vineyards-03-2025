// ... existing imports ...
import { Link } from '@remix-run/react';

export default function Index() {
  // ... existing code ...

  return (
    <div className="flex flex-col min-h-screen">
      {/* ... existing content ... */}

      {/* Add feedback link in footer */}
      <footer className="bg-white dark:bg-gray-800 p-4 border-t">
        <div className="container mx-auto text-center">
          <Link 
            to="/feedback" 
            className="text-wine-500 hover:text-wine-600"
          >
            Send Feedback
          </Link>
        </div>
      </footer>
    </div>
  );
}
