import { useState } from 'react';
import { Link, useParams } from '@remix-run/react';
import { Tab } from '@headlessui/react';

const tabs = [
  { name: 'Details', href: 'details' },
  { name: 'Wines', href: 'wines' },
  { name: 'Tours', href: 'tours' },
  { name: 'Reviews', href: 'reviews' }
];

export default function VineyardProfile() {
  const { vineyardId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  // TODO: Fetch vineyard data based on vineyardId
  const vineyard = {
    id: vineyardId,
    name: 'Vineyard A',
    image: '/vineyard-header.jpg',
    description: 'A beautiful vineyard in Małopolska region',
    wines: [],
    tours: [],
    reviews: []
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Image */}
      <div className="relative h-96">
        <img
          src={vineyard.image}
          alt={vineyard.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold">{vineyard.name}</h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 z-10">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-8 px-8 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `py-4 text-sm font-medium border-b-2 transition-colors ${
                    selected
                      ? 'border-gold-500 text-gold-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <Tab.Panels>
          {/* Details Tab */}
          <Tab.Panel>
            <div className="prose dark:prose-invert">
              <h2>About {vineyard.name}</h2>
              <p>{vineyard.description}</p>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <h3>Contact Information</h3>
                  <p>Phone: +48 123 456 789</p>
                  <p>Email: info@vineyard.com</p>
                </div>
                <div>
                  <h3>Opening Hours</h3>
                  <p>Monday - Friday: 9:00 - 18:00</p>
                  <p>Weekends: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Wines Tab */}
          <Tab.Panel>
            <div className="prose dark:prose-invert">
              <h2>Our Wines</h2>
              <div className="mt-8 space-y-4">
                {vineyard.wines.length > 0 ? (
                  vineyard.wines.map((wine) => (
                    <div key={wine.id} className="p-4 border rounded-lg">
                      <h3>{wine.name}</h3>
                      <p>{wine.description}</p>
                    </div>
                  ))
                ) : (
                  <p>No wines available</p>
                )}
              </div>
            </div>
          </Tab.Panel>

          {/* Tours Tab */}
          <Tab.Panel>
            <div className="prose dark:prose-invert">
              <h2>Available Tours</h2>
              <div className="mt-8 space-y-4">
                {vineyard.tours.length > 0 ? (
                  vineyard.tours.map((tour) => (
                    <div key={tour.id} className="p-4 border rounded-lg">
                      <h3>{tour.name}</h3>
                      <p>{tour.description}</p>
                    </div>
                  ))
                ) : (
                  <p>No tours available</p>
                )}
              </div>
            </div>
          </Tab.Panel>

          {/* Reviews Tab */}
          <Tab.Panel>
            <div className="prose dark:prose-invert">
              <h2>Customer Reviews</h2>
              <div className="mt-8 space-y-4">
                {vineyard.reviews.length > 0 ? (
                  vineyard.reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <h3>{review.author}</h3>
                      <p>{review.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </div>
  );
}
