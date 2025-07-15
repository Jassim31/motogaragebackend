import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      }
    }
  ],
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  OrderId: { 
    type: String, 
    required: true 
  },
  PaymentId: { 
    type: String, 
    default: null 
  },
  address: { 
    type: String, 
    required: true 
  },
  isPaid: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
