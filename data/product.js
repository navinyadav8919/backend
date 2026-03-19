let products = [
    { id: 1, name: "laptop", price: 45000 },
    { id: 2, name: "phone", price: 25000 }
];

let users = [
    { id: 1, name: "naveen", email: "naveen@gmail.com" },
    { id: 2, name: "ganesh", email: "ganesh@gmail.com" },
    { id: 3, name: "kiran", email: "kiran@gmail.com" }
];

// ✅ correct export
module.exports = {
    products,
    users
};