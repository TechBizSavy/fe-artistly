"use client";

import React from 'react';
import Link from 'next/link';
import { Mic, User, MessageSquare, Music } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  Mic,
  User,
  MessageSquare,
  Music,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || User;

  return (
    <Link href={`/artists?category=${category.id}`}>
      <div className="group cursor-pointer">
        <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 transform -translate-x-6 translate-y-6"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
              <IconComponent className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">{category.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">{category.count} available</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-sm">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;