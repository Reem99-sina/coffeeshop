import { CardField, isPlatformPaySupported, PlatformPay, PlatformPayButton, StripeProvider } from "@stripe/stripe-react-native";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CardPayment from "../componets/cardPayment";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

function PaymentScreen({ navigation }) {
  return (
    <>
      <View>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"dark-content"}
        />
        <ScrollView>
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.mainText}>payment</Text>
          </View>
         
          <CardPayment/>
         
        </ScrollView>
      </View>
    </>
  );
}
export default PaymentScreen;
const styles=StyleSheet.create({
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
      EmtpyText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
      },
})
