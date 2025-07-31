
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, CreditCard, Landmark } from "lucide-react";

const banks = [
    { 
        id: 'awash', 
        name: 'Awash Bank', 
        fields: { 
            'Account Number': '1000123456789', 
            'Account Name': 'X Bank PLC', 
            'Branch': 'Finfinne' 
        } 
    },
    { 
        id: 'nib', 
        name: 'NIB International Bank', 
        fields: { 
            'Account Number': '7000987654321', 
            'Account Name': 'X Bank PLC' 
        } 
    },
    { 
        id: 'abyssinia', 
        name: 'Bank of Abyssinia', 
        fields: { 
            'Account Number': '1234567890123', 
            'Account Name': 'X Bank PLC' 
        } 
    },
    { 
        id: 'cbe', 
        name: 'Commercial Bank of Ethiopia (CBE)', 
        fields: { 
            'Account Number': '1000098765432', 
            'Account Name': 'X Bank PLC' 
        } 
    },
    { 
        id: 'other', 
        name: 'Other Banks', 
        fields: { 
            'Bank Name': 'Any Other Bank', 
            'Account Number': '9876543210987', 
            'Reference': 'Your Loan ID (e.g., LN-001)' 
        } 
    },
];

export default function RepaymentPage() {
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const handleBankChange = (value: string) => {
        setSelectedBank(value);
    };
    
    const bankDetails = selectedBank ? banks.find(b => b.id === selectedBank) : null;

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
                             <div className="space-y-4">
                                <Label className="text-base font-semibold">Select a Bank</Label>
                                <RadioGroup onValueChange={handleBankChange} value={selectedBank || ''} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {banks.map((bank) => (
                                        <Label key={bank.id} htmlFor={bank.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary cursor-pointer">
                                            <RadioGroupItem value={bank.id} id={bank.id} />
                                            <span>{bank.name}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                            
                            {bankDetails && (
                                <div className="mt-6 space-y-4 text-center p-4 border rounded-lg bg-muted/50">
                                    <Banknote className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold">{bankDetails.name} Transfer Details</h3>
                                    <p className="text-muted-foreground text-sm">To complete your payment, please transfer the desired amount to the following bank account:</p>
                                    <div className="text-left bg-background p-4 rounded-md space-y-2">
                                        {Object.entries(bankDetails.fields).map(([key, value]) => (
                                            <p key={key}><span className="font-semibold">{key}:</span> {value}</p>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground pt-2">Please ensure you include the correct reference to avoid delays.</p>
                                </div>
                            )}

                             {!selectedBank && (
                                <div className="mt-6 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                                    <p>Please select a bank to view payment details.</p>
                                </div>
                             )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
