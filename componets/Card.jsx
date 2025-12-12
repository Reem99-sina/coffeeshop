import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { isValidImage } from "../util/validate";

function Card({ title, description, ingredients, image, id }) {
  if (!isValidImage(image)) return null; // لو الصورة غير صالحة، لا تعرض الكارد

  const imageSource = { uri: Array.isArray(image) ? image[0] : image };

  return (
    <View key={id} style={styles.container}>
      <View>
        <Image
          source={imageSource}
          height={200}
          resizeMode="center"
          style={{ borderRadius: 16 }}
        />
      </View>
      <Text style={styles.textMain}>{title}</Text>
      <Text style={styles.description}>{description.slice(0, 20)}...</Text>
      {/* <View style={styles.menu}>
        <Pressable onPress={()=>{}} style={{margin:0,padding:0}}>
          <Icon  color={"#fff"} style={{ fontSize: 20 ,alignSelf:"center"}}>
            +
          </Icon>
        </Pressable>
      </View> */}
    </View>
  );
}
export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    gap: 10,
    alignItems: "start",
  },
  textMain: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  menu: {
    backgroundColor: "#C67C4E",
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 10,
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 10,
  },
});
