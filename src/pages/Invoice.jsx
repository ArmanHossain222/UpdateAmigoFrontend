// InvoicePage.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Layout/Container";

function Invoice() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderData) {
      return;
    }
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: orderData?.invoice_number,
        value: orderData?.total,
        currency: "BDT",
        tax: 0,
        shipping: orderData?.shipping,
        items: orderData?.products.map((product) => ({
          item_name: product?.product_name,
          item_id: product?.product_id,
          price: product?.unit_price,
          quantity: product?.quantity,
        })),
        customer: {
          customer_name: orderData?.recipient_name,
          customer_phone: orderData?.recipient_phone,
          customer_city: orderData?.city,
        },
      },
    });
  }, [orderData]);

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      setOrderData(JSON.parse(data));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <p className="text-xl text-gray-600 mb-4">No invoice data found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 print:shadow-none"
        >
          <div className="flex justify-between items-center mb-8 print:hidden">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shop
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Invoice
            </button>
          </div>

          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
            <p className="text-gray-600">
              Invoice Number: {orderData.invoice_number}
            </p>
            <p className="text-gray-600">
              Date: {new Date(orderData.order_date).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Billing Details</h2>
              <p className="text-gray-600">{orderData.recipient_name}</p>
              <p className="text-gray-600">{orderData.recipient_address}</p>
              <p className="text-gray-600">{orderData.city}</p>
              <p className="text-gray-600">{orderData.recipient_phone}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Method</h2>
              <p className="text-gray-600">
                {orderData.delivery_option === "insideDhaka"
                  ? "Inside Dhaka"
                  : "Outside Dhaka"}
              </p>
              <p className="text-gray-600">
                Shipping Cost: ৳{orderData.shipping_cost}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {orderData.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={product.product_photo || "/placeholder.svg"}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ৳{product.unit_price * product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>৳{orderData.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span>৳{orderData.shipping_cost}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>৳{orderData.total}</span>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm print:hidden">
            This invoice was generated automatically. Please keep it for your
            records.
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default Invoice;