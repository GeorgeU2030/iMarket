import { View, Text, TextInput,StyleSheet,TouchableOpacity, Image, ToastAndroid, ActivityIndicator, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {

  const [validation, setValidation] = useState(true);
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const storage = getStorage();
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
  const onSubmitMethod = async (values) => {

    setLoading(true);
    // state of button - verify the fields
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'folderimages/'+Date.now()+".jpg");

    uploadBytes(storageRef,blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(url)=>{
        values.image = url;
        values.userName = user.fullName;
        values.userEmail = user.primaryEmailAddress.emailAddress;
        values.userImage = user.imageUrl;
        const docRef = await addDoc(collection(db, "Product"), values);
        if (docRef.id) {
          setLoading(false);
          ToastAndroid.show('Product Added Successfully!', ToastAndroid.SHORT);
        }
      })
    })
  }

  const validatefields = (values)=>{
    if(values.title === ''){
      return false;
    }
    if(values.description === ''){
      return false;
    }
    if(values.price === ''){
      return false;
    }
    if(values.address === ''){
      return false;
    }
    if(values.category === ''){
      return false;
    }
    if(image === ''){
      return false;
    }
    setValidation(false)
    return true;
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className="text-2xl text-center font-semibold" style={styles.texttwo}>Add New Post</Text>
      <Text className="text-center" style={styles.textsubtitle}>Create a New Product and Start Selling!</Text>
      <Formik
      initialValues={{title:'', description:'', category: '',address:'', price: '',image:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}
      onSubmit={(values)=>{onSubmitMethod(values)}}
      validate={validatefields}
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

            <TouchableOpacity onPress={handleSubmit} className='p-3 rounded-full mt-5'
            style={{backgroundColor:loading ? '#0B6D5B' : (validation ? '#3B82BF' : '#42ad99')}}
            disabled={loading || validation}
            > 
              {loading ? 
              <ActivityIndicator size="small" color="#fff" />:
              <Text style={styles.text} className='text-lg text-center text-white'>Submit</Text>
              }
            </TouchableOpacity>
          </View>
          )
        }}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
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