const About = () => (
  <div className="min-h-screen bg-background">
    
    {/* Hero Section */}
    <section className="gradient-warm py-16">
      <div className="container max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold mb-6">
          About HelloHarvest Pure Powders
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          HelloHarvest Pure Powders is dedicated to delivering high-quality, natural, 
          and hygienically processed dehydrated food products. Inspired by the richness 
          of farm-fresh produce, we transform vegetables and fruits into pure, 
          nutrient-rich powders for modern, healthy living.
        </p>
      </div>
    </section>

    {/* Content Section */}
    <section className="container py-12 max-w-3xl space-y-6 text-muted-foreground">
      
      <p>
        Based in Andhra Pradesh, HelloHarvest Pure Powders focuses on producing 
        premium dehydrated vegetable powders such as tomato, beetroot, spinach, 
        and seasonal fruits like mango. Our products are carefully processed to 
        retain natural taste, color, and nutritional value without adding 
        preservatives or chemicals.
      </p>

      <p>
        We follow strict hygiene and food safety standards and are registered under 
        the Food Safety and Standards Authority of India (FSSAI), ensuring quality 
        and compliance in every step of our production process.
      </p>

      <p>
        Our mission is simple: to provide pure, convenient, and healthy food solutions 
        for every household. Whether you are cooking at home or running a business, 
        HelloHarvest Pure Powders helps you enjoy natural flavors with ease.
      </p>

      <p className="font-medium text-foreground">
        FSSAI License No: 20126251000118
      </p>

    </section>
  </div>
);

export default About;