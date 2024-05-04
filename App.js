import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import HomeScreens from "./screens/HomeScreens";
import TypesScreens from "./screens/TypesScreens";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, Alert, Dimensions, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import ProductDetailScreens from "./screens/ProductDetailScreens";
import ButtonCustom from "./componets/ButtonCustom";
import { useOrderModal } from "./store/storeCart";
import CartScreen from "./screens/CartScreen";
import FaviorteScreen from "./screens/FaviorteScreen";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AddressSheet, StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

const Stack = createNativeStackNavigator();
export default function App() {
  let [open,setOpen]=useState(false)
  let [loadingorder,setloading]=useState(false)

  let {order,addOrder,updateOrder}=useOrderModal((state)=>state)
 
  let totalPrice=useMemo(()=>{
    return order.reduce((total,ele)=>(ele?.id*ele?.count)+total,0)
  },[order])
  const includeOrder = useMemo(() => {
    return (id)=>order?.some((item) => item.id === id);
  }, [order]);
  
  const AddOrder=useCallback((item)=> {
    setloading(true)
    const check=includeOrder(item?.id)
    if (check) {
      updateOrder(item?.id)
      // removeOrder(item?.id);
    } else {
      addOrder(item);
    }
    setTimeout(()=>{
      setloading(false)
    },1000)
    addOrderBack()
  },[])
  const addOrderBack=async()=>{
await axios.post("https://stripe-izin.onrender.com/order",{data:order}).then(({data})=>
  Alert.alert('done in add order in database')
).catch(()=>Alert.alert('error in add order in database'))
  }
  const { initPaymentSheet, presentPaymentSheet,handleURLCallback } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://stripe-izin.onrender.com/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify({
        amount:totalPrice?Number(totalPrice):67,
        currency:"usd"
      })
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();
    const initialUrl = await Linking.getInitialURL();
    const stripeHandled = await handleURLCallback(initialUrl);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
        address:"",
        email:"",
        phone:""
      },
      returnURL:stripeHandled
    });
    console.log(error,"error")
    if (!error) {
      setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
   
    const { error,paymentOption } = await presentPaymentSheet();
   console.log(paymentOption,"paymentOption")
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <StripeProvider  
     stripeAccountId="acct_1OnViJJ1yUQMPxwp"
     publishableKey="pk_test_51OnViJJ1yUQMPxwpHSfb0uZFYHJwEo0VBpr3AIRmGwdw6tli8fYgSIVHNn3IE6ZiPpaqplfmaJOx3vuBwaEnn6Kj00Psw1Yqxu"
    > 
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={TypesScreens}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={styles.styleHeader}>
                  <Icon name="home" size={30} color={navigationOptions.route.name=="Detail"?"#C67C4E":"gray"}
                   onPress={()=>navigationOptions.navigation.navigate("Detail")}/>
                  <Icon name="heart" size={30} color={navigationOptions.route.name=="Faviorte"?"#C67C4E":"gray"}
                   onPress={()=>navigationOptions.navigation.navigate("Faviorte")}/>
                  <Icon name="shopping-bag" size={30} color={navigationOptions.route.name=="shopping-bag"?"#C67C4E":"gray"}
                  onPress={()=>navigationOptions.navigation.navigate("shopping-bag")} />
                  {/* <Icon name="notification" size={30} color="#C67C4E" onPress={()=>{}}/> */}
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreens}
          options={{ header: ({route}) => {
           
            return (
              <View style={[styles.styleHeader,styles.stylePrice]}>
                <View>
                  <Text style={{ color:"black",fontSize:16,fontWeight:"bold"}}>
                    Price
                  </Text>
                  <Text style={{ color:"#C67C4E",fontSize:20,fontWeight:"bold"}}>
                    $ 4.35
                  </Text>
                </View>
                {loadingorder?<View style={styles.button}><ActivityIndicator size={"small"} style={styles.text}/></View>:
                <ButtonCustom title="Add to Cart" onPress={()=>{
                  AddOrder(route.params.item)

                  }} disabled={loadingorder}/>}
                {/* <Icon name="notification" size={30} color="#C67C4E" onPress={()=>{}}/> */}
              </View>
            );
          }, }}
        />
       
        <Stack.Screen
          name="shopping-bag"
          component={CartScreen}
          options={{ header: ({route,navigation}) => {
           
            return (
              <View style={[styles.styleHeader,styles.stylePrice]}>
                <View>
                  <Text style={{ color:"black",fontSize:16,fontWeight:"bold"}}>
                  Price
                  </Text>
                  <Text style={{ color:"#C67C4E",fontSize:20,fontWeight:"bold"}}>
                  $ {totalPrice}
                  </Text>
                </View>
                <ButtonCustom title="Buy Now" onPress={openPaymentSheet}/>
                {/* <Icon name="notification" size={30} color="#C67C4E" onPress={()=>{}}/> */}
              </View>
            );
          }, }}
        />
          <Stack.Screen
          name="Faviorte"
          component={FaviorteScreen}
          options={{ header: (navigationOptions) => {
           
            return (
              <View style={styles.styleHeader}>
                  <Icon name="home" size={30} color={navigationOptions.route.name=="Detail"?"#C67C4E":"gray"}
                   onPress={()=>navigationOptions.navigation.navigate("Detail")}/>
                  <Icon name="heart" size={30} color={navigationOptions.route.name=="Faviorte"?"#C67C4E":"gray"}
                   onPress={()=>navigationOptions.navigation.navigate("Faviorte")}/>
                  <Icon name="shopping-bag" size={30} color={navigationOptions.route.name=="shopping-bag"?"#C67C4E":"gray"}
                  onPress={()=>navigationOptions.navigation.navigate("shopping-bag")} />
                  {/* <Icon name="notification" size={30} color="#C67C4E" onPress={()=>{}}/> */}
                </View>
            );
          }, }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    {/* <AddressSheet visible={open}/> */}
    </StripeProvider>
  );
}
const styles=StyleSheet.create({
  styleHeader:{
    flexDirection:"row",
    alignItems:"center",
    position:"absolute",
    top: Dimensions.get('window').height-100,
     height: 100,
      width: "100%",
    backgroundColor:"#fff",
    justifyContent:"space-around"
  },stylePrice:{
    flexDirection:"row"
  }, button: {
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
})
