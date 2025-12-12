import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useFaviorteModal } from "../store/faviorteCart";
import IconColor from "react-native-vector-icons/AntDesign";

function ProductDetailScreens({ route, navigation }) {
  let [extend, setExtend] = useState(false);
  let { faviorte, addfaviorte, removefaviorte } = useFaviorteModal(
    (state) => state
  );

  const includeFaviorte = useMemo(() => {
    return faviorte.some((item) => item.id === route.params.item.id);
  }, [faviorte]);

  const { item } = route.params;

  function addFaviorte(item) {
    if (includeFaviorte) {
      removefaviorte(item?.id);
    } else {
      addfaviorte(item);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Icon name="arrow-left" size={20} onPress={() => navigation.goBack()} />
        <Text style={styles.mainText}>Detail</Text>
        {includeFaviorte ? (
          <IconColor
            name="heart"
            size={20}
            onPress={() => addFaviorte(item)}
            color={"#C67C4E"}
          />
        ) : (
          <Icon name="heart" size={20} onPress={() => addFaviorte(item)} />
        )}
      </View>
      <View style={styles.styleContentcart}>
        <Image
          source={{ uri: item.image }}
          height={300}
          style={{ borderRadius: 16 }}
        />
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.textMain}>{item.title}</Text>
          <Text style={styles.description}>
            {extend ? item.description : item.description.slice(0, 100)}
          </Text>
          <Pressable onPress={() => setExtend(!extend)}>
            <Text style={{ color: "#C67C4E" }}>
              {extend ? "Read Less" : "Read more"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ProductDetailScreens;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 20,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  styleContentcart: {
    marginHorizontal: 20,
  },
  textMain: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
    alignItems: "center",
  },
});
