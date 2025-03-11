import { Link } from '@remix-run/react';
import { VineyardMap } from '~/utils/mapUtils';

// ... (previous imports and code)

// Update the onMarkerClick handler in the VineyardMap component
<VineyardMap
  vineyards={filteredVineyards}
  onMarkerClick={(vineyard) => {
    // Navigate to vineyard profile
    window.location.href = `/vineyards/${vineyard.id}`;
  }}
/>
