// App.tsx
import React, { useState } from "react";
import { Button, Image, View, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "We need access to your photo library!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "We need access to your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-white">
      <Button title="Take a Photo" onPress={takePhoto} />
      <View style={{ height: 10 }} />
      <Button title="Pick from Gallery" onPress={pickImage} />

      {imageUri && (
        <Image source={{ uri: imageUri }} className="w-[250px] h-[250px] mt-20" resizeMode="cover" />
      )}
    </View>
  );
}
