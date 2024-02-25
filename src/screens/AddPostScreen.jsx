import { View, Text, TextInput,StyleSheet,TouchableOpacity, Image, ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function AddPostScreen() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onSubmitMethod = (values) => {
    values.image = image;
    console.log(values);
  }
  return (
    <View className="p-10">
      <Text className="text-2xl text-center font-semibold" style={styles.texttwo}>Add New Post</Text>
      <Text className="text-center" style={styles.textsubtitle}>Create a New Product and Start Selling!</Text>
      <Formik
      initialValues={{title:'', description:'', category: '',address:'', price: '',image:''}}
      onSubmit={(values)=>{onSubmitMethod(values)}}
      validate={(values)=>{
        const errors = {};
        if (!values.image){
          errors.image = 'Image is Required';
          ToastAndroid.show('Image is Required', ToastAndroid.SHORT);
        }
        else if(!values.title){
          errors.title = 'Title is Required';
          ToastAndroid.show('Title is Required', ToastAndroid.SHORT);
        }
        else if(!values.price){
          errors.title = 'Price is Required';
          ToastAndroid.show('Price is Required', ToastAndroid.SHORT);
        }
        else if(!values.address){
          errors.title = 'Address is Required';
          ToastAndroid.show('Address is Required', ToastAndroid.SHORT);
        }
        return errors;
      }}
      >
        {({handleChange, handleBlur, handleSubmit,values,setFieldValue,errors})=>{

          return (
          <View style={{marginTop:3}}>

            <TouchableOpacity onPress={pickImage}>
            {image ?
            <Image source={{uri: image}} style={styles.imagestyle} />
            :<Image source={require('../../assets/images/placeholder.png')}
            style={styles.imagestyle}
            />
            }
            
            </TouchableOpacity>
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
  },
  imagestyle:{ 
    width: 150, 
    height: 150, 
    alignSelf:'center', 
    borderRadius: 15
  }
  }
)