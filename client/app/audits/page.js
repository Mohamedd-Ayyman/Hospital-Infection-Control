"use client";
import React, { useState, useEffect, useRef } from "react";
import { apiCall } from "@/lib/api";

export default function AuditPage() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [policies, setPolicies] = useState([]);
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    auditType: "",
    department: "",
    complianceScore: "",
    policy: "",
  });

  const [stats, setStats] = useState({
    totalAudits: 0,
    avgCompliance: 0,
    highCompliance: 0,
    lowCompliance: 0,
  });

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
    fetchAudits();
    fetchPolicies();
  }, []);

  const fetchAudits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const data = await apiCall("/api/audits/get-all");

      if (data.success) {
        setAudits(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching audits:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await apiCall("/api/policies/get-all");
      if (data.success) {
        setPolicies(data.data);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const calculateStats = (auditData) => {
    const total = auditData.length;
    const avgCompliance =
      total > 0
        ? (
            auditData.reduce((sum, audit) => sum + audit.complianceScore, 0) /
            total
          ).toFixed(1)
        : 0;
    const highCompliance = auditData.filter(
      (a) => a.complianceScore >= 80
    ).length;
    const lowCompliance = auditData.filter(
      (a) => a.complianceScore < 60
    ).length;

    setStats({
      totalAudits: total,
      avgCompliance,
      highCompliance,
      lowCompliance,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
   
      const data = await apiCall("/api/audits/create");
      if (data.success) {
        alert("Audit created successfully!");
        setShowCreateForm(false);
        setFormData({
          auditType: "",
          department: "",
          complianceScore: "",
          policy: "",
        });
        fetchAudits();
      } else {
        alert(data.message || "Failed to create audit");
      }
    } catch (error) {
      console.error("Error creating audit:", error);
      alert("Error creating audit");
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getComplianceBadge = (score) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-500" };
    if (score >= 60) return { text: "Good", color: "bg-yellow-500" };
    return { text: "Needs Improvement", color: "bg-red-500" };
  };

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
                    <span className="text-4xl">📋</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Audit{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                    Management
                  </span>
                </h1>
                <p className="text-xl text-white opacity-90">
                  Track compliance, monitor performance, and drive continuous
                  improvement
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {showCreateForm ? "Cancel" : "+ New Audit"}
              </button>
            </div>
          </div>

          <div className="fadeUp grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">Total Audits</p>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalAudits}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    Avg Compliance
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.avgCompliance}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    High Compliance
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.highCompliance}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    Needs Attention
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.lowCompliance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showCreateForm && (
            <div className="fadeUp bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">+</span> Create New Audit
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Audit Type
                    </label>
                    <select
                      name="auditType"
                      value={formData.auditType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="">Select Audit Type</option>
                      <option value="Hand Hygiene">Hand Hygiene</option>
                      <option value="Environmental Cleaning">
                        Environmental Cleaning
                      </option>
                      <option value="Sterilization">Sterilization</option>
                      <option value="PPE Compliance">PPE Compliance</option>
                      <option value="Waste Management">Waste Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="">Select Department</option>
                      <option value="ICU">ICU</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="General Ward">General Ward</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Compliance Score (%)
                    </label>
                    <input
                      type="number"
                      name="complianceScore"
                      value={formData.complianceScore}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                      placeholder="Enter score (0-100)"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Related Policy
                    </label>
                    <select
                      name="policy"
                      value={formData.policy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="">Select Policy</option>
                      {policies.map((policy) => (
                        <option key={policy._id} value={policy._id}>
                          {policy.title} (v{policy.version})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Create Audit
                </button>
              </div>
            </div>
          )}

          <div className="fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📋</span> Audit Records
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white mt-4">Loading audits...</p>
                </div>
              ) : audits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white text-xl">No audits found</p>
                  <p className="text-white opacity-70 mt-2">
                    Create your first audit to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {audits.map((audit) => {
                    const badge = getComplianceBadge(audit.complianceScore);
                    return (
                      <div
                        key={audit._id}
                        className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-20 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center text-2xl">
                              📋
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {audit.auditType}
                              </h3>
                              <p className="text-sm text-white opacity-70">
                                {audit.department} • Conducted by{" "}
                                {audit.conductedBy?.firstname}{" "}
                                {audit.conductedBy?.lastname}
                              </p>
                              <p className="text-xs text-white opacity-50 mt-1">
                                {new Date(audit.createdAt).toLocaleDateString()}{" "}
                                at{" "}
                                {new Date(audit.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p
                                className={`text-4xl font-bold ${getComplianceColor(
                                  audit.complianceScore
                                )}`}
                              >
                                {audit.complianceScore}%
                              </p>
                              <span
                                className={`px-3 py-1 text-xs ${badge.color} bg-opacity-20 text-white rounded-full`}
                              >
                                {badge.text}
                              </span>
                            </div>
                          </div>
                        </div>

                        {audit.policy && (
                          <div className="mt-4 pt-4 border-t border-white border-opacity-10">
                            <p className="text-sm text-white opacity-70">
                              Related Policy:{" "}
                              <span className="text-teal-300 font-medium">
                                {audit.policy.title} (v{audit.policy.version})
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
