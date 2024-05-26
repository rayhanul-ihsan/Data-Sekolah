import React, { useState, useEffect } from 'react';
import { View, Image, Text } from '@gluestack-ui/themed';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Foto() {
    const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status === 'granted');
        })();
    }, []);

    const pickImageFromCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error picking image from camera: ', error);
        }
    };

    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error picking image from gallery: ', error);
        }
    };

    if (hasGalleryPermission === false) {
        return (<Text>No Access to internal storage</Text>);
    }

    return (
        <View>
            <View mb={"$4"}>
            {/* <Button  title="Pick from Camera"  onPress={pickImageFromCamera} /> */}
            <Button title="Pick Image" onPress={pickImageFromGallery} />
            </View>
            {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />}
        </View>
    );
}
