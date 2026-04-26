import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsAppChat } from "@/utils/whatsapp";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <section className="gradient-warm py-12">
      <div className="container text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">We'd love to hear from you</p>
      </div>
    </section>

    <section className="container py-12 max-w-2xl">
      <div className="bg-card rounded-xl p-8 shadow-card space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-muted-foreground">1-71,Roops office back side,shanthinagar,jumbuvaripalle,Bangarupalem,Chittoor, Andhra Pradesh,517416</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <a href="tel:+91 8106044154" className="text-muted-foreground hover:text-primary">+91 8106044154 </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <a href="mailto:helloharvestpurepowders@gmail.com" className="text-muted-foreground hover:text-primary">helloharvestpurepowders@gmail.com</a>
          </div>
        </div>
        <Button onClick={() => openWhatsAppChat()} className="w-full gradient-saffron">Chat on WhatsApp</Button>
      </div>
    </section>
  </div>
);

export default Contact;
