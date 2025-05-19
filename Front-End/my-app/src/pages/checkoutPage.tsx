import { useEffect } from "react";
import axios, { AxiosError } from "axios";

interface CheckoutResponse {
  message: string;
}

const CheckoutPage = () => {
  useEffect(() => {
    const fetchCheckout = async (): Promise<void> => {
      try {
        const res = await axios.get<CheckoutResponse>("http://localhost:5500/api/checkout");
        console.log(res.data.message);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.error(err.response?.data?.message || "Not authorized");
      }
    };

    fetchCheckout();
  }, []);

  return <div>Loading checkout page...</div>;
};

export default CheckoutPage;
