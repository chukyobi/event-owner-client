"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react"

type AccountType = "individual" | "company"
type CompanyRole = "company" | "promoter"
type Step = "account-type" | "company-info" | "credentials" | "personal-details"

interface FormData {
  accountType: AccountType
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  companyName: string
  contactPerson: string
  phoneNumber: string
  role: CompanyRole
}

const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  let strength = 0

  if (password.length >= 8) strength += 1
  if (/[a-z]/.test(password)) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1

  if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" }
  if (strength <= 3) return { strength, label: "Fair", color: "bg-yellow-500" }
  return { strength, label: "Strong", color: "bg-purple-500" }
}

export default function SignupPage(): ReactElement {
  const [currentStep, setCurrentStep] = useState<Step>("account-type")
  const [formData, setFormData] = useState<FormData>({
    accountType: "individual",
    email: "",
    password: "",
    confirmPassword: "", // Added confirm password field
    firstName: "",
    lastName: "",
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    role: "company",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // Added confirm password visibility state
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep === "account-type" && formData.accountType) {
      if (formData.accountType === "company") {
        setCurrentStep("company-info")
      } else {
        setCurrentStep("credentials")
      }
    } else if (currentStep === "company-info") {
      setCurrentStep("credentials")
    } else if (currentStep === "credentials") {
      setCurrentStep("personal-details")
    }
  }

  const handleBack = () => {
    if (currentStep === "personal-details") {
      setCurrentStep("credentials")
    } else if (currentStep === "credentials") {
      if (formData.accountType === "company") {
        setCurrentStep("company-info")
      } else {
        setCurrentStep("account-type")
      }
    } else if (currentStep === "company-info") {
      setCurrentStep("account-type")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)

    const submitData = {
      ownerType: formData.accountType.toUpperCase(),
      email: formData.email,
      password: formData.password,
      firstName: formData.accountType === "individual" ? formData.firstName : null,
      lastName: formData.accountType === "individual" ? formData.lastName : null,
      companyName: formData.accountType === "company" ? formData.companyName : null,
      contactPerson: formData.accountType === "company" ? formData.contactPerson : null,
      phoneNumber: formData.phoneNumber,
      role: formData.accountType === "individual" ? "INDIVIDUAL" : formData.role.toUpperCase(),
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", submitData)
    setIsLoading(false)
  }

  const passwordStrength = calculatePasswordStrength(formData.password)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const getStepNumber = (step: Step) => {
    if (formData.accountType === "individual") {
      switch (step) {
        case "account-type":
          return 1
        case "credentials":
          return 2
        case "personal-details":
          return 3
        default:
          return 1
      }
    } else {
      switch (step) {
        case "account-type":
          return 1
        case "company-info":
          return 2
        case "credentials":
          return 3
        case "personal-details":
          return 4
        default:
          return 1
      }
    }
  }

  const getCurrentStepIndex = () => {
    const steps =
      formData.accountType === "individual"
        ? ["account-type", "credentials", "personal-details"]
        : ["account-type", "company-info", "credentials", "personal-details"]
    return steps.indexOf(currentStep)
  }

  const getTotalSteps = () => {
    return formData.accountType === "individual" ? 3 : 4
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Image/Gradient */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Event Grid Image */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/event-grid.png"
            alt="Event grid showcasing various concerts and events"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 text-balance">Create Unforgettable Events</h1>
            <p className="text-xl text-purple-200 text-balance max-w-md">
              Join thousands of event organizers and promoters who trust Oucler to bring their vision to life.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background h-full">
        <div className="w-full max-w-md h-full flex flex-col justify-center">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {Array.from({ length: getTotalSteps() }, (_, index) => {
                const stepIndex = index
                const currentIndex = getCurrentStepIndex()
                const isCompleted = stepIndex < currentIndex
                const isCurrent = stepIndex === currentIndex

                return (
                  <React.Fragment key={index}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isCurrent || isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    {index < getTotalSteps() - 1 && (
                      <div
                        className={`w-12 h-0.5 transition-colors ${
                          stepIndex < currentIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Oucler</h1>
            <p className="text-muted-foreground">
              {currentStep === "account-type"
                ? "Please select your account type to get started"
                : currentStep === "company-info"
                  ? "Tell us about your company"
                  : currentStep === "credentials"
                    ? "Set up your login credentials"
                    : "Complete your personal information"}
            </p>
          </div>

          {/* Form Content with Sliding Animation */}
          <div className="relative overflow-hidden flex-1 flex flex-col">
            <AnimatePresence mode="wait" custom={getCurrentStepIndex()}>
              {currentStep === "account-type" && (
                <motion.div
                  key="account-type"
                  custom={0}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label htmlFor="accountType" className="text-base font-medium">
                      Account Type
                    </Label>
                    <Select
                      value={formData.accountType}
                      onValueChange={(value: AccountType) => handleInputChange("accountType", value)}
                    >
                      <SelectTrigger className="h-14 text-base border-2 focus:border-primary">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual" className="text-base py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">Individual</span>
                            <span className="text-sm text-muted-foreground">Personal event organizer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="company" className="text-base py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">Company</span>
                            <span className="text-sm text-muted-foreground">Business or organization</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.accountType && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        onClick={handleNext}
                        className="w-full h-14 text-lg font-semibold gradient-button border-0"
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === "company-info" && (
                <motion.div
                  key="company-info"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium">
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Your company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          className="h-12 border-2 focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="text-sm font-medium">
                          Contact Person
                        </Label>
                        <Input
                          id="contactPerson"
                          placeholder="Primary contact name"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                          className="h-12 border-2 focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">
                          Company Role
                        </Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value: CompanyRole) => handleInputChange("role", value)}
                        >
                          <SelectTrigger className="h-12 border-2 focus:border-primary">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="promoter">Promoter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-4">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1 h-12 border-2 bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 h-12 text-lg font-semibold gradient-button border-0"
                        disabled={!formData.companyName || !formData.contactPerson || !formData.role}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === "credentials" && (
                <motion.div
                  key="credentials"
                  custom={formData.accountType === "company" ? 2 : 1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
                    <div className="space-y-5">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12 border-2 focus:border-primary"
                          required
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="h-12 pr-12 border-2 focus:border-primary"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>

                        {formData.password && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Password strength</span>
                              <span
                                className={`font-medium ${
                                  passwordStrength.label === "Weak"
                                    ? "text-red-500"
                                    : passwordStrength.label === "Fair"
                                      ? "text-yellow-500"
                                      : "text-purple-500"
                                }`}
                              >
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={`h-12 pr-12 border-2 focus:border-primary ${
                              formData.confirmPassword && formData.password !== formData.confirmPassword
                                ? "border-red-500 focus:border-red-500"
                                : ""
                            }`}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500">Passwords do not match</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="pt-6 space-y-4">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1 h-12 border-2 bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 h-12 text-lg font-semibold gradient-button border-0"
                        disabled={
                          !formData.email || !formData.password || formData.password !== formData.confirmPassword
                        }
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === "personal-details" && (
                <motion.div
                  key="personal-details"
                  custom={formData.accountType === "company" ? 3 : 2}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Personal Details for Individual */}
                      {formData.accountType === "individual" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium">
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              placeholder="First name"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              className="h-12 border-2 focus:border-primary"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium">
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              placeholder="Last name"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              className="h-12 border-2 focus:border-primary"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder={
                            formData.accountType === "individual" ? "Your phone number" : "Company phone number"
                          }
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className="h-12 border-2 focus:border-primary"
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="pt-6 space-y-4">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1 h-12 border-2 bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex-1 h-12 text-lg font-semibold gradient-button border-0"
                        disabled={
                          isLoading ||
                          (formData.accountType === "individual" && (!formData.firstName || !formData.lastName)) ||
                          !formData.phoneNumber
                        }
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <a href="/login" className="text-primary hover:underline font-medium">
                        Sign in here
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
