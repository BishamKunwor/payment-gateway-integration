// Test Credentials for sandbox environment
// Test Khalti ID for 9800000000 9800000001 9800000002 9800000003 9800000004 9800000005
// Test MPIN 1111
// Test OTP 987654

import { message } from "antd";

export default async function payFromKhalti() {
  const path = "https://a.khalti.com/api/v2/epayment/initiate/";
  const secret = "live_secret_key_c29bff9015674b939338370b7ea9f7f2";

  const params = {
    return_url: "http://localhost:3000/payment/",
    website_url: "http://localhost:3000/",
    amount: 4000,
    purchase_order_id: "fdasfafdsadf",
    purchase_order_name: "test",
  };

  getPaymentUrl(path, secret, params);
}

async function getPaymentUrl(path: string, secret: string, params: any) {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Authorization: `Key ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      const { payment_url, pidx } = await response.json();
      console.log(payment_url);
      await validateKhaltiPayment(pidx);
      window.location.href = payment_url;
    } else {
      throw new Error("Error in Response.", {
        cause: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function validateKhaltiPayment(pidx: string) {
  const secret = "live_secret_key_c29bff9015674b939338370b7ea9f7f2";
  const path = "https://a.khalti.com/api/v2/epayment/lookup/";
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Authorization: `Key ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });
    const data = await response.json();
    if (data.status === "Completed") {
      message.success(
        `Transaction completed with amount of ${
          data.total_amount / 100
        } and Fee of ${data.fee / 100}`
      );
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
