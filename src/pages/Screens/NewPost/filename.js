import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/storage';

export const pickImage = async() => {
    try{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1,
            allowsMultipleSelection: false,
        });
        return result.canceled?null:result.assets[0].uri;
    }catch(e){
       throw e;
    }
}

export const uploadImage = async(uri, path) => {
    let URL;
    try{
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref();
        const upload = storageRef.child(path);
        await upload.put(blob);
        await upload.getDownloadURL().then((url) => {
            URL = url;
        });
        return URL;
    }catch(e){
       throw e;
    }
}