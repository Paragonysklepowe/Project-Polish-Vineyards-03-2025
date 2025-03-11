import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Vineyard Explorer Poland - Travel Guide" },
    { name: "description", content: "Travel tips and guides for visiting Polish vineyards" },
  ];
};

type GuideSection = {
  id: string;
  title: string;
  content: string;
  items?: string[];
};

export async function loader() {
  const guideSections: GuideSection[] = [
    {
      id: "tips",
      title: "Vineyard Visit Tips",
      content: "Essential information for planning your vineyard visits",
      items: [
        "Best time to visit: Late spring to early fall (May-September)",
        "Dress code: Smart casual, comfortable shoes",
        "Book tours in advance, especially during peak season",
        "Consider hiring a local guide or driver",
        "Check vineyard websites for special events"
      ]
    },
    {
      id: "transport",
      title: "Transportation Options",
      content: "Getting around Polish wine regions",
      items: [
        "Car rental: Most flexible option for vineyard hopping",
        "Public transport: Limited but available between major towns",
        "Private tours: Many operators offer wine tour packages",
        "Bicycle: Some regions have dedicated wine cycling routes",
        "Local taxis: Available but book in advance for rural areas"
      ]
    },
    {
      id: "attractions",
      title: "Nearby Attractions",
      content: "Explore beyond the vineyards",
      items: [
        "Historic castles and palaces",
        "Local restaurants with regional cuisine",
        "Artisan food producers (cheese, honey, etc.)",
        "Nature reserves and hiking trails",
        "Cultural festivals and events"
      ]
    },
    {
      id: "itineraries",
      title: "Suggested Itineraries",
      content: "Sample wine tour routes",
      items: [
        "Weekend Getaway: 2-3 vineyards with local accommodation",
        "5-Day Tour: Explore multiple wine regions with cultural stops",
        "Luxury Experience: Private tours with gourmet dining",
        "Family-Friendly: Vineyards with activities for all ages",
        "Seasonal Specials: Harvest festivals and winter wine tastings"
      ]
    }
  ];

  return json({ guideSections });
}

export default function TravelGuide() {
  const { guideSections } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Travel Guide</h1>
      
      <div className="space-y-8">
        {guideSections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{section.content}</p>
            {section.items && (
              <ul className="list-disc pl-5 space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-200">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
