import {  Pressable, StyleSheet, Text,  ActivityIndicator } from "react-native";

function ButtonCustom({ title, onPress, loading = false }) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, loading && styles.buttonDisabled]}
      disabled={loading} // تمنع الضغط أثناء التحميل
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

export default ButtonCustom;

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#C67C4E",
    marginVertical: 15,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7, // شكل الـ button أثناء التحميل
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
