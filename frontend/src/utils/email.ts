import emailjs from "@emailjs/browser";

export const sendAdminOrderEmail = async (order: any) => {
  try {
    await emailjs.send(
      "service_fukpzje",
      "template_lo0i43v",
      {
        order_id: order.order_id,
        name: order.name,
        phone: order.phone,
        address: order.address,
        items: order.items,
        total: order.total,
        payment: order.payment,
      },
      "H1XZeGS9ZyuCUU9OU"
    );

    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};