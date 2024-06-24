"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "@/config/firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function CreateBusiness() {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    console.log("User from Kinde: ", user);
  }, [user]);

  const sendBusinessToDb = async ({ businessName, user }) => {
    const userName = `${user.given_name} ${user.family_name}`;
    const docRef = await setDoc(doc(db, "Business", user.email), {
      businessName: businessName,
      email: user.email,
      userName: userName,
    }).then((response) => {
      console.log("new business created");
      toast({
        description: `New Business ${businessName} created!`,
      });
      router.replace("/dashboard");
    });
  };

  return (
    <div className="flex items-center justify-centerm mt-20 flex-col">
      <Image src="/logo.svg" width={100} height={100} alt="logo" />
      <div className="flex flex-col gap-y-6 mt-20">
        <div>
          <h1 className="text-3xl font-semibold">
            What should we call your business?
          </h1>
          <p className="text-muted-foreground mt-2">
            You can always change your business name from your settings page
          </p>
        </div>
        <Input
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <Button
          size="lg"
          onClick={() => sendBusinessToDb({ businessName, user })}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;
