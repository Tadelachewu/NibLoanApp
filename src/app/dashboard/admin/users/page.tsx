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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { MoreHorizontal, PlusCircle, Search, Trash2, Edit, UserPlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type UserRole = "Customer" | "Loan Officer" | "Admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  avatar: string;
}

const initialUsers: User[] = [
  { id: 'USR-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', lastLogin: '2024-07-29 10:00 AM', avatar: 'https://placehold.co/100x100.png' },
  { id: 'USR-002', name: 'Bob Williams', email: 'bob@example.com', role: 'Loan Officer', lastLogin: '2024-07-29 09:30 AM', avatar: 'https://placehold.co/100x100.png' },
  { id: 'USR-003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', lastLogin: '2024-07-29 08:00 AM', avatar: 'https://placehold.co/100x100.png' },
  { id: 'USR-004', name: 'Diana Miller', email: 'diana@example.com', role: 'Customer', lastLogin: '2024-07-28 05:45 PM', avatar: 'https://placehold.co/100x100.png' },
];


export default function UserManagementPage() {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const handleAddNewUser = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleSaveUser = (formData: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => {
        if (editingUser) {
            // Update existing user
            setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...formData } : u));
        } else {
            // Add new user
            const newUser: User = {
                id: `USR-${String(users.length + 1).padStart(3, '0')}`,
                ...formData,
                lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
                avatar: 'https://placehold.co/100x100.png',
            };
            setUsers([...users, newUser]);
        }
        setIsFormOpen(false);
        setEditingUser(null);
    };

    const roleBadges: Record<UserRole, string> = {
        Admin: "destructive",
        'Loan Officer': "secondary",
        Customer: "default",
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('userManagement.title')}</CardTitle>
                <CardDescription>{t('userManagement.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4 gap-2">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            type="search" 
                            placeholder={t('userManagement.searchPlaceholder')}
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAddNewUser}><UserPlus className="mr-2 h-4 w-4" />{t('userManagement.addUser')}</Button>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('userManagement.table.name')}</TableHead>
                                <TableHead>{t('userManagement.table.email')}</TableHead>
                                <TableHead>{t('userManagement.table.role')}</TableHead>
                                <TableHead className="hidden md:table-cell">{t('userManagement.table.lastLogin')}</TableHead>
                                <TableHead className="text-right">{t('userManagement.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={roleBadges[user.role] as any}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    {t('userManagement.table.edit')}
                                                </DropdownMenuItem>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" className="w-full justify-start text-sm font-normal text-destructive hover:bg-destructive/10 hover:text-destructive px-2 py-1.5 relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('userManagement.table.delete')}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>{t('userManagement.form.deleteConfirmTitle')}</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                               {t('userManagement.form.deleteConfirmText')}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>{t('userManagement.form.cancel')}</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                                                {t('userManagement.form.deleteConfirmButton')}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <UserForm 
                    isOpen={isFormOpen} 
                    setIsOpen={setIsFormOpen}
                    user={editingUser} 
                    onSave={handleSaveUser}
                />
            </CardContent>
        </Card>
    );
}

interface UserFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    user: User | null;
    onSave: (formData: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => void;
}

function UserForm({ isOpen, setIsOpen, user, onSave }: UserFormProps) {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('Customer');

    // Effect to populate form when editing
    useState(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        } else {
            // Reset for new user
            setName('');
            setEmail('');
            setRole('Customer');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, email, role });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user ? t('userManagement.form.editUserTitle') : t('userManagement.form.addUserTitle')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('userManagement.form.name')}</Label>
                            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder={t('userManagement.form.namePlaceholder')} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('userManagement.form.email')}</Label>
                            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('userManagement.form.emailPlaceholder')} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">{t('userManagement.form.role')}</Label>
                            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder={t('userManagement.form.selectRole')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Customer">{t('userManagement.form.roleCustomer')}</SelectItem>
                                    <SelectItem value="Loan Officer">{t('userManagement.form.roleLoanOfficer')}</SelectItem>
                                    <SelectItem value="Admin">{t('userManagement.form.roleAdmin')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>{t('userManagement.form.cancel')}</Button>
                        <Button type="submit">{t('userManagement.form.save')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

