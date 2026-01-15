import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

export default function Home() {

    const [text, setText] = useState("")
    const [fruit, setFruit] = useState("")

    useEffect(() => {
        loadFruit()
    }, [])
    
    async function saveFruit(){
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if (data) {
            setFruit(data)
        }
    }

    async function removeFruit(){
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>🌙 Fruit Storage</Text>

            <Text style={styles.result}>
                Fruit : <Text style={styles.fruit}>{fruit || "-"}</Text>
            </Text>

            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter fruit name"
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.saveButton} onPress={saveFruit}>
                <Text style={styles.buttonText}>บันทึก</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={removeFruit}>
                <Text style={styles.buttonText}>ลบ</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20
    },
    result: {
        fontSize: 18,
        color: "#CCCCCC",
        marginBottom: 10
    },
    fruit: {
        fontWeight: "bold",
        color: "#4DA3FF"
    },
    input: {
        width: "100%",
        backgroundColor: "#1E1E1E",
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        padding: 12,
        color: "#FFFFFF",
        marginBottom: 15
    },
    saveButton: {
        width: "100%",
        backgroundColor: "#2ECC71",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10
    },
    deleteButton: {
        width: "100%",
        backgroundColor: "#E74C3C",
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }
})

