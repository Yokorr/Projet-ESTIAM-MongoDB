import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Address from '../models/Address.js';
import Category from '../models/Category.js';
import Supplier from '../models/Supplier.js';
import Product from '../models/Product.js';
import ShoppingCart from '../models/ShoppingCart.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  console.log('Clearing old data...');
  await User.deleteMany();
  await Address.deleteMany();
  await Category.deleteMany();
  await Supplier.deleteMany();
  await Product.deleteMany();
  await ShoppingCart.deleteMany();
  await Order.deleteMany();
  await OrderItem.deleteMany();
  await Payment.deleteMany();
  await Review.deleteMany();

  console.log('Creating Users...');
  const users = [];
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash('20010', salt);
  
  // Create 1 admin and 9 customers (Total 10)
  users.push(await User.create({ firstName: 'William', lastName: 'Admin', email: 'william@admin.com', password: defaultPassword, role: 'admin' }));
  for (let i = 1; i < 10; i++) {
    users.push(await User.create({ firstName: `Client${i}`, lastName: `Nom${i}`, email: `client${i}@test.com`, password: defaultPassword, role: 'customer' }));
  }

  console.log('Creating Addresses...');
  const addresses = [];
  for (let i = 0; i < 10; i++) {
    addresses.push(await Address.create({
      userId: users[i]._id,
      street: `${i+1} Rue du Commerce`,
      city: 'Paris',
      postalCode: `7500${i}`,
      country: 'France',
      isDefault: true
    }));
  }

  console.log('Creating Categories...');
  const categories = [];
  const catNames = ['Informatique', 'Smartphones', 'Jeux Vidéo', 'Maison', 'Livres', 'Sports', 'Bricolage', 'Mode', 'Beauté', 'Jouets'];
  for (let i = 0; i < 10; i++) {
    categories.push(await Category.create({ name: catNames[i], description: `Catégorie ${catNames[i]}`, slug: catNames[i].toLowerCase().replace(' ', '-') }));
  }

  console.log('Creating Suppliers...');
  const suppliers = [];
  for (let i = 0; i < 10; i++) {
    suppliers.push(await Supplier.create({
      name: `Fournisseur Tech ${i+1}`,
      contactEmail: `contact@fournisseur${i+1}.com`,
      phone: `010203040${i}`,
      address: { street: 'Zone Industrielle', city: 'Lyon', postalCode: '69000', country: 'France' }
    }));
  }

  console.log('Creating Products...');
  const products = [];
  for (let i = 0; i < 15; i++) { // More than 10
    const cat = categories[i % categories.length];
    const sup = suppliers[i % suppliers.length];
    products.push(await Product.create({
      name: `Produit ${cat.name} ${i+1}`,
      description: `Un excellent produit de la catégorie ${cat.name}`,
      price: (Math.random() * 500 + 10).toFixed(2),
      stock: Math.floor(Math.random() * 100),
      imageUrl: `https://picsum.photos/seed/${i}/400/400`,
      categoryId: cat._id,
      supplierId: sup._id,
      specifications: { "Poids": `${i}kg`, "Couleur": "Noir" }
    }));
  }

  console.log('Creating Shopping Carts...');
  const carts = [];
  for (let i = 0; i < 10; i++) {
    carts.push(await ShoppingCart.create({
      userId: users[i]._id,
      items: [
        { productId: products[i]._id, quantity: 1 },
        { productId: products[(i+1)%products.length]._id, quantity: 2 }
      ]
    }));
  }

  console.log('Creating Orders, Items and Payments...');
  const orders = [];
  const orderItems = [];
  const payments = [];
  
  for (let i = 0; i < 10; i++) {
    const user = users[i];
    const addr = addresses[i];
    const prod = products[i];
    
    // Order
    const order = await Order.create({
      userId: user._id,
      shippingAddressId: addr._id,
      totalAmount: prod.price * 2,
      status: 'shipped',
      paymentMethod: 'credit_card'
    });
    orders.push(order);

    // Order Item
    orderItems.push(await OrderItem.create({
      orderId: order._id,
      productId: prod._id,
      quantity: 2,
      priceAtPurchase: prod.price
    }));

    // Payment
    payments.push(await Payment.create({
      orderId: order._id,
      method: 'credit_card',
      amount: prod.price * 2,
      status: 'success',
      transactionId: `TXN${Math.floor(Math.random() * 1000000)}`
    }));
  }

  console.log('Creating Reviews...');
  for (let i = 0; i < 15; i++) {
    const user = users[i % users.length];
    const prod = products[i % products.length];
    
    // Verify if review already exists to avoid unique index violation
    const exists = await Review.findOne({ userId: user._id, productId: prod._id });
    if (!exists) {
      await Review.create({
        productId: prod._id,
        userId: user._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `Excellent produit ! Très satisfait du ${prod.name}.`
      });
    }
  }

  console.log('Seeding Success ! All 10 collections are populated with at least 10 documents.');
  process.exit();
};

seedData();
