"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Artist {
  id: number;
  name: string;
  category: string[];
  bio: string;
  priceRange: string;
  location: string;
  languages: string[];
  image: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

interface ArtistCardProps {
  artist: Artist;
  onQuoteRequest?: (artistId: number) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onQuoteRequest }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {artist.featured && (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium px-3 py-1 text-center">
          Featured Artist
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-white">{artist.rating}</span>
          <span className="text-xs text-gray-300">({artist.reviewCount})</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{artist.name}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {artist.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs bg-purple-600 text-white">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{artist.bio}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {artist.location}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <DollarSign className="w-4 h-4 mr-2" />
            {artist.priceRange}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Speaks: {artist.languages.slice(0, 2).join(', ')}
            {artist.languages.length > 2 && ` +${artist.languages.length - 2}`}
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            onClick={() => onQuoteRequest?.(artist.id)}
          >
            Ask for Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;