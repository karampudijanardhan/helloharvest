export interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  openHours: string;
  mapLink: string;
}

export const stores: Store[] = [
  {
    id: "store1",
    name: "Helloharvest Pure Powders - Chittoor",
    city: "Chittoor",
    address: "1-71,Roops office back side,shanthinagar,jumbuvaripalle,Bangarupalem,Chittoor, Andhra Pradesh,517416",
    phone: "+91 8106044154",
    openHours: "9:00 AM - 9:00 PM (Mon-Sun)",
    mapLink: "https://share.google/ocogzaY3q923fNKjO",
  }
];
