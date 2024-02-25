import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, getDocs } from 'firebase/firestore';

export default function AddPostScreen() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = async () => {
      const query = await getDocs(collection(db, "Category"));
      query.forEach((doc) => {
          setCategoryList([...categoryList, doc.data()]);
      });
  }
  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}