import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

type Subscription = {
  status: 'free' | 'premium';
  expiresAt?: Date;
};

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  const db = getFirestore();
  const subscriptionDoc = await getDoc(doc(db, "subscriptions", user.uid));
  
  const subscription: Subscription = subscriptionDoc.exists() 
    ? subscriptionDoc.data() as Subscription
    : { status: 'free' };

  return json({ subscription });
}

export async function action({ request }) {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  const db = getFirestore();
  
  if (_action === "upgrade_to_premium") {
    // TODO: Integrate with payment gateway
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    
    await setDoc(doc(db, "subscriptions", user.uid), {
      status: 'premium',
      expiresAt
    });

    return json({ success: true });
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

export default function Subscription() {
  const { subscription } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Subscription</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Free Plan</h2>
          <ul className="space-y-2 mb-6">
            <li>Basic map features</li>
            <li>Limited vineyard information</li>
            <li>Basic search functionality</li>
          </ul>
          <div className="text-2xl font-bold mb-4">Free</div>
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            Your current plan
          </div>
        </div>

        {/* Premium Plan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gold-500">
          <h2 className="text-xl font-bold mb-4">Premium Plan</h2>
          <ul className="space-y-2 mb-6">
            <li>Advanced map features</li>
            <li>Offline maps and data</li>
            <li>Detailed vineyard information</li>
            <li>Advanced search and filters</li>
            <li>Exclusive content and tours</li>
          </ul>
          <div className="text-2xl font-bold mb-4">$4.99/month</div>
          <Form method="post">
            <button
              type="submit"
              name="_action"
              value="upgrade_to_premium"
              className="w-full bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600"
            >
              Upgrade to Premium
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
