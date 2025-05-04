// components/TopNav.tsx
import React from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import * as Avatar from "@radix-ui/react-avatar";
import { Badge } from 'cb-sting-react-ts';
import {
    Building2,
    ChevronDown,
    Moon,
    Sun,
    Settings,
    LogOut,
    Users,
    UserCircle,
    PlusSquare,
    Monitor,
    ExternalLink,
    Cog,
    Github
} from "lucide-react";

const TopNav = () => {
    // State for AI mode toggle
    const [aiMode, setAiMode] = React.useState(true);

    // State for account dropdown
    const [accountOpen, setAccountOpen] = React.useState(false);

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center space-x-5">
                <h1 className="text-xl font-semibold text-red-500">Revenuebee</h1>

                {/* Company Dropdown Menu */}
                <DropdownMenu.Root onOpenChange={setAccountOpen}>
                    <DropdownMenu.Trigger asChild>
                        <button className="flex items-center space-x-1 rounded-md px-2 py-1 ml-4 focus:outline-none hover:bg-purple-200 ">
                            <span className="flex items-center">
                                <Building2 className="h-5 w-5 mr-1" />
                                Acme Corp
                            </span>
                            <Badge variant={'green'} mode={'dark'}>Live</Badge>

                            <ChevronDown
                                className={`h-4 w-4 ml-1 transition-transform ${accountOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="start"
                            sideOffset={5}
                            className="min-w-[220px] bg-white rounded-md shadow-lg border border-gray-200 p-2 z-50"
                        >
                            <div className="font-medium text-sm p-2">Switch Account</div>

                            {/* Acme Corp Account */}
                            <div className="py-2">
                                <div className="flex items-center px-2 py-1">
                                    <Building2 className="h-5 w-5 mr-2" />
                                    <span>Acme Corp</span>
                                </div>

                                <div className="ml-7 mb-2">
                                    <div className="flex items-center mb-2">
                                        <Github className="h-5 w-5 mr-2" />
                                        <span>Live</span>
                                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full ml-2">
                                            Live
                                        </span>
                                    </div>

                                    <DropdownMenu.Item className="flex items-center pl-7 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                        <UserCircle className="h-5 w-5 mr-2" />
                                        <span>Acme US</span>
                                    </DropdownMenu.Item>

                                    <DropdownMenu.Item className="flex items-center pl-7 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                        <UserCircle className="h-5 w-5 mr-2" />
                                        <span>Acme UK</span>
                                    </DropdownMenu.Item>
                                </div>
                            </div>

                            <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />

                            {/* Xyz Corp Account */}
                            <div className="py-2">
                                <div className="flex items-center px-2 py-1">
                                    <Building2 className="h-5 w-5 mr-2" />
                                    <span>Xyz Corp</span>
                                </div>

                                <div className="ml-7 mb-2">
                                    <div className="flex items-center mb-2">
                                        <Github className="h-5 w-5 mr-2" />
                                        <span>Live</span>
                                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full ml-2">
                                            Live
                                        </span>
                                    </div>

                                    <DropdownMenu.Item className="flex items-center pl-7 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                        <UserCircle className="h-5 w-5 mr-2" />
                                        <span>Xyz India</span>
                                    </DropdownMenu.Item>

                                    <DropdownMenu.Item className="flex items-center pl-7 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                        <UserCircle className="h-5 w-5 mr-2" />
                                        <span>Xyz AU</span>
                                    </DropdownMenu.Item>
                                </div>
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>

            <div className="flex items-center space-x-4">
                {/* AI Mode Toggle */}
                <div className="flex items-center">
                    <span className="mr-2">AI Mode</span>
                    <Switch.Root
                        checked={aiMode}
                        onCheckedChange={setAiMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            aiMode ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                    >
                        <Switch.Thumb
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                aiMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </Switch.Root>
                </div>

                {/* Dark Mode Toggle */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full">
                            <Moon className="h-5 w-5" />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={5}
                            className="min-w-[180px] bg-white rounded-md shadow-lg border border-gray-200 p-2 z-50"
                        >
                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <Moon className="h-5 w-5 mr-2" />
                                <span>Dark Mode</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <Sun className="h-5 w-5 mr-2" />
                                <span>Light Mode</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <Monitor className="h-5 w-5 mr-2" />
                                <span>System Mode</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

                {/* Settings Menu */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="p-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full">
                            <Settings className="h-5 w-5" />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={5}
                            className="min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 p-2 z-50"
                        >
                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <UserCircle className="h-5 w-5 mr-2" />
                                <span>Account Settings</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <Cog className="h-5 w-5 mr-2" />
                                <span>Integration Settings</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <Users className="h-5 w-5 mr-2" />
                                <span>Team Management</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600">
                                <LogOut className="h-5 w-5 mr-2" />
                                <span>Logout</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

                {/* User Avatar */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <span>U</span>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={5}
                            className="min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 p-2 z-50"
                        >
                            <div className="px-4 py-3 text-sm">
                                <div className="font-medium">User Name</div>
                                <div className="text-gray-500">user@example.com</div>
                            </div>

                            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <UserCircle className="h-5 w-5 mr-2" />
                                <span>My Profile</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                <PlusSquare className="h-5 w-5 mr-2" />
                                <span>Create New View</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                            <DropdownMenu.Item className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600">
                                <LogOut className="h-5 w-5 mr-2" />
                                <span>Sign Out</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    );
};

export default TopNav;