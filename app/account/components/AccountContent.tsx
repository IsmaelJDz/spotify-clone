"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectCustomerPortal = async () => {
    setLoading(true);

    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });

      window.location.assign(url);
    } catch (error) {
      if (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    }

    setLoading(false);
  };

  return (
    <div className='px-6 mb-7'>
      {!subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className='w-[300px]'>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>
            You are subscribed to the{" "}
            <span className='font-bold'>
              {subscription?.prices?.products?.name}
            </span>{" "}
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectCustomerPortal}
            className='w-[300px]'>
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
