
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarIcon } from "lucide-react";
import { add, format } from "date-fns";

const interestRate = 0.05; // 5% annual interest rate

const repaymentOptions = [
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days (3 months)" },
    { value: "180", label: "180 days (6 months)" },
    { value: "365", label: "1 year" },
    { value: "custom", label: "Custom duration (days)" },
];

export default function ApplyPage() {
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [repaymentDuration, setRepaymentDuration] = useState<string>("30");
    const [customDuration, setCustomDuration] = useState<number>(30);

    const [dueDate, setDueDate] = useState<string>("");
    const [estimatedInterest, setEstimatedInterest] = useState<number>(0);
    const [totalRepayment, setTotalRepayment] = useState<number>(0);

    useEffect(() => {
        const duration = repaymentDuration === "custom" ? customDuration : parseInt(repaymentDuration);
        
        if (loanAmount > 0 && duration > 0) {
            // Calculate Due Date
            const newDueDate = add(new Date(), { days: duration });
            setDueDate(format(newDueDate, "MMMM do, yyyy"));

            // Calculate Interest
            // Simple interest calculation: P * R * T
            const interest = loanAmount * (interestRate / 365) * duration;
            setEstimatedInterest(interest);

            // Calculate Total Repayment
            setTotalRepayment(loanAmount + interest);
        } else {
            setDueDate("");
            setEstimatedInterest(0);
            setTotalRepayment(0);
        }

    }, [loanAmount, repaymentDuration, customDuration]);


    return (
        <div className="flex justify-center items-start w-full">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">New Loan Application</CardTitle>
                    <CardDescription>Please fill out the form below to apply for a new loan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-8">
                        <div className="space-y-4 border-b pb-8">
                            <h3 className="text-lg font-semibold text-primary">1. Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">Full Name</Label>
                                    <Input id="full-name" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 Main St, Anytown, USA" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border-b pb-8">
                            <h3 className="text-lg font-semibold text-primary">2. Loan Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="loan-type">Loan Type</Label>
                                    <Select>
                                        <SelectTrigger id="loan-type">
                                            <SelectValue placeholder="Select a loan type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal Loan</SelectItem>
                                            <SelectItem value="auto">Auto Loan</SelectItem>
                                            <SelectItem value="business">Business Loan</SelectItem>
                                            <SelectItem value="mortgage">Mortgage</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                                    <Input 
                                        id="loan-amount" 
                                        type="number" 
                                        placeholder="e.g., 10000" 
                                        value={loanAmount || ''}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="loan-purpose">Purpose of Loan</Label>
                                <Textarea id="loan-purpose" placeholder="Briefly describe the purpose of your loan..." />
                            </div>
                        </div>

                        <div className="space-y-4 border-b pb-8">
                            <h3 className="text-lg font-semibold text-primary">3. Repayment Details</h3>
                            <div className="space-y-2">
                                <Label>Repayment Duration</Label>
                                <RadioGroup value={repaymentDuration} onValueChange={setRepaymentDuration} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                     {repaymentOptions.map((option) => (
                                        <Label key={option.value} htmlFor={`duration-${option.value}`} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary cursor-pointer">
                                            <RadioGroupItem value={option.value} id={`duration-${option.value}`} />
                                            <span>{option.label}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                            {repaymentDuration === 'custom' && (
                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="custom-duration">Custom Duration (in days)</Label>
                                    <Input 
                                        id="custom-duration" 
                                        type="number" 
                                        placeholder="e.g., 45"
                                        value={customDuration}
                                        onChange={(e) => setCustomDuration(Number(e.target.value))}
                                    />
                                </div>
                            )}

                             {loanAmount > 0 && (
                                <Card className="mt-4 bg-muted/50">
                                    <CardContent className="p-4 space-y-3">
                                        <h4 className="text-md font-semibold text-center">Loan Summary</h4>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            <p className="font-medium text-muted-foreground">Due Date:</p>
                                            <p className="text-right font-semibold">{dueDate || 'N/A'}</p>
                                            
                                            <p className="font-medium text-muted-foreground">Est. Interest:</p>
                                            <p className="text-right font-semibold">${estimatedInterest.toFixed(2)}</p>

                                            <p className="font-medium text-muted-foreground">Total Repayment:</p>
                                            <p className="text-right font-semibold">${totalRepayment.toFixed(2)}</p>
                                        </div>
                                         <p className="text-xs text-muted-foreground text-center pt-2">
                                            *Estimates are based on a {interestRate * 100}% annual interest rate. Actual terms may vary.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                        
                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-primary">4. Document Submission</h3>
                             <CardDescription>Please upload required documents like ID, payslips, bank statements.</CardDescription>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="id-proof">Identification (ID, Passport)</Label>
                                    <Input id="id-proof" type="file" className="file:text-primary file:font-medium" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="income-proof">Proof of Income (Payslips)</Label>
                                    <Input id="income-proof" type="file" className="file:text-primary file:font-medium" />
                                </div>
                             </div>
                        </div>
                        
                        <Button type="submit" size="lg" className="w-full md:w-auto">Submit Application</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

