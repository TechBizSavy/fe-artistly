"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';

const artistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  feeRange: z.string().min(1, 'Please select a fee range'),
  location: z.string().min(2, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  experience: z.string().min(1, 'Please select your experience level'),
  availability: z.array(z.string()).min(1, 'Select your availability'),
});

type ArtistFormData = z.infer<typeof artistSchema>;

const categories = [
  'Singer',
  'Dancer',
  'Speaker',
  'DJ',
  'Instrumentalist',
  'Comedian',
  'Magician',
  'Actor',
  'Choreographer',
  'Producer',
];

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Mandarin',
  'Japanese',
  'Korean',
  'Hindi',
  'Arabic',
  'Russian',
];

const feeRanges = [
  '$100-300',
  '$300-500',
  '$500-800',
  '$800-1200',
  '$1200-2000',
  '$2000+',
];

const experienceLevels = [
  'Beginner (0-2 years)',
  'Intermediate (2-5 years)',
  'Advanced (5-10 years)',
  'Expert (10+ years)',
];

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Mornings',
  'Corporate Events',
  'Private Parties',
  'Weddings',
  'Festivals',
];

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      categories: [],
      languages: [],
      availability: [],
    },
    mode: 'onChange',
  });

  const watchedCategories = watch('categories');
  const watchedLanguages = watch('languages');
  const watchedAvailability = watch('availability');

  const handleCategoryChange = (category: string, checked: boolean) => {
    const current = watchedCategories || [];
    if (checked) {
      setValue('categories', [...current, category]);
    } else {
      setValue('categories', current.filter(c => c !== category));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const current = watchedLanguages || [];
    if (checked) {
      setValue('languages', [...current, language]);
    } else {
      setValue('languages', current.filter(l => l !== language));
    }
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    const current = watchedAvailability || [];
    if (checked) {
      setValue('availability', [...current, option]);
    } else {
      setValue('availability', current.filter(a => a !== option));
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ArtistFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'email', 'phone', 'location'];
        break;
      case 2:
        fieldsToValidate = ['bio', 'categories', 'experience'];
        break;
      case 3:
        fieldsToValidate = ['languages', 'feeRange', 'availability'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ArtistFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Artist onboarding data:', data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center bg-gray-800 border-gray-700">
            <CardContent className="pt-16 pb-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
              <p className="text-gray-400 mb-8">
                Thank you for joining Artistly! We'll review your application and get back to you within 2-3 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/'}>
                  Return to Home
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join as an Artist</h1>
          <p className="text-gray-400">Create your profile and start receiving booking requests</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step <= currentStep
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 h-2 bg-gray-700 rounded-full w-full"></div>
            <div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
                <CardDescription className="text-gray-400">Let's start with your basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Enter your full name"
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+1 (555) 123-4567"
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-gray-300">Location *</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="City, State"
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.location ? 'border-red-500' : ''}`}
                    />
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Professional Details</CardTitle>
                <CardDescription className="text-gray-400">Tell us about your artistic background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bio" className="text-gray-300">Biography *</Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    placeholder="Tell us about your artistic background, experience, and what makes you unique..."
                    rows={4}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.bio ? 'border-red-500' : ''}`}
                  />
                  {errors.bio && (
                    <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">Minimum 50 characters</p>
                </div>

                <div>
                  <Label className="text-gray-300">Categories * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={watchedCategories?.includes(category) || false}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm text-gray-300">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.categories && (
                    <p className="text-red-400 text-sm mt-1">{errors.categories.message}</p>
                  )}
                  {watchedCategories && watchedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {watchedCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="bg-purple-600 text-white">
                          {category}
                          <button
                            type="button"
                            onClick={() => handleCategoryChange(category, false)}
                            className="ml-1 hover:bg-purple-700 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience" className="text-gray-300">Experience Level *</Label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${errors.experience ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level} className="text-white hover:bg-gray-600">
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.experience && (
                    <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Additional Details</CardTitle>
                <CardDescription className="text-gray-400">Complete your profile with languages and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Languages Spoken * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={watchedLanguages?.includes(language) || false}
                          onCheckedChange={(checked) => 
                            handleLanguageChange(language, checked as boolean)
                          }
                        />
                        <Label htmlFor={`language-${language}`} className="text-sm text-gray-300">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.languages && (
                    <p className="text-red-400 text-sm mt-1">{errors.languages.message}</p>
                  )}
                  {watchedLanguages && watchedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {watchedLanguages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-blue-600 text-white">
                          {language}
                          <button
                            type="button"
                            onClick={() => handleLanguageChange(language, false)}
                            className="ml-1 hover:bg-blue-700 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="feeRange" className="text-gray-300">Fee Range *</Label>
                  <Controller
                    name="feeRange"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${errors.feeRange ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your typical fee range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {feeRanges.map((range) => (
                            <SelectItem key={range} value={range} className="text-white hover:bg-gray-600">
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.feeRange && (
                    <p className="text-red-400 text-sm mt-1">{errors.feeRange.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-300">Availability * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {availabilityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`availability-${option}`}
                          checked={watchedAvailability?.includes(option) || false}
                          onCheckedChange={(checked) => 
                            handleAvailabilityChange(option, checked as boolean)
                          }
                        />
                        <Label htmlFor={`availability-${option}`} className="text-sm text-gray-300">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.availability && (
                    <p className="text-red-400 text-sm mt-1">{errors.availability.message}</p>
                  )}
                  {watchedAvailability && watchedAvailability.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {watchedAvailability.map((option) => (
                        <Badge key={option} variant="secondary" className="bg-green-600 text-white">
                          {option}
                          <button
                            type="button"
                            onClick={() => handleAvailabilityChange(option, false)}
                            className="ml-1 hover:bg-green-700 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Review & Submit</CardTitle>
                <CardDescription className="text-gray-400">Review your information before submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-white mb-2">Basic Information</h4>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p><strong className="text-gray-300">Name:</strong> {watch('name')}</p>
                        <p><strong className="text-gray-300">Email:</strong> {watch('email')}</p>
                        <p><strong className="text-gray-300">Phone:</strong> {watch('phone')}</p>
                        <p><strong className="text-gray-300">Location:</strong> {watch('location')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Professional Details</h4>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p><strong className="text-gray-300">Experience:</strong> {watch('experience')}</p>
                        <p><strong className="text-gray-300">Fee Range:</strong> {watch('feeRange')}</p>
                        <p><strong className="text-gray-300">Categories:</strong> {watchedCategories?.join(', ')}</p>
                        <p><strong className="text-gray-300">Languages:</strong> {watchedLanguages?.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Biography</h4>
                    <p className="text-sm text-gray-400">{watch('bio')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Availability</h4>
                    <div className="flex flex-wrap gap-1">
                      {watchedAvailability?.map((option) => (
                        <Badge key={option} variant="outline" className="border-gray-600 text-gray-300">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}