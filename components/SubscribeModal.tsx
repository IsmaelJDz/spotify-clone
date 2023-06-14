"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { Price, ProductWithPrice } from "@/types";
import { postData } from "@/libs/helpers";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface ISubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  //return `${priceString} / ${price?.interval}`;
  return priceString;
};

const SubscribeModal: React.FC<ISubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();

  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("You must be logged in to subscribe");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast.error("You are already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className='text-center'>No products available</div>;

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                <div>No prices available</div>
              </div>
            );
          }

          return product.prices.map(price => {
            return (
              <Button
                onClick={() => handleCheckout(price)}
                key={price.id}
                disabled={isLoading || price.id === priceIdLoading}
                className='mb-4'>
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          });
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className='text-center'>Already subscribed</div>;
  }

  return (
    <Modal
      title='Only for premium users'
      description='Subscribe to get access to this feature'
      isOpen={subscribeModal.isOpen}
      onChange={onChange}>
      {content}
    </Modal>
  );
};

export default SubscribeModal;
