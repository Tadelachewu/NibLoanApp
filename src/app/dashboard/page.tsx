"use client"

import { BarChart, CreditCard, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { useTranslation } from "@/hooks/use-translation";

const chartData = [
  { month: "January", paid: 1860, due: 800 },
  { month: "February", paid: 3050, due: 2000 },
  { month: "March", paid: 2370, due: 1200 },
  { month: "April", paid: 2730, due: 1900 },
  { month: "May", paid: 2090, due: 1300 },
  { month: "June", paid: 2140, due: 1400 },
];

const chartConfig = {
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  due: {
    label: "Due",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const loans = [
    { id: 'LN-001', type: 'Personal Loan', amount: '$10,000', nextPayment: '2024-08-15', status: 'Active' },
    { id: 'LN-002', type: 'Auto Loan', amount: '$25,000', nextPayment: '2024-08-20', status: 'Active' },
    { id: 'LN-003', type: 'Mortgage', amount: '$250,000', nextPayment: '2024-09-01', status: 'Processing' },
];

export default function DashboardPage() {
    const { t, locale } = useTranslation();
    const translatedChartData = chartData.map(item => ({...item, month: t(`months.${item.month.toLowerCase()}`)}));
    const translatedLoans = loans.map(loan => ({...loan, type: t(`loanTypes.${loan.type.replace(' ', '').toLowerCase()}`), status: t(`loanStatus.${loan.status.toLowerCase()}`)}));


  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('dashboard.totalOutstanding')}</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$285,000.00</div>
                    <p className="text-xs text-muted-foreground">{t('dashboard.acrossLoans', { count: 3 })}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('dashboard.nextPaymentDue')}</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$1,250.50</div>
                    <p className="text-xs text-muted-foreground">{t('dashboard.onDate', { date: 'August 15, 2024' })}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('dashboard.interestRate')}</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5.75%</div>
                    <p className="text-xs text-muted-foreground">{t('dashboard.avgInterestRate')}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('dashboard.creditScore')}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">750</div>
                    <p className="text-xs text-muted-foreground">{t('dashboard.creditStanding')}</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>{t('dashboard.activeLoans')}</CardTitle>
                    <CardDescription>{t('dashboard.activeLoansDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('dashboard.loanId')}</TableHead>
                                <TableHead>{t('dashboard.type')}</TableHead>
                                <TableHead>{t('dashboard.amount')}</TableHead>
                                <TableHead>{t('dashboard.nextPayment')}</TableHead>
                                <TableHead>{t('dashboard.status')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {translatedLoans.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell className="font-medium">{loan.id}</TableCell>
                                    <TableCell>{loan.type}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.nextPayment}</TableCell>
                                    <TableCell>
                                        <Badge variant={loan.status === 'Active' || loan.status === 'ገቢር' ? 'default' : 'secondary'} className={loan.status === 'Active' || loan.status === 'ገቢር' ? 'bg-green-500/20 text-green-700 border-green-500/20' : ''}>{loan.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('dashboard.repaymentProgress')}</CardTitle>
                    <CardDescription>{t('dashboard.repaymentProgressDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{...chartConfig, paid: {...chartConfig.paid, label: t('dashboard.chart.paid')}, due: {...chartConfig.due, label: t('dashboard.chart.due')}}} className="min-h-[200px] w-full">
                        <RechartsBarChart accessibilityLayer data={translatedChartData}>
                             <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                stroke="#888888"
                                fontSize={12}
                                tickFormatter={(value) => locale === 'am' ? value : value.slice(0, 3)}
                            />
                             <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip content={<ChartTooltipContent />} />
                             <Legend />
                            <Bar dataKey="paid" fill="var(--color-paid)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="due" fill="var(--color-due)" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
