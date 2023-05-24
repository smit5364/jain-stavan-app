import { firestore } from './firebase';

export const lyrics = async () => {
  try {
    const querySnapshot = await firestore.collection('lyrics').get();
    const lyrics = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return [];
  }
};
