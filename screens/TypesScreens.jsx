import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  VirtualizedList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect,  useState } from "react";
import Banner from "../componets/Banner";
import { getProduct } from "../action/getProduct";
import Card from "../componets/Card";
import { useProductModal } from "../store/storeProduct";

function TypesScreens({ navigation }) {
  let [searchInput, setSearch] = useState("");
  let [, setLoading] = useState(false);

  let [typecoffee, ] = useState("hot");
  let [Result, setResult] = useState(null);
  let { Product, addProduct } = useProductModal(
    (state) => state
  );
  useEffect(() => {
    if (Result?.length > 0 && searchInput) {
      setResult(Result.filter((ele) => ele.title.includes(searchInput)));
    }
    if (!Boolean(searchInput)) {
      setResult(Product);
    }

    // scrollViewRef.current.scrollToEnd({ animated: true });
  }, [searchInput]);

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  useEffect(() => {
    setLoading(true);
    getProduct(typecoffee).then((res) => {
      setResult(res);
      addProduct(res);
      setLoading(false);
    });
  }, []);

  return (
    <View
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"light-content"}
        />

        <LinearGradient
          colors={["#313131", "#222222"]}
          style={styles.styleGrad}
        >
          <View style={styles.styleProfile}>
            <View>
              <Text style={[styles.text]}>Location</Text>
              <Text style={styles.textWhite}>Bilzen, Tanjungbalai</Text>
            </View>
            <View>
              <Image source={require("../assets/profile.png")} />
            </View>
          </View>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#fff"
              onPress={() => navigation.navigate("Home")}
            />
            <TextInput
              style={styles.input}
              placeholder="User Nickname"
              onChangeText={setSearch}
              underlineColorAndroid="transparent"
              value={searchInput}
            />
            <Pressable style={styles.menu}>
              <Image
                source={require("../assets/setting-4.png")}
                width={20}
                height={20}
              />
            </Pressable>
          </View>
        </LinearGradient>
        <Banner />
        <View style={{ flex: 5, alignItems: "center", marginVertical: 20 }}>
          <VirtualizedList
            style={{ paddingVertical: 10, marginBottom: 100 }}
            data={Result || []}
            initialNumToRender={10} // عدد العناصر التي سيتم عرضها أولاً
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <Card {...item} />
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()} // تأكدي أن id string
            getItemCount={getItemCount}
            getItem={getItem}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </View>
    </View>
  );
}
export default TypesScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleGrad: {
    height: 300,
    width: "100%",
  },
  styleProfile: {
    flexDirection: "row",
    marginVertical: 50,
    alignContent: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textWhite: {
    fontSize: 20,
    color: "white",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 25,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    backgroundColor: "#313131",
    color: "#989898",
    flex: 1,
  },
  menu: {
    backgroundColor: "#C67C4E",
    padding: 12,
    borderRadius: 10,
  },
  typeStyle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  viewType: {
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  active: {
    backgroundColor: "#C67C4E",
  },
});
