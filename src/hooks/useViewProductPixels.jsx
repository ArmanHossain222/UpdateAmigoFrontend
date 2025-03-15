import { useEffect } from "react";

export default function useViewProductPixels({
  productName,
  productId,
  productPrice,
  productBrand,
  productCategory,
}) {
  useEffect(() => {
    if (!productId) {
      return;
    }
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_name: productName,
            item_id: productId,
            price: productPrice,
            item_brand: productBrand,
            item_category: productCategory,
          },
        ],
      },
    });
  }, [productName, productId, productPrice, productBrand, productCategory]);
}
