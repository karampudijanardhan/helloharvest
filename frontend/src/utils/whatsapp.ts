const WHATSAPP_NUMBER = "917893064679";

export const openWhatsAppChat = (message?: string) => {
  const defaultMessage = "Hello, I'd like to order natural & organic powders.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const createOrderMessage = (
  items: { name: string; weight: string; quantity: number; price: number }[],
  total: number
) => {
  let message = "Hi! I would like to place an order:\n\n";
  
  items.forEach((item) => {
    message += `• ${item.name} (${item.weight}) x${item.quantity} - ₹${item.price * item.quantity}\n`;
  });
  
  message += `\n*Total: ₹${total}*\n\nPlease confirm availability and delivery details.`;
  
  return message;
};
