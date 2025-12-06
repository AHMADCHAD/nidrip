import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createUserDocument, getUserDocument } from "./FirestoreService";

// Configure Google Sign-In (call once)
GoogleSignin.configure({
  webClientId:
    "1054602644195-62cej7kmqgqcr8pd42kjbctlvdhvnufb.apps.googleusercontent.com",
});

export const signUpWithEmail = async (email, password, name) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = userCredential;
    // Update the user's profile with their display name
    await user.updateProfile({ displayName: name });
    // Create a corresponding document in Firestore
    await createUserDocument(user.uid, { email: user.email, name: name });
    // Reload the user to get the updated profile with displayName
    await user.reload();
    return { user: auth().currentUser };
  } catch (error) {
    return { error };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};

export const signInWithGoogle = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    const { user } = userCredential;

    // Check if it's a new user
    const userDoc = await getUserDocument(user.uid);
    if (!userDoc.exists) {
      // New user, create a document
      await createUserDocument(user.uid, {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });
    }

    return { user };
  } catch (error) {
    return { error };
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};
