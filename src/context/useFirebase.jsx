import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "@/Firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);
const storage = getStorage();

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // Register user and set up listeners when currentUser changes
  useEffect(() => {
    if (!currentUser?._id) return;

    // Register in Firebase
    const registerUser = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser._id);
        await setDoc(
          userDocRef,
          {
            uid: currentUser._id,
            username:
              currentUser.username || currentUser.name || currentUser.email,
            email: currentUser.email,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
        await setUserOnlineStatus(currentUser._id, true);
      } catch (error) {
        console.error("Error registering user in Firebase:", error);
      }
    };

    // Set up beforeunload listener
    const handleBeforeUnload = () =>
      setUserOnlineStatus(currentUser._id, false);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set up users listener
    const usersRef = collection(db, "users");
    const usersUnsubscribe = onSnapshot(query(usersRef), (snapshot) => {
      const usersList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser._id);
      setUsers(usersList);
    });

    // Set up status listener
    const statusRef = collection(db, "status");
    const statusUnsubscribe = onSnapshot(statusRef, (snapshot) => {
      const statusData = {};
      snapshot.docs.forEach((doc) => {
        statusData[doc.id] = doc.data().online;
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          online: statusData[user.id] || false,
        }))
      );
    });

    // Execute register
    registerUser();

    // Clean up
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      usersUnsubscribe();
      statusUnsubscribe();
      setUserOnlineStatus(currentUser._id, false);
    };
  }, [currentUser]);

  // Listen for messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser || !currentUser?._id) return;

    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("participants", "array-contains", currentUser._id),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatMessages = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (msg) =>
            (msg.senderId === currentUser._id &&
              msg.receiverId === selectedUser.id) ||
            (msg.senderId === selectedUser.id &&
              msg.receiverId === currentUser._id)
        );

      setMessages(chatMessages);
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  // Set user online status
  const setUserOnlineStatus = async (userId, isOnline) => {
    if (!userId) return;

    try {
      const userStatusRef = doc(db, "status", userId);
      await setDoc(
        userStatusRef,
        {
          online: isOnline,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  // Send message
  const sendMessage = async (text) => {
    console.log("here", !text.trim(), !selectedUser, !currentUser);
    if (!text.trim() || !selectedUser || !currentUser) return;
    console.log("now here");

    try {
      await addDoc(collection(db, "messages"), {
        text: text.trim(),
        createdAt: serverTimestamp(),
        senderId: currentUser._id,
        senderName:
          currentUser.username || currentUser.name || currentUser.email,
        receiverId: selectedUser.id,
        participants: [currentUser._id, selectedUser.id],
      });

      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  };

  // send voice message
  const sendVoiceMessage = async (audioBlob) => {
    if (!audioBlob || !selectedUser || !currentUser) return;

    try {
      console.log("Audio Blob:", audioBlob);
      console.log("Blob Type:", audioBlob.type);
      console.log("Blob Size:", audioBlob.size);
      // Upload to Firebase Storage
      const fileName = `voice_${currentUser._id}_${Date.now()}.webm`;
      const storageRef = ref(storage, `voice_messages/${fileName}`);
      // const uploadResult = await uploadBytes(storageRef, audioBlob);
      // const downloadURL = await getDownloadURL(uploadResult.ref);

      const uploadTask = uploadBytesResumable(storageRef, audioBlob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);

          // Save message reference in Firestore
          await addDoc(collection(db, "messages"), {
            type: "voice",
            voiceUrl: downloadURL,
            duration: 0,
            createdAt: serverTimestamp(),
            senderId: currentUser._id,
            senderName:
              currentUser.username || currentUser.name || currentUser.email,
            receiverId: selectedUser.id,
            participants: [currentUser._id, selectedUser.id],
          });
        }
      );

      return true;
    } catch (error) {
      console.error("Error sending voice message:", error);
      return false;
    }
  };

  const fetchAndSetCurrentUser = useCallback(async (userData) => {
    setCurrentUser(userData);
  }, []);

  const value = {
    currentUser,
    users,
    selectedUser,
    messages,
    fetchAndSetCurrentUser,
    setSelectedUser,
    sendMessage,
    sendVoiceMessage,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Add prop-types validation
FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is provided
};
