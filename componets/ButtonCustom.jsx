import { Button, Pressable, StyleSheet, Text, View } from "react-native";

function ButtonCustom({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
export default ButtonCustom;
export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#C67C4E",
    marginVertical: 15,
    borderRadius: 16,
    width: "60%",
   
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:20
  },
});
