import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Loader,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    delivery_option: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carts") || "[]");
    if (savedCart.length === 0) {
      navigate("/");
    }
    setCartProducts(savedCart);
  }, [navigate]);

  const validateForm = () => {
    const errorMessages = {};
    const phoneRegex = /^01\d{9}$/;

    if (!formData.recipient_name) {
      errorMessages.recipient_name = "নাম প্রয়োজন / Name is required";
    }
    if (!formData.recipient_address) {
      errorMessages.recipient_address = "ঠিকানা প্রয়োজন / Address is required";
    }
    if (!phoneRegex.test(formData.recipient_phone)) {
      errorMessages.recipient_phone =
        "সঠিক মোবাইল নম্বর লিখুন / Valid Bangladeshi phone number required";
    }
    if (!formData.delivery_option) {
      errorMessages.delivery_option =
        "ডেলিভারি অপশন নির্বাচন করুন / Select delivery option";
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const calculateTotals = () => {
    const subtotal = cartProducts.reduce((sum, item) => {
      const price = item.offer_price || item.regular_price;
      return sum + parseFloat(price) * parseInt(item.quantity);
    }, 0);

    const shipping =
      formData.delivery_option === "Inside Dhaka"
        ? 60
        : formData.delivery_option === "Outside Dhaka"
        ? 120
        : 0;

    return {
      subtotal,
      shipping_cost: shipping,
      total: subtotal + shipping,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { subtotal, shipping_cost, total } = calculateTotals();

      const orderData = {
        ...formData,
        products: cartProducts.map((product) => ({
          product_id: product.id,
          product_name: product.product_name,
          quantity: product.quantity,
          variants: product.size,
          unit_price:
            product.unit_price || product.offer_price || product.regular_price,
          product_photo:
            product.photos?.[0]?.file_name ||
            product.product_photo ||
            "default-product.jpg",
        })),
        subtotal,
        shipping_cost,
        total,
        order_date: new Date().toISOString(),
        order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };

      const response = await fetch("https://api.amigofabric.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Order submission failed");

      setOrderDetails(orderData);
      setShowModal(true);
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
      localStorage.removeItem("carts");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const InvoiceModal = ({ order, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full overflow-hidden"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                <span>Order Confirmed!!</span>
              </h2>
              <p className="text-gray-600 mt-1">Thank you for your purchase</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>{new Date(order.order_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ShoppingBag size={18} className="mr-2" />
                <span>{order.order_number}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Truck size={18} className="mr-2" />
                <span>{order.delivery_option}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">Variant</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{product.product_name}</td>
                    <td className="px-4 py-3 text-center">
                      {product.variants}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ৳{product.unit_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>৳{order.shipping_cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-3">
              <span>Total:</span>
              <span>৳{order.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b">
              <ShoppingBag className="text-indigo-600 w-8 h-8" />
              <h1 className="text-2xl font-bold">Billing Information</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    নাম (Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="recipient_name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                    placeholder="আপনার পুরো নাম লিখুন"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.recipient_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipient_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    মোবাইল নম্বর (Phone) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="recipient_phone"
                    value={formData.recipient_phone}
                    onChange={handleChange}
                    placeholder="০১XXXXXXXXX"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.recipient_phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipient_phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    ঠিকানা (Address) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="recipient_address"
                    value={formData.recipient_address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="রোড নম্বর, বাড়ি নম্বর, এলাকা"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipient_address
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.recipient_address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipient_address}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    ডেলিভারি অপশন (Delivery Options)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        value: "Inside Dhaka",
                        label: "ঢাকার ভিতরে",
                        price: 60,
                      },
                      {
                        value: "Outside Dhaka",
                        label: "ঢাকার বাহিরে",
                        price: 120,
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.delivery_option === option.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery_option"
                            value={option.value}
                            checked={formData.delivery_option === option.value}
                            onChange={handleChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-gray-500">
                              ৳{option.price}
                            </p>
                          </div>
                        </div>
                        <Truck className="text-gray-400" />
                      </label>
                    ))}
                  </div>
                  {errors.delivery_option && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.delivery_option}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {cartProducts.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://api.amigofabric.com/uploads/products/${item.photos[0].file_name}`}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.variants || item.size} | Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ৳
                        {(
                          (item.offer_price || item.regular_price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{calculateTotals().subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>৳{calculateTotals().shipping_cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>৳{calculateTotals().total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "অর্ডার সম্পন্ন করুন (Place Order)"
                )}
              </button>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {showModal && orderDetails && (
            <InvoiceModal
              order={orderDetails}
              onClose={() => setShowModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderPage;
