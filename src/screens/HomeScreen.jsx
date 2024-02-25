import { View, Text } from 'react-native'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import { getDocs,collection, getFirestore } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'

export default function HomeScreen() {
  const [categoryList, setCategoryList] = useState([])
  const db = getFirestore(app);

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = async () => {
    setCategoryList([]);
      try{
        const query = await getDocs(collection(db, "Category"));
        query.forEach((doc) => {
            setCategoryList(categoryList=>[...categoryList, doc.data()]);
        });
        console.log(categoryList)
      }catch(e){
        console.log(e);
      }
  }
  return (
    <View className="py-10 px-8 bg-white flex-1"> 
     <Header />
     <Slider />
     <Categories categoryList={categoryList}/>
    </View>
  )
}