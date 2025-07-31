"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { MoreHorizontal, Search, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";


type LoanStatus = "Processing" | "Approved" | "Rejected";

interface LoanApplication {
  id: string;
  customerName: string;
  loanType: string;
  amount: number;
  date: string;
  status: LoanStatus;
}

const initialApplications: LoanApplication[] = [
  { id: 'LN-003', customerName: 'Charlie Brown', loanType: 'Mortgage', amount: 250000, date: '2024-07-28', status: 'Processing' },
  { id: 'LN-004', customerName: 'Diana Miller', loanType: 'Personal Loan', amount: 5000, date: '2024-07-27', status: 'Processing' },
  { id: 'LN-005', customerName: 'Ethan Hunt', loanType: 'Auto Loan', amount: 30000, date: '2024-07-26', status: 'Approved' },
  { id: 'LN-006', customerName: 'Fiona Glenanne', loanType: 'Business Loan', amount: 150000, date: '2024-07-25', status: 'Rejected' },
];


export default function LoanManagementPage() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [applications, setApplications] = useState<LoanApplication[]>(initialApplications);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredApplications = applications.filter(app => 
        (app.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || app.status.toLowerCase() === statusFilter)
    );

    const handleStatusChange = (appId: string, newStatus: LoanStatus) => {
        setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
        toast({
            title: `Loan ${newStatus}`,
            description: `Loan application ${appId} has been ${newStatus.toLowerCase()}.`,
        })
    }

    const statusBadges: Record<LoanStatus, string> = {
        Processing: "secondary",
        Approved: "default",
        Rejected: "destructive",
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('loanManagement.title')}</CardTitle>
                <CardDescription>{t('loanManagement.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            type="search" 
                            placeholder={t('loanManagement.searchPlaceholder')}
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder={t('loanManagement.filter.placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('loanManagement.filter.all')}</SelectItem>
                            <SelectItem value="processing">{t('loanManagement.filter.processing')}</SelectItem>
                            <SelectItem value="approved">{t('loanManagement.filter.approved')}</SelectItem>
                            <SelectItem value="rejected">{t('loanManagement.filter.rejected')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('loanManagement.table.id')}</TableHead>
                                <TableHead>{t('loanManagement.table.customer')}</TableHead>
                                <TableHead>{t('loanManagement.table.type')}</TableHead>
                                <TableHead className="hidden md:table-cell">{t('loanManagement.table.amount')}</TableHead>
                                <TableHead className="hidden md:table-cell">{t('loanManagement.table.date')}</TableHead>
                                <TableHead>{t('loanManagement.table.status')}</TableHead>
                                <TableHead className="text-right">{t('loanManagement.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.id}</TableCell>
                                    <TableCell>{app.customerName}</TableCell>
                                    <TableCell>{app.loanType}</TableCell>
                                    <TableCell className="hidden md:table-cell">${app.amount.toLocaleString()}</TableCell>
                                    <TableCell className="hidden md:table-cell">{app.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusBadges[app.status] as any} className={app.status === 'Approved' ? 'bg-green-500/20 text-green-700 border-green-500/20' : ''}>
                                            {t(`loanManagement.status.${app.status.toLowerCase()}`)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0" disabled={app.status !== 'Processing'}>
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Approved')}>
                                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500"/>
                                                    {t('loanManagement.actions.approve')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Rejected')} className="text-destructive">
                                                     <XCircle className="mr-2 h-4 w-4" />
                                                     {t('loanManagement.actions.reject')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}