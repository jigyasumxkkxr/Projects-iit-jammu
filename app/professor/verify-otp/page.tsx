"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

function VerifyOTPForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/professor/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: values.otp }),
      });

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("authToken", token);
      router.push("/professor/dashboard");
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOTP() {
    setIsLoading(true);
    try {
      router.push("/professor/login");
      setCountdown(60);
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Verification Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className="border-blue-600 focus:ring-blue-600"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="text-blue-500">
                Enter the 6-digit code sent to your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex space-x-2 justify-center items-center">
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  "Verify"
                )}
              </Button>
        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-blue-500">
              Resend code in {countdown} seconds
            </p>
          ) : (
            <Button
              type="button"
              variant="link"
              disabled={isLoading}
              onClick={handleResendOTP}
              className="mx-auto text-blue-600 hover:underline"
            >
              Resend verification code
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500 px-4 py-12">
      <Card className="w-full max-w-md border border-blue-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-500">
            Please check your email for the verification code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <VerifyOTPForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
