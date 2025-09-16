"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "Oucler transformed how we monetize our concerts. VR tickets opened up a global audience!",
      author: "Marcus Johnson",
      role: "Concert Promoter",
    },
    {
      quote: "Finally, a platform that lets us charge for premium streaming content. Game changer!",
      author: "Sarah Chen",
      role: "Podcast Creator",
    },
    {
      quote: "Our ticket sales and streaming revenue doubled since switching to Oucler.",
      author: "DJ Phoenix",
      role: "Electronic Music Artist",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-purple-800/30">
          <div className="absolute inset-0 bg-[url('/concert-crowd-silhouettes-with-stage-lights.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-400/30 rounded-full animate-pulse"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-7xl md:text-8xl font-bold mb-8 text-balance bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
            Monetize Your Events
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-6 text-balance animate-fade-in-delay">
            Stop streaming for free. Start earning with
          </p>
          <p className="text-4xl md:text-5xl font-bold mb-12 text-balance bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-delay-2">
            VR Tickets & Premium Access
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-3">
            <Link href="/signup">
              <Button className="px-12 py-6 text-xl font-bold gradient-button border-0 transform hover:scale-105 transition-all duration-300">
                Start Earning Today
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="px-12 py-6 text-xl font-bold border-2 border-purple-400/50 bg-transparent text-white hover:bg-purple-500/20 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-balance">Why Choose Oucler?</h2>
          <p className="text-xl text-purple-200 text-center mb-16 text-balance max-w-3xl mx-auto">
            Transform your events from free entertainment to profitable experiences
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* VR Tickets */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-black border-purple-500/30 p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">VR Tickets</h3>
              <p className="text-purple-200 mb-6">
                Sell immersive VR experiences to global audiences. Let fans attend your events from anywhere in the
                world.
              </p>
              <Button
                variant="outline"
                className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
              >
                Learn More
              </Button>
            </Card>

            {/* Unified Platform */}
            <Card className="bg-gradient-to-br from-pink-900/50 to-black border-pink-500/30 p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Unified Platform</h3>
              <p className="text-purple-200 mb-6">
                Manage ticket sales and streaming access in one place. No more juggling multiple platforms.
              </p>
              <Button
                variant="outline"
                className="border-pink-400/50 text-pink-300 hover:bg-pink-500/20 bg-transparent"
              >
                Learn More
              </Button>
            </Card>

            {/* Creator Monetization */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Creator Economy</h3>
              <p className="text-purple-200 mb-6">
                Monetize podcasts, live sessions, and voice spaces. Turn your audience into paying subscribers.
              </p>
              <Button
                variant="outline"
                className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
              >
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 text-balance">What Creators Are Saying</h2>

          <div className="relative h-48 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentTestimonial
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                }`}
              >
                <blockquote className="text-2xl text-purple-100 mb-6 text-balance">"{testimonial.quote}"</blockquote>
                <cite className="text-lg text-purple-300 font-semibold">{testimonial.author}</cite>
                <p className="text-purple-400">{testimonial.role}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-500" : "bg-purple-500/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[url('/music-festival-stage-with-crowd-and-lights.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-balance">Ready to Transform Your Events?</h2>
          <p className="text-xl text-purple-200 mb-12 text-balance max-w-2xl mx-auto">
            Join thousands of creators who've already started earning more from their content. Stop giving away your
            value for free.
          </p>

          <Link href="/signup">
            <Button className="px-16 py-8 text-2xl font-bold gradient-button border-0 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/30">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black/80 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Oucler
              </h3>
              <p className="text-purple-200">
                Empowering creators to monetize their events and content through innovative technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    VR Tickets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Streaming Access
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Event Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center text-purple-300">
            <p>&copy; 2024 Oucler. All rights reserved. Empowering creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
