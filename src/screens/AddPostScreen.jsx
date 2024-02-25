import { View, Text, TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

export default function AddPostScreen() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

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
      }catch(e){
        console.log(e);
      }
  }
  return (
    <View className="p-10">
      <Text className="text-2xl text-center font-semibold" style={styles.texttwo}>Add New Post</Text>
      <Text className="text-center" style={styles.textsubtitle}>Create a New Product and Start Selling!</Text>
      <Formik
      initialValues={{title:'', description:'', category: '',address:'', price: ''}}
      onSubmit={(values)=>{console.log(values)}}
      >
        {({handleChange, handleBlur, handleSubmit,values,setFieldValue})=>{

          return (
          <View style={{marginTop:3}}>
            <TextInput style={styles.input}
            placeholder='Title'
            value={values.title}
            onChangeText={handleChange('title')}
            textAlign='right'
            ></TextInput>

            <TextInput style={styles.input}
            placeholder='Description'
            value={values.description}
            numberOfLines={5}
            textAlign='right'
            onChangeText={handleChange('description')}
            ></TextInput>

            <TextInput style={styles.input}
            placeholder='Price'
            value={values.price}
            keyboardType='number-pad'
            textAlign='right'
            onChangeText={handleChange('price')}
            ></TextInput>

          <TextInput style={styles.input}
            placeholder='Address'
            value={values.address}
            textAlign='right'
            onChangeText={handleChange('address')}
            ></TextInput>

            <View style={styles.pickerstyle}>
            <Picker
            selectedValue={values?.category}
            onValueChange={itemValue=>setFieldValue('category', itemValue)}
            >
              {categoryList&&categoryList.map((item, index)=>{
                return <Picker.Item key={index} label={item.name} value={item.name} />
              })}
            </Picker>
            </View>

            <TouchableOpacity onPress={handleSubmit} className='bg-[#42ad99] p-3 rounded-full mt-5'>
              <Text style={styles.text} className='text-lg text-center text-white'>Submit</Text>
            </TouchableOpacity>
          </View>
          )
        }}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop:10,
    padding: 15,
    paddingHorizontal:17,
    fontFamily:'Apple',
    fontSize:17,
    textAlignVertical:'top'
  },
  text:{
    fontFamily: 'Apple'
  },
  textsubtitle:{
    fontFamily: 'Apple',
    color: '#0B6D5B'
  },
  pickerstyle:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop:10,
  }
  }
)