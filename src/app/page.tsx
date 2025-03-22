"use client";

import { useState } from "react";
// import { Carousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HomePage() {
  const [testimonials] = useState([
    { name: "Gunjan Singh", text: "Amazing platform to learn!" },
    { name: "Aditya Pal", text: "I love the courses here!" },
    { name: "Saumya Awasthi", text: "Awsome courses as well as instructor!" },
    { name: "Shreya Mehta", text: "Top qualty courses!" },
    { name: "Ayush Saluja", text: "Best platform for beginner!" },
  ]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[70vh] bg-gray-800 text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Learn from the Best Instructors</h1>
        <p className="text-lg mt-2">
          Boost your career with expert-led courses
        </p>
        <Button className="mt-4">Start Learning</Button>
      </section>

      {/* Popular Courses */}
      <section className="w-full p-10">
        <h2 className="text-2xl font-semibold text-center">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">
                <a
                  href="https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  React for Beginners
                </a>
              </h3>
              <p className="text-sm text-gray-500">
                Learn the basics of React.js
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">
                <a
                  href="https://www.youtube.com/watch?v=ZjAqacIC_3c&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Advanced Next.js
                </a>
              </h3>
              <p className="text-sm text-gray-500">
                Master server-side rendering
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">
                <a
                  href="https://www.youtube.com/watch?v=Vi9bxu-M-ag&list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Full-Stack Development
                </a>
              </h3>
              <p className="text-sm text-gray-500">
                Build end-to-end applications
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Students Say
        </h2>
        <div className="overflow-hidden relative w-full max-w-4xl mx-auto">
          <motion.div
            className="flex space-x-6"
            initial={{ x: "10%" }} // ✅ Start closer to the left instead of far right
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", duration: 5, repeat: Infinity }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] bg-white p-6 shadow-lg rounded-2xl text-center"
              >
                <p>{testimonial.text.replace(/"/g, "&quot;")}</p>

                <h4 className="font-semibold mt-3 text-gray-900">
                  - {testimonial.name}
                </h4>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full p-10 bg-blue-600 text-white text-center">
        <h2 className="text-2xl font-semibold">Start Learning Today!</h2>
        <Button className="mt-4 bg-white text-blue-600">Join Now</Button>
      </section>
    </div>
  );
}
