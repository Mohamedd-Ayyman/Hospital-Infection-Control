"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";

export default function PoliciesPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [policies, setPolicies] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    version: "",
    documentURL: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll(".fadeUp");
    if (!elements) return;

    Array.from(elements).forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(40px)";
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100 + index * 150);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const [userRes, policiesRes] = await Promise.all([
        fetch("http://localhost:4000/api/user/get-logged-in", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/api/policy/get-all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [userData, policiesData] = await Promise.all([
        userRes.json(),
        policiesRes.json(),
      ]);

      if (userData.success) {
        setUser(userData.data);
      }

      if (policiesData.success) {
        setPolicies(policiesData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.version || !formData.documentURL) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const data = await apiCall("/api/policy/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      if (data.success) {
        setMessage({ text: "Policy created successfully!", type: "success" });
        setShowCreateForm(false);
        setFormData({ title: "", version: "", documentURL: "" });
        fetchData();
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error creating policy", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-7xl mx-auto">
          <div className="fadeUp mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📄</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Infection Control{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                    Policies
                  </span>
                </h1>
                <p className="text-xl text-white opacity-90">
                  View and manage infection control policies
                </p>
              </div>
              {user?.role === "Admin" && (
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  {showCreateForm ? "Cancel" : "+ New Policy"}
                </button>
              )}
            </div>
          </div>

          {message.text && (
            <div className="fadeUp mb-8">
              <div
                className={`${
                  message.type === "success"
                    ? "bg-green-500 border-green-400"
                    : "bg-red-500 border-red-400"
                } bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 border-2 border-opacity-30`}
              >
                <p className="text-white text-center font-medium">
                  {message.text}
                </p>
              </div>
            </div>
          )}

          {showCreateForm && user?.role === "Admin" && (
            <div className="fadeUp bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">+</span> Create New Policy
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Policy Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                      placeholder="e.g., Hand Hygiene Protocol"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Version
                    </label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                      placeholder="e.g., 1.0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">
                    Document URL
                  </label>
                  <input
                    type="url"
                    name="documentURL"
                    value={formData.documentURL}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    placeholder="https://example.com/policy.pdf"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Create Policy
                </button>
              </div>
            </div>
          )}

          <div className="fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📚</span> Active Policies
              </h2>

              {policies.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white text-xl">No policies found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {policies.map((policy) => (
                    <div
                      key={policy._id}
                      className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-20 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center text-2xl">
                            📄
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {policy.title}
                            </h3>
                            <p className="text-sm text-white opacity-70">
                              Version {policy.version} • Created{" "}
                              {new Date(policy.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <a
                          href={policy.documentURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-opacity-20 transition-all"
                        >
                          View Document →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
