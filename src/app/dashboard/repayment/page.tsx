"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, CreditCard, Landmark } from "lucide-react";

export default function RepaymentPage() {
    return (
        <div className="flex justify-center items-start w-full">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Make a Repayment</CardTitle>
                    <CardDescription>Choose your preferred payment method to repay your loan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" />Debit Card</TabsTrigger>
                            <TabsTrigger value="transfer"><Landmark className="mr-2 h-4 w-4" />Bank Transfer</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="mt-6">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount to Pay ($)</Label>
                                    <Input id="amount" type="number" placeholder="Enter amount" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry-date">Expiry Date</Label>
                                        <Input id="expiry-date" placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" placeholder="•••" />
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full">Pay Now</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="transfer" className="mt-6">
                            <div className="space-y-4 text-center p-4 border rounded-lg">
                                <Banknote className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="text-lg font-semibold">Bank Transfer Details</h3>
                                <p className="text-muted-foreground text-sm">To complete your payment, please transfer the desired amount to the following bank account:</p>
                                <div className="text-left bg-muted p-4 rounded-md space-y-2">
                                    <p><span className="font-semibold">Bank Name:</span> X Bank</p>
                                    <p><span className="font-semibold">Account Number:</span> 1234567890</p>
                                    <p><span className="font-semibold">Routing Number:</span> 0987654321</p>
                                    <p><span className="font-semibold">Reference:</span> Your Loan ID (e.g., LN-001)</p>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">Please ensure you include your loan ID as the reference to avoid delays.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
