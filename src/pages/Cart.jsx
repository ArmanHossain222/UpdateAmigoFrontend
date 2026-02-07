import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Info,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  TicketPercent,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const sizeGuide = {
  XS: { inch: "36", cm: "91" },
  S: { inch: "38", cm: "97" },
  M: { inch: "40", cm: "102" },
  L: { inch: "42", cm: "107" },
  XL: { inch: "44", cm: "112" },
  XXL: { inch: "46", cm: "117" },
  XXXL: { inch: "48", cm: "122" },
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [itemSizes, setItemSizes] = useState({});
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const sizes = savedCart.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.size || "",
        }),
        {},
      );

      setCart(savedCart);
      setItemSizes(sizes);
      calculateTotal(savedCart);
    };
    loadCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) =>
        sum +
        (item.offer_price
          ? item.offer_price * item.quantity
          : item.regular_price * item.quantity),
      0,
    );
    setTotal(total);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleQuantity = (id, newQty) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item,
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
    setItemSizes((prev) => {
      const newSizes = { ...prev };
      delete newSizes[id];
      return newSizes;
    });
  };

  const handleCheckout = () => {
    if (!cart.every((item) => itemSizes[item.id])) {
      setSizeError(true);
      return;
    }

    const cartWithSizes = cart.map((item) => ({
      ...item,
      size: itemSizes[item.id],
      totalPrice: (item.offer_price || item.regular_price) * item.quantity,
    }));

    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "BDT",
        value: total.toFixed(2),
        items: cart?.map((item) => ({
          item_name: item?.product_name,
          item_id: item?.id,
          price: item?.offer_price,
          quantity: item?.quantity,
        })),
      },
    });

    localStorage.setItem("cart", JSON.stringify(cartWithSizes));
    navigate("/checkout"); // Navigate to the checkout/billing page
  };

  const CartItem = ({ item }) => {
    const price = item.offer_price || item.regular_price;
    const totalPrice = price * item.quantity;
    const discount = item.offer_price
      ? Math.round((1 - item.offer_price / item.regular_price) * 100)
      : 0;

    return (
      <motion.li
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="py-6 border-b border-gray-100 group"
      >
        <div className="flex gap-6">
          <div className="w-32 h-32 flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-100">
            <motion.img
              src={
                item.photos?.[0]?.file_name
                  ? `https://api.amigofabric.com/uploads/products/${item.photos[0].file_name}`
                  : "/placeholder-product.jpg"
              }
              alt={item.product_name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
            {item.offer_price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <TicketPercent size={14} className="mr-1" />
                <span>{discount}% OFF</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-bangla">
                  {item.product_name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Info size={14} className="mr-2" />
                  <span>Category: {item.category_id}</span>
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2 gap-2">
                  <Ruler size={16} className="text-blue-600" />
                  <label className="text-sm font-medium">
                    Size{" "}
                    {!itemSizes[item.id] && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {item.variants?.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setItemSizes((prev) => ({ ...prev, [item.id]: size }));
                        setSizeError(false);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors
                        ${
                          itemSizes[item.id] === size
                            ? "border-blue-500 bg-blue-50 text-blue-600 font-bold"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2 gap-2">
                  <Plus size={16} className="text-blue-600" />
                  <label className="text-sm font-medium">Quantity</label>
                </div>
                <div className="flex items-center border rounded-lg bg-gray-50 w-fit">
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-500"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-500"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-4">
                {item.offer_price && (
                  <span className="text-sm line-through text-gray-400">
                    ৳{item.regular_price}
                  </span>
                )}
                <span className="text-lg font-bold text-blue-600">
                  ৳{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.li>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Ruler className="text-blue-600" />
                  Size Guide
                </h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(sizeGuide).map(([size, measurements]) => (
                  <div key={size} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">{size}</span>
                      <div className="text-right">
                        <p className="text-sm">{measurements.inch}"</p>
                        <p className="text-xs text-gray-500">
                          {measurements.cm} cm
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-bangla">Continue Shopping</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mt-10"
        >
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 mb-8 border-b">
              <h1 className="text-2xl font-bold flex items-center gap-4 mb-4 sm:mb-0">
                <ShoppingCart className="text-blue-600" size={28} />
                <span className="font-bangla">
                  Shopping Cart ({cart.length} items)
                </span>
              </h1>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                <Ruler className="h-5 w-5" />
                <span>Size Guide</span>
              </button>
            </div>

            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <ShoppingCart
                  className="mx-auto text-gray-300 mb-6"
                  size={64}
                />
                <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="mr-2" size={20} />
                  Browse Products
                </Link>
              </motion.div>
            ) : (
              <>
                {sizeError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 bg-red-50 p-4 rounded-lg flex items-center gap-3 border border-red-200"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-600 font-medium">
                      Please select sizes for all items
                    </p>
                  </motion.div>
                )}

                <ul className="space-y-8">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="mt-12 pt-8 border-t">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700
                    transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
