import { redirect } from "next/navigation";

export default function CheckoutPage() {
  redirect("/cart?step=upi_payment");
}
