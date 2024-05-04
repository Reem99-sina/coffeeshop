import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Card({ title, description, ingredients, image, id }) {
  return (
    <View key={id} style={styles.container}>
      <Image
        source={{ url: image }}
       
        height={100}
        resizeMode="center"
        style={{ borderRadius: 16 }}
      />
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
    marginHorizontal: 10,
  },
  textMain: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  menu: {
    backgroundColor: "#C67C4E",
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 10,
    alignItems: "center",
    alignSelf:"flex-end",
    margin:10
  },
});
