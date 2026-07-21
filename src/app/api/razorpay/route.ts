import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount value." }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100);

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TG4A7LJ6rJhWjU";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "07voaasJ2LNwj3vwLfTSvwDJ";

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay API error response:", errorText);
      return NextResponse.json({ error: "Razorpay order creation failed." }, { status: response.status });
    }

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Internal Server Error in Razorpay Route:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
