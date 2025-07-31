
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, CreditCard, Landmark } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const otherBanks_en = [
    { id: 'dashen', name: 'Dashen Bank' },
    { id: 'zemen', name: 'Zemen Bank' },
    { id: 'wegagen', name: 'Wegagen Bank' },
    { id: 'berhan', name: 'Berhan Bank' },
    { id: 'oromia', name: 'Oromia Bank' },
    { id: 'enat', name: 'Enat Bank' },
    { id: 'abay', name: 'Abay Bank' },
    { id: 'bunna', name: 'Bunna Bank' },
    { id: 'debub', name: 'Debub Global Bank' },
];

const otherBanks_am = [
    { id: 'dashen', name: 'ዳሽን ባንክ' },
    { id: 'zemen', name: 'ዘመን ባንክ' },
    { id: 'wegagen', name: 'ወጋገን ባንክ' },
    { id: 'berhan', name: 'ብርሃን ባንክ' },
    { id: 'oromia', name: 'ኦሮሚያ ባንክ' },
    { id: 'enat', name: 'እናት ባንክ' },
    { id: 'abay', name: 'አባይ ባንክ' },
    { id: 'bunna', name: 'ቡና ባንክ' },
    { id: 'debub', name: 'ደቡብ ግሎባል ባንክ' },
];


const banksData = {
    en: [
        { id: 'awash', name: 'Awash Bank', fields: { 'Account Number': '1000123456789', 'Account Name': 'X Bank PLC', 'Branch': 'Finfinne' } },
        { id: 'nib', name: 'NIB International Bank', fields: { 'Account Number': '7000987654321', 'Account Name': 'X Bank PLC' } },
        { id: 'abyssinia', name: 'Bank of Abyssinia', fields: { 'Account Number': '1234567890123', 'Account Name': 'X Bank PLC' } },
        { id: 'cbe', name: 'Commercial Bank of Ethiopia (CBE)', fields: { 'Account Number': '1000098765432', 'Account Name': 'X Bank PLC' } },
        { id: 'other', name: 'Other Banks' },
    ],
    am: [
        { id: 'awash', name: 'አዋሽ ባንክ', fields: { 'የሂሳብ ቁጥር': '1000123456789', 'የሂሳብ ስም': 'ኤክስ ባንክ አ.ማ.', 'ቅርንጫፍ': 'ፊንፊኔ' } },
        { id: 'nib', name: 'ኒብ ዓለም አቀፍ ባንክ', fields: { 'የሂሳብ ቁጥር': '7000987654321', 'የሂሳብ ስም': 'ኤክስ ባንክ አ.ማ.' } },
        { id: 'abyssinia', name: 'አቢሲንያ ባንክ', fields: { 'የሂሳብ ቁጥር': '1234567890123', 'የሂሳብ ስም': 'ኤክስ ባንክ አ.ማ.' } },
        { id: 'cbe', name: 'የኢትዮጵያ ንግድ ባንክ (CBE)', fields: { 'የሂሳብ ቁጥር': '1000098765432', 'የሂሳብ ስም': 'ኤክስ ባንክ አ.ማ.' } },
        { id: 'other', name: 'ሌሎች ባንኮች' },
    ]
};

export default function RepaymentPage() {
    const { t, locale } = useTranslation();
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [selectedOtherBank, setSelectedOtherBank] = useState<string | null>(null);

    const handleBankChange = (value: string) => {
        setSelectedBank(value);
        if (value !== 'other') {
            setSelectedOtherBank(null);
        }
    };
    
    const handleOtherBankChange = (value: string) => {
        setSelectedOtherBank(value);
    }

    const banks = banksData[locale as keyof typeof banksData];
    const bankDetails = selectedBank && selectedBank !== 'other' ? banks.find(b => b.id === selectedBank) : null;
    const otherBanks = locale === 'am' ? otherBanks_am : otherBanks_en;

    const otherBankInputFields = {
        en: {
            accountNumber: "Account Number",
            accountName: "Account Name",
            branch: "Bank Branch",
            reference: "Note/Reference (Optional)"
        },
        am: {
            accountNumber: "የሂሳብ ቁጥር",
            accountName: "የሂሳብ ስም",
            branch: "የባንክ ቅርንጫፍ",
            reference: "ማስታወሻ/ማጣቀሻ (አማራጭ)"
        }
    }
    const currentFields = otherBankInputFields[locale as keyof typeof otherBankInputFields];


    return (
        <div className="flex justify-center items-start w-full">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('repayment.title')}</CardTitle>
                    <CardDescription>{t('repayment.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" />{t('repayment.debitCard')}</TabsTrigger>
                            <TabsTrigger value="transfer"><Landmark className="mr-2 h-4 w-4" />{t('repayment.bankTransfer')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="mt-6">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">{t('repayment.card.amount')}</Label>
                                    <Input id="amount" type="number" placeholder={t('repayment.card.amountPlaceholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">{t('repayment.card.cardNumber')}</Label>
                                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry-date">{t('repayment.card.expiryDate')}</Label>
                                        <Input id="expiry-date" placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">{t('repayment.card.cvv')}</Label>
                                        <Input id="cvv" placeholder="•••" />
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full">{t('repayment.card.payNow')}</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="transfer" className="mt-6">
                             <div className="space-y-4">
                                <Label className="text-base font-semibold">{t('repayment.transfer.selectBank')}</Label>
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
                                    <h3 className="text-lg font-semibold">{bankDetails.name} {t('repayment.transfer.detailsTitle')}</h3>
                                    <p className="text-muted-foreground text-sm">{t('repayment.transfer.description')}</p>
                                    <div className="text-left bg-background p-4 rounded-md space-y-2">
                                        {Object.entries(bankDetails.fields!).map(([key, value]) => (
                                            <p key={key}><span className="font-semibold">{key}:</span> {value}</p>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground pt-2">{t('repayment.transfer.disclaimer')}</p>
                                </div>
                            )}

                            {selectedBank === 'other' && (
                                <div className="mt-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="other-bank-select">{t('repayment.transfer.selectOtherBank')}</Label>
                                        <Select onValueChange={handleOtherBankChange}>
                                            <SelectTrigger id="other-bank-select">
                                                <SelectValue placeholder={t('repayment.transfer.selectOtherBankPlaceholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {otherBanks.map(bank => (
                                                    <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedOtherBank && (
                                        <Card className="p-4 space-y-4">
                                             <div className="space-y-2">
                                                <Label htmlFor="other-account-number">{currentFields.accountNumber}</Label>
                                                <Input id="other-account-number" placeholder={t('repayment.transfer.other.accountNumberPlaceholder')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="other-account-name">{currentFields.accountName}</Label>
                                                <Input id="other-account-name" placeholder={t('repayment.transfer.other.accountNamePlaceholder')} />
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="other-branch">{currentFields.branch}</Label>
                                                <Input id="other-branch" placeholder={t('repayment.transfer.other.branchPlaceholder')} />
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="other-reference">{currentFields.reference}</Label>
                                                <Input id="other-reference" placeholder={t('repayment.transfer.other.referencePlaceholder')} />
                                            </div>
                                            <Button className="w-full">{t('repayment.transfer.proceed')}</Button>
                                        </Card>
                                    )}
                                </div>
                            )}


                             {!selectedBank && (
                                <div className="mt-6 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                                    <p>{t('repayment.transfer.selectBankPrompt')}</p>
                                </div>
                             )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
