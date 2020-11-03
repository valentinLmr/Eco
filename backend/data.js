import bcrypt from 'bcryptjs'

 const data = {
   colors: [{
     color: 'red',
     sizes:[],
     productRef: null
   },
   {
    color: 'blue',
    sizes:[],
    productRef: null

  },
  {
    color: 'yellow',
    sizes:[],
    productRef: null

  },
   ],
   sizes:[{
     size:"s",
     countInStock: null,
     colorRef: null
     
   },
   {
    size:"m",
    countInStock: null,
    colorRef: null
  },
  {
    size:"l",
    countInStock: null,
    colorRef: null
  },
  {
    size:"xl",
    countInStock: null,
    colorRef: null
  }
  ],
  users:[
  {
    name:'Valentin',
    email:'admin@example.com',
    password: bcrypt.hashSync('1234', 8),
    isAdmin: true,
  },
  {
    name:'Maelle',
    email:'user@example.com',
    password: bcrypt.hashSync('12345', 8),
    isAdmin: false,
  },
],
  products: [
    {
      image: "../image/OIP.jpeg",
      name: "tunique",
      category: "Robe",
      brand: "Vans",
      price: 40,
      rating: 4.5,
      numberOfReview: 10,
      description: 'hello World',

    },
    {
      image: "../image/OIP.jpeg",
      name: "dress banditas",
      category: "Robe",
      brand: "Veja",
      price: 40,
      rating: 4.5,
      description: 'hello World',
      numberOfReview: 10,
    
    },
    {
      image: "../image/OIP.jpeg",
      name: "pants",
      category: "dress",
      brand: "Veja",
      price: 40,
      rating: 4.5,
      numberOfReview: 10,
      description:'hello World',
    
    },
    {
      image: "../image/OIP.jpeg",
      name: "skirt",
      category: "dress",
      brand: "Banditas",
      price: 40,
      rating: 4.5,
      numberOfReview: 10,
      description:'hello World',
    },
    {
      image: "../image/OIP.jpeg",
      name: "shoe",
      category: "dress",
      brand: "Banditas",
      price: 40,
      rating: 4.5,
      numberOfReview: 10,
      description:'hello World',
        },
  ],
};

export default data
