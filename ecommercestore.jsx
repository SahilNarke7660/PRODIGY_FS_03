import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics", image: "laptop.jpg" },
  { id: 2, name: "Phone", price: 800, category: "Electronics", image: "phone.jpg" },
  { id: 3, name: "Headphones", price: 150, category: "Accessories", image: "headphones.jpg" },
];

export default function ECommerce() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "Price Low to High") return a.price - b.price;
    if (sort === "Price High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Listings</h2>
      
      <div className="flex gap-4 mb-4">
        <Select onChange={(e) => setFilter(e.target.value)}>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Electronics">Electronics</SelectItem>
          <SelectItem value="Accessories">Accessories</SelectItem>
        </Select>
        <Select onChange={(e) => setSort(e.target.value)}>
          <SelectItem value="None">Sort By</SelectItem>
          <SelectItem value="Price Low to High">Price Low to High</SelectItem>
          <SelectItem value="Price High to Low">Price High to Low</SelectItem>
        </Select>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6">Shopping Cart</h2>
      <div className="mt-4">
        {cart.length === 0 ? <p>Your cart is empty.</p> :
          cart.map((item, index) => (
            <div key={index} className="flex justify-between p-2 border-b">
              <span>{item.name} - ${item.price}</span>
              <Button variant="destructive" onClick={() => removeFromCart(index)}>Remove</Button>
            </div>
          ))}
      </div>
    </div>
  );
}
