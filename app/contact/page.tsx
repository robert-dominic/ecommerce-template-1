"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Contact us
        </h1>
        <p className="text-text-muted mb-8">
          Have a question or feedback? Send us a message and we&apos;ll get back
          to you.
        </p>
        {submitted ? (
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <p className="font-semibold text-primary mb-2">Message sent</p>
            <p className="text-gray-600 text-sm">
              Thanks for reaching out. We&apos;ll reply as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-y"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white py-3 rounded-md font-semibold bg-accent-hover transition"
            >
              Send message
            </button>
          </form>
        )}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-text-muted">
            You can also email us directly at{" "}
            <a
              href="mailto:support@otaku.com"
              className="text-accent hover:underline"
            >
              support@otaku.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
