import { motion } from "framer-motion";
import { Calendar, CheckCircle, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order details from sessionStorage
    const savedOrder = sessionStorage.getItem("orderDetails");
    if (!savedOrder) {
      navigate("/");
      return;
    }
    setOrder(JSON.parse(savedOrder));
  }, [navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="animate-spin">
          <ShoppingBag className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border mt-10"
        >
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <CheckCircle className="text-green-600" size={40} />
                <span>Order Confirmed!!</span>
              </h2>
              <p className="text-gray-600 mt-2">Thank you for your purchase</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>{new Date(order.order_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ShoppingBag size={18} className="mr-2" />
                  <span>{order.order_number}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Truck size={18} className="mr-2" />
                  <span>{order.delivery_option}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-center">Variant</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{product.product_name}</td>
                      <td className="px-6 py-4 text-center">
                        {product.variants}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">
                        ৳{product.unit_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-700">
                  ৳{order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="text-gray-700">
                  ৳{order.shipping_cost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold border-t pt-4">
                <span>Total:</span>
                <span>৳{order.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sessionStorage.removeItem("orderDetails");
                navigate("/");
              }}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-95 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmed;
