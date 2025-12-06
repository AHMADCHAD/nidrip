import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  increment,
  deleteDoc,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import { getApp } from "@react-native-firebase/app"; // Ensure the app is initialized
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "@react-native-firebase/auth"; // Added missing imports

const db = getFirestore(getApp());
const auth = getAuth();

export const createUserDocument = async (uid, userData) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, userData);
};

export const getUserDocument = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists) return null;

  const userData = snapshot.data();
  return userData;
};

// export const updateUserDocument = async (uid, updates) => {
//   console.log("usersUpdate", uid);
//   const userRef = doc(db, "users", uid);
//   try {
//     await updateDoc(userRef, updates);
//     console.log("User document updated successfully");
//   } catch (error) {
//     console.error("Error updating user document:", error);
//     throw error;
//   }
// };

// export const deleteUserAccount = async (password) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) throw new Error("No user is currently signed in.");

//     // Re-authenticate user before deletion
//     if (password && currentUser.email) {
//       const credential = EmailAuthProvider.credential(currentUser.email, password);
//       await reauthenticateWithCredential(currentUser, credential);
//     }

//     const uid = currentUser.uid;
//     const userRef = doc(db, "users", uid);

//     // 🧩 Delete subcollections
//     const subcollections = ["aiCustomization", "mealPlan", "workoutPlan", "memory"];
//     for (const sub of subcollections) {
//       try {
//         const subColRef = collection(userRef, sub);
//         const subSnap = await getDocs(subColRef);

//         const deletePromises = subSnap.docs.map((docSnap) => deleteDoc(docSnap.ref));
//         await Promise.all(deletePromises);
//       } catch (error) {
//         console.warn(`Failed to delete subcollection ${sub}:`, error);
//         // Continue with other subcollections even if one fails
//       }
//     }

//     // 🗑️ Delete user document
//     try {
//       await deleteDoc(userRef);
//     } catch (error) {
//       console.warn("Failed to delete user document:", error);
//       // Continue with auth deletion even if Firestore deletion fails
//     }

//     // 🔒 Delete authentication account
//     try {
//       await deleteUser(currentUser);
//     } catch (error) {
//       console.warn("Failed to delete auth account:", error);
//       // Re-throw auth errors as they're more critical
//       throw error;
//     }

//     console.log("✅ User account and all related data deleted successfully");
//     return true;
//   } catch (error) {
//     console.error("❌ Error deleting user account:", error);

//     // ⚠️ Common issue: if user hasn't reauthenticated recently
//     if (error.code === "auth/requires-recent-login") {
//       const authError = new Error("Please re-login before deleting your account for security reasons.");
//       authError.code = "auth/requires-recent-login";
//       throw authError;
//     }
//     throw error;
//   }
// };

// export const addAiCustomizationToUser = async (uid, aiCustomizationData) => {
//   try {
//     // Fixed document ID (e.g., 'customization') inside 'aiCustomization' subcollection
//     const customizationDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       "customization"
//     );

//     // Add updatedAt timestamp to the customization data
//     const dataWithTimestamp = {
//       ...aiCustomizationData,
//       updatedAt: new Date().toISOString(),
//     };

//     // setDoc with merge: true will create if missing or update if exists
//     await setDoc(customizationDocRef, dataWithTimestamp, { merge: true });

//     console.log("aiCustomization data set (created/updated) successfully.");
//   } catch (error) {
//     console.error("Error setting aiCustomization data:", error);
//     throw error;
//   }
// };

// export const addQuestionnaire = async (uid, type, answers) => {
//   try {
//     const docRef = doc(db, "users", uid, "questionnaire", type);
//     const dataWithTimestamp = {
//       ...answers,
//       updatedAt: new Date().toISOString(),
//     };
//     await setDoc(docRef, dataWithTimestamp, { merge: true });
//     console.log(`${type} questionnaire answers set successfully.`);
//   } catch (error) {
//     console.error(`Error setting ${type} questionnaire answers:`, error);
//     throw error;
//   }
// };

// // Function to get aiCustomization data for a user
// export const getAiCustomizationForUser = async (uid) => {
//   try {
//     // Reference to the user document
//     const userRef = doc(db, "users", uid);

//     // Reference to the aiCustomization subcollection under the user document
//     const aiCustomizationRef = collection(userRef, "aiCustomization");

//     // Get all documents in the aiCustomization subcollection
//     const snapshot = await getDocs(aiCustomizationRef);
//     const aiCustomizationData = snapshot.docs.map((doc) => doc.data());

//     return aiCustomizationData;
//   } catch (error) {
//     console.error("Error fetching aiCustomization data:", error);
//     throw error;
//   }
// };

// export const addMealAnswersToUserAiCustomization = async (uid, mealAnswers) => {
//   try {
//     const customizationDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       "customization"
//     );

//     // This merges mealAnswers into the existing customization document
//     await setDoc(customizationDocRef, { mealAnswers }, { merge: true });

//     console.log(
//       "✅ mealAnswers added/updated successfully in aiCustomization."
//     );
//   } catch (error) {
//     console.error("❌ Error adding mealAnswers to aiCustomization:", error);
//     throw error;
//   }
// };

// export const addWorkoutAnswersToUserAiCustomization = async (
//   uid,
//   workoutAnswers
// ) => {
//   try {
//     const customizationDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       "customization"
//     );

//     // This merges mealAnswers into the existing customization document
//     await setDoc(customizationDocRef, { workoutAnswers }, { merge: true });

//     console.log(
//       "✅ mealAnswers added/updated successfully in aiCustomization."
//     );
//   } catch (error) {
//     console.error("❌ Error adding mealAnswers to aiCustomization:", error);
//     throw error;
//   }
// };

// export const addMealPlanToUser = async (uid, mealPlanData) => {
//   try {
//     const mealPlanDocRef = doc(db, "users", uid, "mealPlan", "plan");

//     const docSnap = await getDoc(mealPlanDocRef);

//     if (!docSnap.exists) {
//       // First time: optionally initialize calendarSynced if needed
//       await setDoc(mealPlanDocRef, {
//         ...mealPlanData,
//         calendarSynced: false, // optional
//         calendarSyncPrompted: false, // optional
//       });
//       console.log("✅ Meal plan created with calendarSynced = false");
//     } else {
//       // Already exists: preserve calendarSynced if true
//       const existing = docSnap.data();
//       const calendarSynced = existing?.calendarSynced === true ? true : false;
//       const calendarSyncPrompted =
//         existing?.calendarSyncPrompted === true ? true : false;
//       await setDoc(
//         mealPlanDocRef,
//         { ...mealPlanData, calendarSynced, calendarSyncPrompted },
//         { merge: true }
//       );
//       console.log("✅ Meal plan updated (calendarSynced preserved)");
//     }
//   } catch (error) {
//     console.error("❌ Error setting meal plan data:", error);
//     throw error;
//   }
// };

// export const updateMealPlanForUser = async (uid, updates) => {
//   try {
//     const mealPlanDocRef = doc(db, "users", uid, "mealPlan", "plan");

//     // updateDoc throws if document doesn't exist
//     await updateDoc(mealPlanDocRef, updates);

//     console.log("✅ mealPlan updated successfully.");
//   } catch (error) {
//     console.error("❌ Error updating mealPlan data:", error);
//     throw error;
//   }
// };

// export const addWorkoutPlanToUser = async (uid, workoutPlanData) => {
//   try {
//     const workoutPlanDocRef = doc(db, "users", uid, "workoutPlan", "plan");

//     const docSnap = await getDoc(workoutPlanDocRef);

//     if (!docSnap.exists) {
//       // First time: force calendarSynced to false
//       await setDoc(workoutPlanDocRef, {
//         ...workoutPlanData,
//         calendarSynced: false,
//         calendarSyncPrompted: false,
//       });
//       console.log("✅ Workout plan created with calendarSynced = false");
//     } else {
//       // Already exists: preserve calendarSynced if true
//       const existing = docSnap.data();
//       const calendarSynced = existing?.calendarSynced === true ? true : false;

//       const calendarSyncPrompted =
//         existing?.calendarSyncPrompted === true ? true : false;

//       await setDoc(
//         workoutPlanDocRef,
//         { ...workoutPlanData, calendarSynced, calendarSyncPrompted },
//         { merge: true }
//       );
//       console.log("✅ Workout plan updated (calendarSynced preserved)");
//     }
//   } catch (error) {
//     console.error("❌ Error setting workout plan data:", error);
//     throw error;
//   }
// };

// export const updateWorkoutPlanForUser = async (uid, updates) => {
//   try {
//     const workoutPlanDocRef = doc(db, "users", uid, "workoutPlan", "plan");

//     // updateDoc throws if document doesn't exist
//     await updateDoc(workoutPlanDocRef, updates);

//     console.log("✅ mealPlan updated successfully.");
//   } catch (error) {
//     console.error("❌ Error updating mealPlan data:", error);
//     throw error;
//   }
// };

// // Ambassador Application Functions
// export const submitAmbassadorApplication = async (
//   uid,
//   ambassadorApplication
// ) => {
//   try {
//     console.log("ambassador Application", ambassadorApplication);
//     const response = await fetch(`${API_URL}/ambassador/submitApplication`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: uid,
//         ...ambassadorApplication,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok || !data.success) {
//       throw new Error(data.error || "Failed to submit ambassador application");
//     }

//     return data; // contains { success, message, application, referral }
//   } catch (error) {
//     console.error("❌ Error submitting ambassador application:", error);
//     throw error;
//   }
// };

// export const getAmbassadorApplications = async () => {
//   try {
//     const ambassadorRef = collection(db, "ambassadorApplications");
//     const snapshot = await getDocs(ambassadorRef);

//     const applications = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     console.log("✅ Ambassador applications fetched successfully");
//     return applications;
//   } catch (error) {
//     console.error("❌ Error fetching ambassador applications:", error);
//     throw error;
//   }
// };

// export const getAmbassadorApplicationByUserId = async (uid) => {
//   try {
//     const ambassadorRef = collection(db, "ambassadorApplications");
//     const snapshot = await getDocs(ambassadorRef);

//     const userApplication = snapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .find((app) => app.userId === uid);

//     console.log("✅ User ambassador application fetched successfully");
//     return userApplication || null;
//   } catch (error) {
//     console.error("❌ Error fetching user ambassador application:", error);
//     throw error;
//   }
// };

// export const fetchCommunties = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "partnerApplications"));
//     const apps = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     console.log("✅ Partner applications fetched successfully:", apps);
//     return apps; // ✅ return so we can use it
//   } catch (error) {
//     console.error("Error fetching partner applications:", error);
//     return [];
//   }
// };

// export const getAmbassadorProfileByUserId = async (uid) => {
//   console.log("uid while getting ambassadfor");
//   const ambassadorRef = doc(db, "ambassadors", uid);
//   const snapshot = await getDoc(ambassadorRef);

//   if (!snapshot.exists) return null;

//   const ambassadorProfile = snapshot.data();

//   return ambassadorProfile;
// };

// export const getPartnerStats = async (partnerId) => {
//   try {
//     const url = `${API_URL}/partner/stats/${partnerId}`;
//     console.log("📡 Fetching partner stats...");
//     console.log("🔗 Request URL:", url); // 👈 Now you can see exactly where the request goes
//     console.log("🆔 Partner ID:", partnerId);

//     const response = await fetch(url);
//     console.log("📥 Response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("❌ Server returned error:", errorText);
//       throw new Error(`Failed to fetch partner stats: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("✅ Partner stats response:", data);
//     return data;
//   } catch (error) {
//     console.error("🔥 Error fetching partner stats:", error.message);
//     return null;
//   }
// };

// export const getPartnerMonthlyStats = async (partnerId) => {
//   if (!partnerId) {
//     console.error("❌ getPartnerMonthlyStats: partnerId is required");
//     return null;
//   }

//   try {
//     const url = `${API_URL}/partner/stats/monthly/${partnerId}`;
//     console.log("📡 Fetching partner monthly stats:", url);

//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       console.warn(
//         "⚠️ Failed to fetch partner monthly stats:",
//         errorData || response.status
//       );
//       return null;
//     }

//     const data = await response.json();
//     console.log("✅ Partner monthly stats fetched:", data);

//     // 🟢 Return just the data, same as getPartnerStats
//     return data;
//   } catch (error) {
//     console.error("❌ Network error in getPartnerMonthlyStats:", error.message);
//     return null;
//   }
// };

// /**
//  * Store user voice memory in Firebase
//  * @param {string} uid - User ID
//  * @param {Array} keywords - Array of extracted keywords
//  * @param {string} type - Type of memory (emotion, physical, work)
//  * @returns {Promise<string>} - ID of the created memory document
//  */
// export const storeUserMemory = async (uid, keywords, type) => {
//   try {
//     if (!uid || !keywords || !Array.isArray(keywords) || keywords.length === 0) {
//       console.error("❌ storeUserMemory: Invalid parameters");
//       return null;
//     }

//     // Create a new document in the memory subcollection
//     const memoryRef = doc(collection(db, "users", uid, "memory"));

//     const memoryData = {
//       id: memoryRef.id,
//       memory: keywords,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//       type: type || "general"
//     };

//     await setDoc(memoryRef, memoryData);
//     console.log("✅ User memory stored successfully:", memoryRef.id);
//     return memoryRef.id;
//   } catch (error) {
//     console.error("❌ Error storing user memory:", error);
//     return null;
//   }
// };

// /**
//  * Get user memories by type
//  * @param {string} uid - User ID
//  * @param {string} type - Type of memory to retrieve (optional)
//  * @param {number} limit - Maximum number of memories to retrieve (optional)
//  * @returns {Promise<Array>} - Array of memory documents
//  */
// export const getUserMemories = async (uid, type = null, limit = 10) => {
//   try {
//     if (!uid) {
//       console.error("❌ getUserMemories: uid is required");
//       return [];
//     }

//     const memoryCollectionRef = collection(db, "users", uid, "memory");
//     let memoryQuery;

//     if (type) {
//       memoryQuery = query(
//         memoryCollectionRef,
//         where("type", "==", type),
//         limit
//       );
//     } else {
//       memoryQuery = query(memoryCollectionRef, limit);
//     }

//     const snapshot = await getDocs(memoryQuery);
//     const memories = snapshot.docs.map(doc => doc.data());

//     console.log(`✅ Retrieved ${memories.length} user memories`);
//     return memories;
//   } catch (error) {
//     console.error("❌ Error retrieving user memories:", error);
//     return [];
//   }
// };

// /**
//  * Fetch partner profile by ID from API
//  * @param {string} partnerId - Partner's unique ID
//  * @returns {Promise<Object|null>} Partner profile data or null if not found
//  * @throws {Error} If request fails (non-404)
//  */
// export async function getPartnerProfile(partnerId) {
//   if (!partnerId) throw new Error("partnerId is required");

//   const url = `${API_URL}/partner/${partnerId}`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       if (response.status === 404) {
//         // Partner not found → return null so UI can handle it gracefully
//         return null;
//       }
//       throw new Error(
//         `Failed to fetch partner profile: ${response.statusText}`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("🔥 Error fetching partner profile:", error);
//     throw error;
//   }
// }

// // ✅ Function to get overall ambassador stats (all-time)
// export async function getAmbassadorStats(ambassadorId) {
//   if (!ambassadorId) throw new Error("ambassadorId is required");

//   try {
//     const res = await fetch(`${API_URL}/ambassador/stats/${ambassadorId}`);
//     console.log("📡 Fetching ambassador stats...", ambassadorId);
//     if (!res.ok) {
//       const errData = await res.json();
//       throw new Error(errData.error || "Failed to fetch ambassador stats");
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("❌ Error fetching ambassador stats:", error);
//     throw error;
//   }
// }

// // ✅ Function to get monthly ambassador stats (current month)
// export async function getMonthlyAmbassadorStats(ambassadorId) {
//   if (!ambassadorId) throw new Error("ambassadorId is required");

//   try {
//     const res = await fetch(
//       `${API_URL}/ambassador/stats/monthly/${ambassadorId}`
//     );
//     if (!res.ok) {
//       const errData = await res.json();
//       throw new Error(errData.error || "Failed to fetch monthly stats");
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("❌ Error fetching monthly ambassador stats:", error);
//     throw error;
//   }
// }

// /**
//  * Call backend API to mark user as referred and update ambassador stats.
//  *
//  * @param {Object} userData
//  * @param {string} referralCode
//  */
// export const handleAddReferredUser = async (userData, referralCode) => {
//   try {
//     if (!userData?.userId || !referralCode) {
//       console.warn("⚠ Missing userData or referralCode");
//       return;
//     }

//     console.log(
//       `🔗 Using referral code ${referralCode} for user ${userData.userId}`
//     );

//     const response = await fetch(
//       `${API_URL}/referralCode/use/${referralCode}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userData.userId,
//           amount: 10, // optional if available
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("❌ Failed to use referral code:", data.error || data);
//       return null;
//     }

//     console.log(`✅ Referral applied successfully`, data);
//     return data; // returns ambassadorId, commission, etc.
//   } catch (error) {
//     console.error("🔥 Error calling referral API:", error);
//     throw error;
//   }
// };

// /**
//  * Add a payout record for an ambassador
//  *
//  * @param {Object} payoutData
//  * @param {string} payoutData.userId - Ambassador userId
//  * @param {number} payoutData.amount - Commission amount
//  * @param {"pending"|"paid"} payoutData.status - Default "pending"
//  */
// export const handleAddPayout = async (payoutData) => {
//   try {
//     const payoutRef = doc(collection(db, "payouts")); // Firestore auto-ID
//     await setDoc(payoutRef, {
//       payoutId: payoutRef.id,
//       userId: payoutData.userId,
//       amount: payoutData.amount,
//       date: new Date().toISOString(),
//       status: payoutData.status || "pending",
//     });

//     console.log(`💰 Payout created for ambassador ${payoutData.userId}`);
//     return payoutRef.id; // return ID for reference
//   } catch (error) {
//     console.error("❌ Failed to create payout:", error);
//     throw error;
//   }
// };

// /**
//  * Start a trial or paid subscription.
//  * Also handles referral linking and prepares payout logic.
//  * @param {Object} userData - User profile data { firstName, lastName, email, userId }
//  * @param {"monthly"|"yearly"|null} plan - Plan type, null if trial
//  * @param {string|null} referralCode - Referral code (optional)
//  */
// export const handleSubscriptionOrTrialStart = async (
//   userData = {},
//   plan = "trial",
//   referralCode = null
// ) => {
//   try {
//     const now = new Date();
//     const trialEnd = new Date();
//     trialEnd.setDate(now.getDate() + 3);

//     let subscriptionData = {
//       subscription: {},
//     };

//     if (plan === "paid") {
//       // Paid subscription
//       subscriptionData.subscription = {
//         plan: "paid",
//         amountPaid: 0, // update when payment is confirmed
//       };
//     } else {
//       // Trial subscription
//       subscriptionData.subscription = {
//         plan: "trial",
//         startDate: now.toISOString(),
//         endDate: trialEnd.toISOString(),
//         trialUsed: true,
//         amountPaid: 0,
//         trialPeriod: 3,
//       };
//     }

//     // 1️⃣ Update user subscription in Firestore
//     await updateUserDocument(userData?.userId, subscriptionData);

//     // 2️⃣ Handle referral if exists
//     if (referralCode) {
//       referredBy = await handleAddReferredUser(userData, referralCode);
//     }

//     const updatedUserData = {
//       ...userData,
//       ...subscriptionData,
//     };

//     console.log(
//       `✅ ${plan ? "Paid subscription" : "Trial"} started for ${userData?.userId
//       }`
//     );

//     return updatedUserData;
//   } catch (error) {
//     console.error("❌ Failed to start subscription/trial:", error);
//     throw error;
//   }
// };

// /**
//  * Fetch multiple users by their Firestore doc IDs
//  * @param {string[]} userIds - Array of user IDs
//  * @returns {Promise<Array<Object>>} - Array of user objects
//  */
// export const getReferralsByIds = async (userIds = []) => {
//   if (!userIds || userIds.length === 0) return [];

//   try {
//     const users = await Promise.all(
//       userIds.map(async (uid) => {
//         const userRef = doc(db, "users", uid);
//         const snapshot = await getDoc(userRef);

//         if (!snapshot.exists) return null; // 👈 same style as getUserDocument
//         return { id: snapshot.id, ...snapshot.data() };
//       })
//     );

//     return users.filter(Boolean);
//   } catch (error) {
//     console.error("❌ Error fetching users by IDs:", error);
//     throw error;
//   }
// };

// /**
//  * Delete user memories older than 5 days
//  * @param {string} uid - User ID
//  * @returns {Promise<number>} - Number of deleted memories
//  */
// export const deleteOldMemories = async (uid) => {
//   try {
//     if (!uid) {
//       console.error("❌ deleteOldMemories: uid is required");
//       return 0;
//     }

//     const memoryCollectionRef = collection(db, "users", uid, "memory");
//     const snapshot = await getDocs(memoryCollectionRef);

//     const now = new Date();
//     const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
//     let deletedCount = 0;

//     for (const docSnapshot of snapshot.docs) {
//       const memoryData = docSnapshot.data();

//       // Check if createdAt field exists
//       if (memoryData.createdAt) {
//         // Convert Firestore timestamp to JavaScript Date
//         let createdAt;
//         if (memoryData.createdAt.toDate) {
//           // It's a Firestore Timestamp
//           createdAt = memoryData.createdAt.toDate();
//         } else if (memoryData.createdAt.seconds) {
//           // It's a Timestamp-like object with seconds/nanoseconds
//           createdAt = new Date(memoryData.createdAt.seconds * 1000);
//         } else if (typeof memoryData.createdAt === 'string') {
//           // It's an ISO string
//           createdAt = new Date(memoryData.createdAt);
//         } else {
//           // Assume it's already a Date object
//           createdAt = memoryData.createdAt;
//         }

//         // Calculate age of the memory
//         const memoryAgeInMillis = now - createdAt;

//         // If older than 5 days, delete it
//         if (memoryAgeInMillis > fiveDaysInMillis) {
//           await deleteDoc(docSnapshot.ref);
//           console.log(`✅ Deleted old memory: ${docSnapshot.id}`);
//           deletedCount++;
//         }
//       }
//     }

//     console.log(`✅ Deleted ${deletedCount} old memories`);
//     return deletedCount;
//   } catch (error) {
//     console.error("❌ Error deleting old memories:", error);
//     return 0;
//   }
// };

// // AI Questions Caching Functions
// export const storeAIQuestionsCache = async (uid, type, questions) => {
//   try {
//     const questionsDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       `${type}Questions`
//     );

//     const questionsData = {
//       questions: questions,
//       type: type,
//       updatedAt: new Date().toISOString(),
//       createdAt: new Date().toISOString(),
//     };

//     await setDoc(questionsDocRef, questionsData, { merge: true });
//     console.log(`✅ AI questions cached for ${type} type`);
//     return true;
//   } catch (error) {
//     console.error(`❌ Error caching AI questions for ${type}:`, error);
//     throw error;
//   }
// };

// export const getCachedAIQuestions = async (uid, type) => {
//   try {
//     const questionsDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       `${type}Questions`
//     );
//     const snapshot = await getDoc(questionsDocRef);

//     if (!snapshot.exists) {
//       console.log(`No cached questions found for ${type}`);
//       return null;
//     }

//     const data = snapshot.data();
//     const updatedAt = new Date(data.updatedAt);
//     const now = new Date();
//     const daysDifference = Math.floor(
//       (now - updatedAt) / (1000 * 60 * 60 * 24)
//     );

//     // Check if questions are older than 7 days
//     if (daysDifference >= 7) {
//       console.log(
//         `Cached questions for ${type} are ${daysDifference} days old, need refresh`
//       );
//       return null;
//     }

//     console.log(
//       `✅ Using cached questions for ${type} (${daysDifference} days old)`
//     );
//     return data.questions;
//   } catch (error) {
//     console.error(`❌ Error fetching cached AI questions for ${type}:`, error);
//     return null;
//   }
// };

// export const updateAIQuestionsAnswers = async (uid, type, answers) => {
//   try {
//     const questionsDocRef = doc(
//       db,
//       "users",
//       uid,
//       "aiCustomization",
//       `${type}Questions`
//     );

//     await updateDoc(questionsDocRef, {
//       answers: answers,
//       answersUpdatedAt: new Date().toISOString(),
//     });

//     console.log(`✅ AI questions answers updated for ${type}`);
//     return true;
//   } catch (error) {
//     console.error(`❌ Error updating AI questions answers for ${type}:`, error);
//     throw error;
//   }
// };

// export const handleVerifyPromoCode = async (userId, promoCode) => {
//   console.log("Verifying promo code:", promoCode, "for user:", userId);
//   try {
//     if (!userId || !promoCode) {
//       return {
//         success: false,
//         error: "User ID and promo code are required.",
//       };
//     }

//     const response = await fetch(
//       `https://stripe-backend-hazel.vercel.app/api/promocode/${userId}/verify/${promoCode}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("🔍 Promo API raw response:", response.status, response.statusText);
//     // console.log("🔍 Promo API response:",API_URL);

//     const data = await response.json();

//     console.log("response", JSON.stringify(data));

//     // 🔥 If the backend sent a non-200 status code (e.g., 404, 500)
//     if (!response.ok) {
//       return {
//         success: false,
//         error: data.error || "Failed to verify promo code",
//       };
//     }

//     // ✅ Handle backend messages
//     const message = data.message || "";
//     if (message.includes("already used")) {
//       return {
//         success: false,
//         error: message, // "Promo code already used by this user"
//       };
//     }

//     if (message.includes("not found")) {
//       return {
//         success: false,
//         error: "This promo code does not exist.",
//       };
//     }

//     if (message.includes("inactive")) {
//       return {
//         success: false,
//         error: "This promo code is inactive.",
//       };
//     }

//     if (message.includes("pending")) {
//       return {
//         success: false,
//         error: "This promo code is pending approval.",
//       };
//     }

//     if (!message.toLowerCase().includes("valid")) {
//       return {
//         success: false,
//         error: message || "This promo code cannot be used.",
//       };
//     }

//     // ✅ Valid promo → return success and discount
//     return {
//       success: true,
//       message: message,
//       discountRate: data.discountRate || 0,
//     };
//   } catch (error) {
//     console.error("❌ Error verifying promo code:", error.message);
//     return {
//       success: false,
//       error: "Network error while verifying code. Please try again later.",
//     };
//   }
// };

// export const usePromoCode = async (userId, promoCode, amount) => {
//   const API_URL = "https://stripe-backend-hazel.vercel.app/api"; // 🔁 adjust if needed

//   if (!userId || !promoCode) {
//     console.warn("❌ Missing userId or promoCode");
//     return { error: "User ID and promo code are required." };
//   }

//   const promoUrl = `${API_URL}/promoCode/use/${promoCode}`;
//   console.log("📡 Sending promo code request to:", promoUrl);

//   try {
//     const response = await fetch(promoUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId,
//         amount
//       }),
//     });

//     console.log(
//       "🔍 Promo API raw response:",
//       response.status,
//       response.statusText
//     );

//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       console.warn("⚠️ Failed to apply promo code:", data);
//       return { error: data.error || "Failed to apply promo code" };
//     }

//     console.log("✅ Promo code applied successfully:", data);

//     // Optional toast or UI update
//     // toast.success(`Promo applied! You got ${data.discountPercentage * 100}% off.`);

//     return {
//       success: true,
//       ...data,
//     };
//   } catch (err) {
//     console.error("❌ Network request failed:", err.message);
//     return { error: err.message || "Network error. Please try again." };
//   }
// };

// // Scheduled Workouts Functions
// /**
//  * Add a scheduled workout to user's scheduledWorkouts subcollection
//  * @param {string} uid - User ID
//  * @param {Object} scheduledWorkoutData - Workout data to store
//  * @returns {Promise<string>} - ID of the created document
//  */
// export const addScheduledWorkout = async (uid, scheduledWorkoutData) => {
//   try {
//     const scheduledWorkoutsRef = collection(db, "users", uid, "workouts");

//     const workoutData = {
//       ...scheduledWorkoutData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     const docRef = await addDoc(scheduledWorkoutsRef, workoutData);

//     console.log("✅ Scheduled workout added with ID:", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("❌ Error adding scheduled workout:", error);
//     throw error;
//   }
// };

// /**
//  * Get all scheduled workouts for a user
//  * @param {string} uid - User ID
//  * @returns {Promise<Array>} - Array of scheduled workouts
//  */
// export const getScheduledWorkouts = async (uid) => {
//   try {
//     const scheduledWorkoutsRef = collection(db, "users", uid, "workouts");
//     const querySnapshot = await getDocs(scheduledWorkoutsRef);

//     const scheduledWorkouts = [];
//     querySnapshot.forEach((doc) => {
//       scheduledWorkouts.push({
//         id: doc.id,
//         ...doc.data()
//       });
//     });

//     // Sort by date (newest first)
//     scheduledWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));

//     console.log(`✅ Fetched ${scheduledWorkouts.length} scheduled workouts`);
//     return scheduledWorkouts;
//   } catch (error) {
//     console.error("❌ Error fetching scheduled workouts:", error);
//     throw error;
//   }
// };

// /**
//  * Update a scheduled workout
//  * @param {string} uid - User ID
//  * @param {string} workoutId - Workout document ID
//  * @param {Object} updates - Fields to update
//  * @returns {Promise<void>}
//  */
// export const updateScheduledWorkout = async (uid, workoutId, updates) => {
//   try {
//     const workoutRef = doc(db, "users", uid, "scheduledWorkouts", workoutId);

//     const updateData = {
//       ...updates,
//       updatedAt: new Date().toISOString(),
//     };

//     await updateDoc(workoutRef, updateData);

//     console.log("✅ Scheduled workout updated successfully");
//   } catch (error) {
//     console.error("❌ Error updating scheduled workout:", error);
//     throw error;
//   }
// };

// /**
//  * Delete a scheduled workout
//  * @param {string} uid - User ID
//  * @param {string} workoutId - Workout document ID
//  * @returns {Promise<void>}
//  */
// export const deleteScheduledWorkout = async (uid, workoutId) => {
//   try {
//     const workoutRef = doc(db, "users", uid, "scheduledWorkouts", workoutId);
//     await deleteDoc(workoutRef);

//     console.log("✅ Scheduled workout deleted successfully");
//   } catch (error) {
//     console.error("❌ Error deleting scheduled workout:", error);
//     throw error;
//   }
// };
