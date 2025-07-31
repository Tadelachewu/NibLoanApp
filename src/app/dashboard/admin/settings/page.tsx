"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/use-translation";
import { X } from "lucide-react";

export default function SettingsPage() {
    const { t } = useTranslation();
    
    // Mock state for settings
    const [minLoanAmount, setMinLoanAmount] = useState(1000);
    const [maxLoanAmount, setMaxLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(5.0);
    const [repaymentDurations, setRepaymentDurations] = useState([
        { id: 1, days: 7, enabled: true },
        { id: 2, days: 14, enabled: true },
        { id: 3, days: 30, enabled: true },
        { id: 4, days: 90, enabled: true },
        { id: 5, days: 180, enabled: true },
        { id: 6, days: 365, enabled: true },
    ]);
    const [allowCustomDuration, setAllowCustomDuration] = useState(true);
    const [aiLearning, setAiLearning] = useState(true);

    const handleDurationToggle = (id: number) => {
        setRepaymentDurations(durations => 
            durations.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d)
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{t('systemSettings.title')}</h1>
                <p className="text-muted-foreground">{t('systemSettings.description')}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('systemSettings.loanTerms.title')}</CardTitle>
                        <CardDescription>{t('systemSettings.loanTerms.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="min-amount">{t('systemSettings.loanTerms.minAmount')}</Label>
                                <Input id="min-amount" type="number" value={minLoanAmount} onChange={e => setMinLoanAmount(Number(e.target.value))} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="max-amount">{t('systemSettings.loanTerms.maxAmount')}</Label>
                                <Input id="max-amount" type="number" value={maxLoanAmount} onChange={e => setMaxLoanAmount(Number(e.target.value))} />
                            </div>
                        </div>
                         <div className="space-y-4">
                            <Label>{t('systemSettings.loanTerms.repaymentOptions')}</Label>
                            <div className="space-y-3">
                                {repaymentDurations.map(duration => (
                                    <div key={duration.id} className="flex items-center justify-between p-2 rounded-md border">
                                        <Label htmlFor={`duration-${duration.id}`} className="font-normal">{duration.days} {t('systemSettings.loanTerms.days')}</Label>
                                        <Switch id={`duration-${duration.id}`} checked={duration.enabled} onCheckedChange={() => handleDurationToggle(duration.id)} />
                                    </div>
                                ))}
                                <div className="flex items-center justify-between p-2 rounded-md border">
                                    <Label htmlFor="custom-duration" className="font-normal">{t('systemSettings.loanTerms.allowCustom')}</Label>
                                    <Switch id="custom-duration" checked={allowCustomDuration} onCheckedChange={setAllowCustomDuration} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button>{t('systemSettings.saveChanges')}</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('systemSettings.interestRates.title')}</CardTitle>
                            <CardDescription>{t('systemSettings.interestRates.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="interest-rate">{t('systemSettings.interestRates.annualRate')}</Label>
                                <Input id="interest-rate" type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>{t('systemSettings.saveChanges')}</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('systemSettings.aiSettings.title')}</CardTitle>
                            <CardDescription>{t('systemSettings.aiSettings.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="flex items-center justify-between p-2 rounded-md border">
                                <Label htmlFor="ai-learning" className="font-normal leading-snug">{t('systemSettings.aiSettings.enableLearning')}</Label>
                                <Switch id="ai-learning" checked={aiLearning} onCheckedChange={setAiLearning} />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>{t('systemSettings.saveChanges')}</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
