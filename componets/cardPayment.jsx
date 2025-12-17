import  { useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useOrderModal } from "../store/storeCart";
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

function CardPayment() {
  let [, setCardDetail] = useState({});
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();
  const [, setPaymentSheetEnabled] = useState(false);
  const [, setLoading] = useState(false);
  const [, setPaymentMethod] = useState(null);
  let { order } = useOrderModal((state) => state);
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  let totalPrice = useMemo(() => {
    return order.reduce((total, ele) => ele?.id * ele?.count + total, 0);
  }, [order]);

  // const [loading, setLoading] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      `https://stripe-izin.onrender.com/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: 450,
        }),
      }
    );

    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const { paymentIntent } = await fetchPaymentSheetParams();

      const address = {
        city: "San Francisco",
        country: "AT",
        line1: "510 Townsend St.",
        line2: "123 Street",
        postalCode: "94102",
        state: "California",
      };
      const billingDetails = {
        name: "Jane Doe",
        email: "foo@bar.com",
        phone: "555-555-555",
        address: address,
      };

      const { error, paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: "Example Inc.",
        style: "automatic",
        googlePay: { merchantCountryCode: "US", testEnv: true },
        returnURL: "stripe-example://stripe-redirect",
        defaultBillingDetails: billingDetails,
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      } else {
        Alert.alert(`Error code: ${error.code}`, error.message);
      }
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption.label,
        image: paymentOption.image,
      });
    } else {
      setPaymentMethod(null);
    }
  };
  const onPressBuy = async () => {
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "The payment was confirmed successfully!");
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  return (
    <>
      <CardForm
        style={{ height: 200, width: "auto", margin: 20 }}
        onFormComplete={(complete) => setCardDetail(complete)}
        dangerouslyGetFullCardDetails={true}
      />
      {/* <AddressSheet visible={true}/> */}
      {/* <AddressCollectionMode /> */}
    </>
  );
}
export default CardPayment;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  paymentMethodTitle: {
    color: Colors.slate,
    fontWeight: "bold",
  },
  image: {
    width: 26,
    height: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});
