import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  const db = getFirestore();
  const userDoc = await getDoc(doc(db, "users", user.uid));
  
  if (!userDoc.exists()) {
    return json({ error: "User not found" }, { status: 404 });
  }

  return json({
    user: {
      email: user.email,
      name: user.displayName,
      ...userDoc.data()
    }
  });
}

export async function action({ request }) {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  const db = getFirestore();
  
  if (_action === "update_favorites") {
    await updateDoc(doc(db, "users", user.uid), {
      favorites: values
    });
    return json({ success: true });
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

export default function Profile() {
  const { user, error } = useLoaderData();

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {/* Favorites */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4">Favorites</h2>
          
          {/* Favorites Sections */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Favorite Vineyards</h3>
              {user.favorites?.vineyards?.length > 0 ? (
                <ul className="space-y-2">
                  {user.favorites.vineyards.map((vineyard) => (
                    <li key={vineyard.id}>{vineyard.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No favorite vineyards yet</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Favorite Events</h3>
              {user.favorites?.events?.length > 0 ? (
                <ul className="space-y-2">
                  {user.favorites.events.map((event) => (
                    <li key={event.id}>{event.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No favorite events yet</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Favorite Itineraries</h3>
              {user.favorites?.itineraries?.length > 0 ? (
                <ul className="space-y-2">
                  {user.favorites.itineraries.map((itinerary) => (
                    <li key={itinerary.id}>{itinerary.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No favorite itineraries yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
