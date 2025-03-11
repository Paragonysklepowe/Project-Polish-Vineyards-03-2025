export const isPremiumUser = async (userId: string) => {
  const db = getFirestore();
  const subscriptionDoc = await getDoc(doc(db, "subscriptions", userId));
  
  if (!subscriptionDoc.exists()) return false;
  
  const subscription = subscriptionDoc.data();
  return subscription.status === 'premium' && 
    (!subscription.expiresAt || new Date(subscription.expiresAt) > new Date());
};

export const checkPremiumFeature = async (feature: string, userId: string) => {
  const isPremium = await isPremiumUser(userId);
  
  if (!isPremium) {
    throw new Error(`Premium feature "${feature}" requires subscription`);
  }
};
