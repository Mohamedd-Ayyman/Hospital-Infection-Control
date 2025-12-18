"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeamPage() {
  const contentRef = useRef(null);

  useEffect(() => {
    const elements = gsap.utils.toArray(".fadeUp");

    elements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, []);

  const teamMembers = [
    {
      emoji: "👨‍💻",
      name: "The Code Wizard",
      role: "Full Stack Developer",
      superpower: "Can debug code faster than you can say 'syntax error'",
      quirk: "Drinks 7 cups of coffee daily (and that's just breakfast)",
      funFact:
        "Once spent 3 hours debugging only to realize the server wasn't running",
      skills: ["React Magic", "Node.js Wizardry", "CSS Sorcery"],
    },
    {
      emoji: "🎨",
      name: "The Design Ninja",
      role: "UI/UX Designer",
      superpower: "Makes gradients look better than your future",
      quirk: "Has 47 different shades of teal saved in their palette",
      funFact: "Can spot a misaligned pixel from across the room",
      skills: ["Color Theory Master", "Animation Guru", "User Whisperer"],
    },
    {
      emoji: "🗄️",
      name: "The Database Whisperer",
      role: "Backend Developer",
      superpower:
        "Knows MongoDB aggregations better than their own family tree",
      quirk: "Names their variables after Game of Thrones characters",
      funFact: "Dreams in JSON format",
      skills: ["API Architecture", "Database Optimization", "Schema Designing"],
    },
    {
      emoji: "🐛",
      name: "The Bug Hunter",
      role: "QA Engineer",
      superpower: "Finds bugs before they even exist",
      quirk: "Gets genuinely excited when the app crashes",
      funFact:
        "Has a dedicated folder called 'Hall of Shame' for the weirdest bugs",
      skills: ["Edge Case Detective", "Test Automation", "Breaking Things"],
    },
  ];

  const devJokes = [
    {
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because light attracts bugs! 🐛",
    },
    {
      setup: "How many programmers does it take to change a light bulb?",
      punchline: "None. That's a hardware problem! 💡",
    },
    {
      setup: "What's a programmer's favorite hangout spot?",
      punchline: "The Foo Bar! 🍺",
    },
  ];

  const techStack = [
    { name: "React", emoji: "⚛️", love: "95%" },
    { name: "Next.js", emoji: "▲", love: "98%" },
    { name: "Node.js", emoji: "🟢", love: "92%" },
    { name: "MongoDB", emoji: "🍃", love: "88%" },
    { name: "Tailwind", emoji: "🎨", love: "96%" },
    { name: "GSAP", emoji: "✨", love: "90%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fadeUp">
            <div className="mb-8 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 mx-auto">
                <span className="text-5xl">👋</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Meet The{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dream Team
              </span>
            </h1>
            <p className="text-xl text-purple-100 opacity-90 max-w-3xl mx-auto mb-6">
              The legends who survived countless bugs, infinite coffee, and the
              occasional existential crisis to bring you this masterpiece 😎
            </p>
          </div>
          <div className="fadeUp mb-16">
            <div className="bg-[#6B2E9F] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                🎉 Our Origin Story
              </h2>
              <p className="text-purple-100 text-lg leading-relaxed opacity-90">
                Once upon a time, in a kingdom far, far away (also known as our
                laptops), a group of brave developers decided to tackle the
                noble quest of building a Hospital Infection Control system.
                Armed with keyboards, energy drinks, and an unhealthy amount of
                Stack Overflow tabs, we embarked on this epic journey!
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="fadeUp">
                <div className="bg-[#6B2E9F] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                  <div className="text-center mb-6">
                    <div className="text-7xl mb-4 animate-bounce">
                      {member.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-pink-300 font-semibold">{member.role}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-purple-200 opacity-90 text-sm mb-1">
                        <span className="font-bold text-purple-300">
                          Superpower:
                        </span>{" "}
                        {member.superpower}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-200 opacity-90 text-sm mb-1">
                        <span className="font-bold text-purple-300">
                          Quirk:
                        </span>{" "}
                        {member.quirk}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-200 opacity-90 text-sm mb-1">
                        <span className="font-bold text-purple-300">
                          Fun Fact:
                        </span>{" "}
                        {member.funFact}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-300 font-semibold text-sm mb-2">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-xs text-purple-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="fadeUp mb-16">
            <div className="bg-[#6B2E9F] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                💜 Our Tech Stack Love Affair
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-opacity-20 transition-all"
                  >
                    <div className="text-5xl mb-3">{tech.emoji}</div>
                    <p className="text-white font-bold mb-2">{tech.name}</p>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: tech.love }}
                      ></div>
                    </div>
                    <p className="text-purple-200 text-sm">{tech.love} Love</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="fadeUp mb-16">
            <div className="bg-[#6B2E9F] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                😂 Our Favorite Dev Jokes
              </h2>
              <div className="space-y-6">
                {devJokes.map((joke, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6"
                  >
                    <p className="text-purple-100 text-lg mb-3">{joke.setup}</p>
                    <p className="text-pink-300 text-xl font-bold">
                      {joke.punchline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="fadeUp mb-16">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📊 Project Stats (That We're Proud Of!)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    ∞
                  </div>
                  <p className="text-purple-100 text-sm">
                    Lines of Code Written
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    247
                  </div>
                  <p className="text-purple-100 text-sm">
                    Cups of Coffee Consumed
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    1,337
                  </div>
                  <p className="text-purple-100 text-sm">Bugs Squashed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    42
                  </div>
                  <p className="text-purple-100 text-sm">
                    Late Night Coding Sessions
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fadeUp text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Want to Join Our Crazy Team?
              </h3>
              <p className="text-purple-100 text-lg mb-6 opacity-90">
                We're always looking for talented developers who love coffee,
                memes, and building awesome stuff!
              </p>
              <div className="inline-block px-10 py-5 bg-white text-purple-900 rounded-full text-xl font-bold shadow-xl transform hover:scale-105 hover:rotate-3 transition-all duration-300 cursor-pointer">
                Let's Build Something Amazing! 🚀
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
    </div>
  );
}
