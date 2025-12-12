import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

function Banner() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image 8.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.Promo}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Promo</Text>
        </View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
            width: "50%",
          }}
        >
          Buy one get one FREE
        </Text>
      </ImageBackground>
    </View>
  );
}
export default Banner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:"relative"
  },
  image: {
    borderRadius: 20,
    flex:1,
    width: "95%",
    marginHorizontal: 20,
    position: "absolute",
    top: -80,
    left: 10,
    padding: 16,
  },
  Promo: {
    backgroundColor: "red",
    borderRadius: 16,
    padding: 10,
    width: "25%",
    alignItems: "center",
  },
});
