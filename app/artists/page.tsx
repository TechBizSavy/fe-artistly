"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import ArtistCard from '@/components/artist-card';
import artistsData from '@/data/artists.json';

interface FilterState {
  categories: string[];
  locations: string[];
  priceRanges: string[];
  search: string;
}

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const [artists, setArtists] = useState(artistsData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams?.get('category') ? [searchParams.get('category')!] : [],
    locations: [],
    priceRanges: [],
    search: '',
  });

  const availableCategories = Array.from(
    new Set(artistsData.flatMap(artist => artist.category))
  );
  
  const availableLocations = Array.from(
    new Set(artistsData.map(artist => artist.location))
  );
  
  const availablePriceRanges = Array.from(
    new Set(artistsData.map(artist => artist.priceRange))
  );

  useEffect(() => {
    let filteredArtists = artistsData;

    // Apply filters
    if (filters.search) {
      filteredArtists = filteredArtists.filter(artist =>
        artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        artist.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
        artist.category.some(cat => cat.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.categories.length > 0) {
      filteredArtists = filteredArtists.filter(artist =>
        artist.category.some(cat => filters.categories.includes(cat))
      );
    }

    if (filters.locations.length > 0) {
      filteredArtists = filteredArtists.filter(artist =>
        filters.locations.includes(artist.location)
      );
    }

    if (filters.priceRanges.length > 0) {
      filteredArtists = filteredArtists.filter(artist =>
        filters.priceRanges.includes(artist.priceRange)
      );
    }

    setArtists(filteredArtists);
  }, [filters]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      locations: checked
        ? [...prev.locations, location]
        : prev.locations.filter(l => l !== location)
    }));
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: checked
        ? [...prev.priceRanges, priceRange]
        : prev.priceRanges.filter(p => p !== priceRange)
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      priceRanges: [],
      search: '',
    });
  };

  const handleQuoteRequest = (artistId: number) => {
    // In a real app, this would open a modal or navigate to a booking form
    alert(`Quote request sent for artist ID: ${artistId}`);
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.locations.length > 0 || filters.priceRanges.length > 0;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Artists</h1>
          <p className="text-gray-400">Discover talented performers for your next event</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex-1 max-w-lg">
              <Input
                placeholder="Search artists, categories, locations..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 bg-purple-600 text-white">
                    {filters.categories.length + filters.locations.length + filters.priceRanges.length}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center border border-gray-600 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {filters.categories.map(category => (
                <Badge key={category} variant="secondary" className="cursor-pointer bg-purple-600 text-white hover:bg-purple-700" onClick={() => handleCategoryChange(category, false)}>
                  {category} ×
                </Badge>
              ))}
              {filters.locations.map(location => (
                <Badge key={location} variant="secondary" className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleLocationChange(location, false)}>
                  {location} ×
                </Badge>
              ))}
              {filters.priceRanges.map(range => (
                <Badge key={range} variant="secondary" className="cursor-pointer bg-green-600 text-white hover:bg-green-700" onClick={() => handlePriceRangeChange(range, false)}>
                  {range} ×
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-gray-400 hover:text-white">
                Clear all
              </Button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-white mb-3">Categories</h3>
                  <div className="space-y-2">
                    {availableCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h3 className="font-medium text-white mb-3">Locations</h3>
                  <div className="space-y-2">
                    {availableLocations.map(location => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                        />
                        <label
                          htmlFor={`location-${location}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Ranges */}
                <div>
                  <h3 className="font-medium text-white mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {availablePriceRanges.map(range => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range}`}
                          checked={filters.priceRanges.includes(range)}
                          onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                        />
                        <label
                          htmlFor={`price-${range}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            {artists.length} artist{artists.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Artists Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map(artist => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onQuoteRequest={handleQuoteRequest}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {artists.map(artist => (
              <div key={artist.id} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-6">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{artist.name}</h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {artist.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-xs bg-purple-600 text-white">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{artist.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{artist.location}</span>
                          <span>{artist.priceRange}</span>
                          <span>★ {artist.rating} ({artist.reviewCount})</span>
                        </div>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                        onClick={() => handleQuoteRequest(artist.id)}
                      >
                        Ask for Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No artists found matching your criteria</p>
            <Button onClick={clearFilters} variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}