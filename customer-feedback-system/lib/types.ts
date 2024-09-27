export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
  }
  
  export interface Feedback {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
  }
  