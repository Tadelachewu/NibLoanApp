import { Chatbot } from "@/components/chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)] max-h-[800px]">
            <div className="lg:col-span-2 h-full">
                <Chatbot />
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                            If you need to speak with a human representative.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">Phone Support</p>
                                <a href="tel:+18001234567" className="text-sm text-primary hover:underline">+1 (800) 123-4567</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">Email Support</p>
                                <a href="mailto:support@xbank.com" className="text-sm text-primary hover:underline">support@xbank.com</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
