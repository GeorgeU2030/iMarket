import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getFirestore, query, collection,where,getDocs } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import Latest from '../components/Latest'

export default function ItemList() {

    const {params}=useRoute()
    const db = getFirestore(app);
    const [itemList, setItemList] = useState([])
    useEffect(() => {
        params&&getCategoryList();
    }, [params])

    const getCategoryList = async () => {
        setItemList([]);
        const q = query(collection(db, "Product"), where("category", "==", params.category));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
           setItemList(itemList=>[...itemList, doc.data()]);
        });
    }

  return (
    <View className='p-3'>

    {itemList?.length>0?
      <Latest latestItem={itemList} heading={''}/>
      :
      <Text style={{fontFamily:'Apple'}} className="text-xl">Not Found Products</Text>
    }
    </View>
  )
}