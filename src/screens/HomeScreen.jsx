import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import { getDocs,collection, getFirestore,orderBy,limit, onSnapshot} from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import Latest from '../components/Latest'

export default function HomeScreen() {
  const [categoryList, setCategoryList] = useState([])
  const [latestItem, setLatestItem] = useState([])
  const db = getFirestore(app);

  useEffect(() => {
    getCategoryList();
    const unsubscribe = onSnapshot(collection(db, 'Product'), (snapshot) => {
      getLatestItemList();
    });
    return () => unsubscribe();
  }, [])

  const getCategoryList = async () => {
    setCategoryList([]);
      try{
        const query = await getDocs(collection(db, "Category"));
        query.forEach((doc) => {
            setCategoryList(categoryList=>[...categoryList, doc.data()]);
        });
        
      }catch(e){
        console.log(e);
      }
  }

  const getLatestItemList = async () => {
    setLatestItem([]);
    try{
      const query = await getDocs(collection(db, "Product"),orderBy('createdAt','desc'),limit(4))
      query.forEach((doc) => {
          setLatestItem(latestItem=>[...latestItem, doc.data()]);
      });
      
    }catch(e){
      console.log(e);
    }
  }
  return (
    <ScrollView className="py-10 px-8 bg-white flex-1"> 
     <Header />
     <Slider />
     <Categories categoryList={categoryList}/>
     <Latest latestItem={latestItem}/>
    </ScrollView>
  )
}