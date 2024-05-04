import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useRef, useState } from "react";
import Banner from "../componets/Banner";
import { typeCoffee } from "../data/type";
import { getProduct } from "../action/getProduct";
import Card from "../componets/Card";
import { usesearchModal } from "../store/search";
import { useProductModal } from "../store/storeProduct";
function TypesScreens({navigation}) {
  let [searchInput, setSearch] = useState("");
  let [Loading, setLoading] = useState(false);
  const scrollViewRef = useRef();
  let [typecoffee, settypecoffee] = useState("");
  let [Result, setResult] = useState(null);
  let {search,addsearch,removesearch}=usesearchModal((state)=>state)
  let {Product,addProduct,removeProduct,updateProduct}=useProductModal((state)=>state)
useEffect(()=>{
  
  if(Result?.length>0&&searchInput){
    setResult(Result.filter((ele)=>ele.title.includes(searchInput)))
  }
  if(!Boolean(searchInput)){
    setResult(Product)
  }

  scrollViewRef.current.scrollToEnd({ animated: true })
},[searchInput])
  return (
    <KeyboardAvoidingView style={{flex:1,}} behavior={Platform.OS=="ios"?"padding":"height"} keyboardVerticalOffset={Platform.OS=="ios"?0:0} >
    <ScrollView style={styles.container}  ref={scrollViewRef}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"light-content"}
      />
        
      <LinearGradient colors={["#313131", "#222222"]} style={styles.styleGrad}>
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
            onPress={()=>navigation.navigate("Home")}
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
     <View style={{flex:2,alignItems:"center",marginVertical:20}}>
      <FlatList
        // numColumns={2}
       
        horizontal
        style={{alignSelf:"center"}}
        data={typeCoffee}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={[
                styles.typeStyle,
                typecoffee == item.type ? styles.active : null,
              ]}
              onPress={() => {
                setLoading(true);
                settypecoffee(item.type);

                getProduct(item.type)
                  .then((res) => {
                    setResult(res);
                    addProduct(res)
                  })
                  .catch(() => {
                    alert("error in fetch data");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              
            >
              <Text
                style={{ color: typecoffee == item.type ? "white" : "black" }}
              >
                {item.type}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <Text style={styles.EmtpyText}>No product found</Text>
        }

      />
      
        {Loading ? (
          <View>
            <ActivityIndicator size={"large"} color={"000000"} />
          </View>
        ) : null}

        <FlatList
          
          style={{ paddingVertical: 10,marginBottom:100 }}
          data={Result}
          horizontal
          renderItem={({ item }) => {

            return <Pressable onPress={()=>navigation.navigate("ProductDetail",{item:item})}>
                <Card {...item} />
                </Pressable>;
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<View style={{ height: 16 }} />}
        />
     </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default TypesScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flex:1
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
