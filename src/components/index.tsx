import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

// Componentes reutilizables
export const CustomButton = ({ title, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
  
 export const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      // keyboardType={keyboardType}
    />
  );


  const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      smallInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: 100,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
  });