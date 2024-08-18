import { auth, db, provider } from "@/configs";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const login = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userRes = await fetch(`/api/github/user/${user.providerData[0].uid}`);
    const data = await userRes.json();

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        github_uid: user.providerData[0].uid,
        username: data.login,
        name: user.displayName,
        email: user.email,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login with Github");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error("Failed to logout");
  }
};
