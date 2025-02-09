"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false); // Track if the email was sent successfully
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setStatusMessage(null); // Reset the message before making the request
    setIsEmailSent(false); // Reset the email sent flag

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          role: "student", // Ensure the role is sent as "student"
        }),
      });

      if (!response.ok) {
        throw new Error("Password reset request failed");
      }

      setIsEmailSent(true); // Set the email sent flag to true on success
      setStatusMessage("Password reset link has been sent to your email.");
    } catch (error) {
      console.error("Error during password reset:", error);
      setStatusMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-500 px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-teal-600">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="border-teal-600 focus:ring-teal-600 focus:border-teal-600 bg-teal-50/50 pr-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {!isEmailSent ? (
              <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex space-x-2 justify-center items-center">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
            ) : (
              <Alert className="bg-green-50 text-green-600 border-green-200 mt-2">
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
                        )}
                        {statusMessage && !isEmailSent && (
              <Alert
                variant="destructive"
                className="bg-red-50 text-red-600 border-red-200 mt-2"
              >
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
