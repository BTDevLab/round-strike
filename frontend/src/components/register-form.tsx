'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateRegisterAccountFields } from '@/lib/utils';
import { Eye, EyeOff, Shield } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import LoadingButton from './ui/LoadingButton';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  // State to track which fields have been touched for validation
  // This helps provide immediate feedback to the user
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  const errors = useMemo(() => validateRegisterAccountFields(formData), [formData]);

  // This function updates the form data state based on user input
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // This function handles user registration by sending a POST request to the API
  const registerUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Registration failed');
    }

    return await res.json();
  };

  // This function handles the form submission, validates input, and calls the registerUser function
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Attempt to register the user
    try {
      await registerUser({
        username: formData.username,
        password: formData.password,
      });
      setSuccess(true);
      // Reset form data after successful registration
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      });
      setTouched({
        username: false,
        password: false,
        confirmPassword: false,
      });
    } catch (err: unknown) {
      // Handle errors from the registration API
      if (err instanceof Error) {
        setError(err.message || 'Registration failed');
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }

    console.log('Registration data:', formData);
  };

  // This memoized value checks if the form is valid for submission
  const isFormValid = useMemo(() => {
    const noErrors = Object.values(errors).every((err) => !err);
    return (
      noErrors && formData.password === formData.confirmPassword && formData.agreeToTerms
    );
  }, [errors, formData.password, formData.confirmPassword, formData.agreeToTerms]);

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Registration Card */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Join the Adventure
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  Create your Round Strike account and begin your epic quest
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Feedback messages */}
              {error && (
                <div className="w-full text-center text-sm text-red-400 bg-red-900/30 rounded px-3 py-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="w-full text-center text-sm text-green-400 bg-green-900/30 rounded px-3 py-2">
                  Registration successful! You can now log in.
                </div>
              )}
              {loading && (
                <div className="w-full text-center text-sm text-purple-300">
                  Creating your account...
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Username Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-white"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose your hero name"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                    className="bg-white/10 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    required
                  />
                  {touched.username && errors.username && (
                    <span className="text-xs text-red-400">{errors.username}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                      className="bg-white/10 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {touched.password && errors.password && (
                    <span className="text-xs text-red-400">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange('confirmPassword', e.target.value)
                      }
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, confirmPassword: true }))
                      }
                      className="bg-white/10 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className="text-xs text-red-400">{errors.confirmPassword}</span>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked: boolean) =>
                        handleInputChange('agreeToTerms', checked as boolean)
                      }
                      className="border-purple-400/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 cursor-pointer"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-gray-300 leading-none"
                    >
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold cursor-pointer"
                  disabled={!isFormValid}
                >
                  {loading ? <LoadingButton /> : 'Create Account'}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-300 text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
