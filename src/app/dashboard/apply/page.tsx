"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ApplyPage() {
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
                            <h3 className="text-lg font-semibold text-primary">1. Loan Details</h3>
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
                                    <Input id="loan-amount" type="number" placeholder="e.g., 10000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="loan-purpose">Purpose of Loan</Label>
                                <Textarea id="loan-purpose" placeholder="Briefly describe the purpose of your loan..." />
                            </div>
                        </div>

                        <div className="space-y-4 border-b pb-8">
                            <h3 className="text-lg font-semibold text-primary">2. Personal Information</h3>
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

                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-primary">3. Document Submission</h3>
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
