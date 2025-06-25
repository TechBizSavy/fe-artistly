"use client";

import React, { useState } from 'react';
import { Eye, MessageSquare, Calendar, DollarSign, Star, Filter, Download, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navigation from '@/components/navigation';

// Mock data for the dashboard
const mockArtists = [
  {
    id: 1,
    name: 'Sarah Johnson',
    category: 'Singer',
    city: 'New York, NY',
    fee: '$500-1000',
    status: 'active',
    joinedDate: '2024-01-15',
    bookings: 12,
    rating: 4.9,
    revenue: 8500,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    category: 'DJ',
    city: 'Los Angeles, CA',
    fee: '$300-800',
    status: 'pending',
    joinedDate: '2024-01-20',
    bookings: 8,
    rating: 4.8,
    revenue: 6200,
  },
  {
    id: 3,
    name: 'Emma Chen',
    category: 'Dancer',
    city: 'Chicago, IL',
    fee: '$400-900',
    status: 'active',
    joinedDate: '2024-01-10',
    bookings: 15,
    rating: 4.9,
    revenue: 11200,
  },
  {
    id: 4,
    name: 'David Thompson',
    category: 'Speaker',
    city: 'Austin, TX',
    fee: '$800-1500',
    status: 'active',
    joinedDate: '2024-01-05',
    bookings: 6,
    rating: 4.7,
    revenue: 9800,
  },
  {
    id: 5,
    name: 'Aria Patel',
    category: 'Singer',
    city: 'San Francisco, CA',
    fee: '$600-1200',
    status: 'inactive',
    joinedDate: '2024-01-25',
    bookings: 4,
    rating: 4.8,
    revenue: 3400,
  },
];

const mockBookingRequests = [
  {
    id: 1,
    artistName: 'Sarah Johnson',
    eventType: 'Wedding',
    clientName: 'John & Mary Smith',
    eventDate: '2024-02-14',
    fee: '$850',
    status: 'pending',
    requestDate: '2024-01-28',
  },
  {
    id: 2,
    artistName: 'Marcus Rodriguez',
    eventType: 'Corporate Event',
    clientName: 'Tech Corp Inc.',
    eventDate: '2024-02-20',
    fee: '$650',
    status: 'confirmed',
    requestDate: '2024-01-26',
  },
  {
    id: 3,
    artistName: 'Emma Chen',
    eventType: 'Birthday Party',
    clientName: 'Lisa Johnson',
    eventDate: '2024-02-10',
    fee: '$750',
    status: 'declined',
    requestDate: '2024-01-25',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'artists' | 'bookings'>('artists');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = mockArtists.filter(artist => {
    const matchesStatus = statusFilter === 'all' || artist.status === statusFilter;
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredBookings = mockBookingRequests.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'default' as const, className: 'bg-green-600 text-white' },
      pending: { label: 'Pending', variant: 'secondary' as const, className: 'bg-yellow-600 text-white' },
      inactive: { label: 'Inactive', variant: 'outline' as const, className: 'border-gray-600 text-gray-400' },
      confirmed: { label: 'Confirmed', variant: 'default' as const, className: 'bg-green-600 text-white' },
      declined: { label: 'Declined', variant: 'destructive' as const, className: 'bg-red-600 text-white' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  // Calculate stats
  const totalArtists = mockArtists.length;
  const activeArtists = mockArtists.filter(a => a.status === 'active').length;
  const totalBookings = mockBookingRequests.length;
  const totalRevenue = mockArtists.reduce((sum, artist) => sum + artist.revenue, 0);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Manager Dashboard</h1>
          <p className="text-gray-400">Manage your artists and track booking requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Artists</p>
                  <p className="text-2xl font-bold text-white">{totalArtists}</p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Artists</p>
                  <p className="text-2xl font-bold text-white">{activeArtists}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Booking Requests</p>
                  <p className="text-2xl font-bold text-white">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Management Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage your artists and booking requests
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('artists')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'artists'
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Artists ({totalArtists})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Booking Requests ({totalBookings})
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all" className="text-white hover:bg-gray-600">All Status</SelectItem>
                    {activeTab === 'artists' ? (
                      <>
                        <SelectItem value="active" className="text-white hover:bg-gray-600">Active</SelectItem>
                        <SelectItem value="pending" className="text-white hover:bg-gray-600">Pending</SelectItem>
                        <SelectItem value="inactive" className="text-white hover:bg-gray-600">Inactive</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="pending" className="text-white hover:bg-gray-600">Pending</SelectItem>
                        <SelectItem value="confirmed" className="text-white hover:bg-gray-600">Confirmed</SelectItem>
                        <SelectItem value="declined" className="text-white hover:bg-gray-600">Declined</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Artists Table */}
            {activeTab === 'artists' && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Artist</TableHead>
                      <TableHead className="text-gray-300">Category</TableHead>
                      <TableHead className="text-gray-300">Location</TableHead>
                      <TableHead className="text-gray-300">Fee Range</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Bookings</TableHead>
                      <TableHead className="text-gray-300">Rating</TableHead>
                      <TableHead className="text-gray-300">Revenue</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArtists.map((artist) => (
                      <TableRow key={artist.id} className="border-gray-700">
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{artist.name}</div>
                            <div className="text-sm text-gray-400">Joined {artist.joinedDate}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{artist.category}</TableCell>
                        <TableCell className="text-gray-300">{artist.city}</TableCell>
                        <TableCell className="text-gray-300">{artist.fee}</TableCell>
                        <TableCell>{getStatusBadge(artist.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {artist.bookings}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-300">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            {artist.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-300">
                            <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                            {artist.revenue.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-700 border-gray-600">
                              <DropdownMenuItem className="text-white hover:bg-gray-600">View Profile</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">Edit Artist</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">View Bookings</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Bookings Table */}
            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Artist</TableHead>
                      <TableHead className="text-gray-300">Event Type</TableHead>
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">Event Date</TableHead>
                      <TableHead className="text-gray-300">Fee</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Requested</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-gray-700">
                        <TableCell>
                          <div className="font-medium text-white">{booking.artistName}</div>
                        </TableCell>
                        <TableCell className="text-gray-300">{booking.eventType}</TableCell>
                        <TableCell className="text-gray-300">{booking.clientName}</TableCell>
                        <TableCell className="text-gray-300">{booking.eventDate}</TableCell>
                        <TableCell className="text-gray-300">{booking.fee}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-gray-300">{booking.requestDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-700 border-gray-600">
                              <DropdownMenuItem className="text-white hover:bg-gray-600">View Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">Accept Request</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">Decline Request</DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">Contact Client</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Empty State */}
            {((activeTab === 'artists' && filteredArtists.length === 0) ||
              (activeTab === 'bookings' && filteredBookings.length === 0)) && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  No {activeTab} found matching your criteria
                </p>
                <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}