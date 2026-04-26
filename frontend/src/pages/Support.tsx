import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsAppChat } from "@/utils/whatsapp";

const Support = () => {
  const faqs = [
    {
      q: "What products do you offer?",
      a: "We offer natural dehydrated vegetable and fruit powders such as tomato, beetroot, spinach, and seasonal products like mango powder."
    },
    {
      q: "Are your products 100% natural?",
      a: "Yes, all our products are made from fresh ingredients with no added preservatives, chemicals, or artificial colors."
    },
    {
      q: "How should I store the powders?",
      a: "Store in a cool, dry place in an airtight container, away from moisture and direct sunlight."
    },
    {
      q: "What is the shelf life?",
      a: "Most products have a shelf life of 6–12 months when stored properly."
    },
    {
      q: "Do you deliver across India?",
      a: "Yes, we deliver across India."
    },
    {
      q: "How long does delivery take?",
      a: "Delivery usually takes 3–7 working days."
    },
    {
      q: "Can I return a product?",
      a: "Returns are not accepted, but damaged or incorrect items can be replaced if reported within 24 hours."
    },
    {
      q: "Are your products FSSAI approved?",
      a: "Yes, we are FSSAI registered. License No: 20126251000118."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="gradient-warm py-12">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Support</h1>
          <p className="text-muted-foreground">We're here to help you</p>
        </div>
      </section>

      {/* Support Options */}
      <section className="container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp Chat",
              desc: "Chat with us instantly",
              action: () => openWhatsAppChat(),
              btn: "Start Chat"
            },
            {
              icon: Phone,
              title: "Call Support",
              desc: "+91 8106044154",
              action: () => window.open("tel:+918106044154"),
              btn: "Call Now"
            },
            {
              icon: Mail,
              title: "Email Support",
              desc: "helloharvestpurepowders@gmail.com",
              action: () =>
                window.open("mailto:helloharvestpurepowders@gmail.com"),
              btn: "Send Email"
            },
            {
              icon: HelpCircle,
              title: "FAQ",
              desc: "Find answers below",
              action: () =>
                document
                  .getElementById("faq-section")
                  ?.scrollIntoView({ behavior: "smooth" }),
              btn: "View FAQ"
            }
          ].map(({ icon: Icon, title, desc, action, btn }) => (
            <div
              key={title}
              className="bg-card rounded-xl p-6 shadow-card text-center space-y-4"
            >
              <div className="w-14 h-14 mx-auto rounded-full gradient-saffron flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
              <Button onClick={action} className="w-full">
                {btn}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="container pb-16 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Support;