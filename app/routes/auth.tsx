import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function action({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  try {
    if (_action === "email_login") {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      return json({ success: true });
    }

    if (_action === "google_login") {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Create user profile if new user
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        favorites: {
          vineyards: [],
          events: [],
          itineraries: []
        }
      }, { merge: true });
      return json({ success: true });
    }

    if (_action === "facebook_login") {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Create user profile if new user
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        favorites: {
          vineyards: [],
          events: [],
          itineraries: []
        }
      }, { merge: true });
      return json({ success: true });
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}

export default function Auth() {
  const actionData = useActionData();

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Login / Register</h2>
      
      {/* Email Login */}
      <Form method="post" className="mb-6">
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            name="_action"
            value="email_login"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login with Email
          </button>
        </div>
      </Form>

      {/* Social Login Buttons */}
      <div className="space-y-4">
        <Form method="post">
          <button
            type="submit"
            name="_action"
            value="google_login"
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            Continue with Google
          </button>
        </Form>

        <Form method="post">
          <button
            type="submit"
            name="_action"
            value="facebook_login"
            className="w-full bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
            Continue with Facebook
          </button>
        </Form>
      </div>

      {actionData?.error && (
        <div className="mt-4 text-red-600">{actionData.error}</div>
      )}
    </div>
  );
}
