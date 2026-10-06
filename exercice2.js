const products = [
  { name: 'Keyboard', price: 45 },
  { name: 'Monitor', price: 320 },
  { name: 'Mouse', price: 25 }
];

// 1. destructuring on the first product
const { name, price } = products[0];
console.log(name, price);

// 2. find the Mouse and log its price
const mouse = products.find(p => p.name === 'Mouse');
console.log(mouse.price);

// 3. filter: price strictly below 100
const cheap = products.filter(p => p.price < 100);
console.log(cheap);

// 4. arrow function: 10% discount
const withDiscount = (price) => price * 0.9;
console.log(withDiscount(320));

// Bonus: map
console.log([1, 2, 3].map(n => n * 2));
