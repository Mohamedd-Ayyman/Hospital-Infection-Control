"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";

export default function UserManagementPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [allUsers, setAllUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
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
  }, [activeTab]);

  useEffect(() => {
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const [allUsersRes, pendingUsersRes] = await Promise.all([
        fetch("http://localhost:4000/api/user/get-all-users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/api/user/pending-users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [allUsersData, pendingUsersData] = await Promise.all([
        allUsersRes.json(),
        pendingUsersRes.json(),
      ]);

      if (allUsersData.success) {
        setAllUsers(allUsersData.data);
      }

      if (pendingUsersData.success) {
        setPendingUsers(pendingUsersData.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      const data = await apiCall(`/api/user/approve-user/${userId}`, {
        method: "POST",
      });
      if (data.success) {
        setMessage({ text: "User approved successfully!", type: "success" });
        fetchUsers();
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error approving user", type: "error" });
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500 text-purple-400";
      case "Doctor":
        return "bg-blue-500 text-blue-400";
      case "Nurse":
        return "bg-teal-500 text-teal-400";
      default:
        return "bg-gray-500 text-gray-400";
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
            <div className="mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">👥</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              User{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Manage hospital staff and approve new registrations
            </p>
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

          <div className="fadeUp mb-8">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                  activeTab === "pending"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                    : "bg-white bg-opacity-10 text-black hover:bg-opacity-20"
                }`}
              >
                Pending Approvals ({pendingUsers.length})
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white bg-opacity-10 text-black hover:bg-opacity-20"
                }`}
              >
                All Users ({allUsers.length})
              </button>
            </div>
          </div>

          {activeTab === "pending" && (
            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-yellow-400">⏳</span> Pending Approvals
                </h2>

                {pendingUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-white text-xl">No pending approvals</p>
                    <p className="text-white opacity-70 mt-2">
                      All users have been reviewed
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingUsers.map((user) => (
                      <div
                        key={user._id}
                        className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400 border-opacity-30 hover:bg-opacity-20 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                              👤
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {user.firstname} {user.lastname}
                              </h3>
                              <p className="text-sm text-white opacity-70">
                                {user.email}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span
                                  className={`px-3 py-1 text-xs ${getRoleBadgeColor(
                                    user.role
                                  )}  bg-opacity-20 text-white rounded-full border border-opacity-30 font-semibold`}
                                >
                                  {user.role}
                                </span>
                                <span className="px-3 py-1 text-xs bg-white bg-opacity-10 text-black rounded-full">
                                  {user.department}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleApproveUser(user._id)}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
                          >
                            Approve User
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "all" && (
            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-purple-400">👥</span> All Users
                </h2>

                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <div
                      key={user._id}
                      className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-20 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                            👤
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {user.firstname} {user.lastname}
                            </h3>
                            <p className="text-sm text-white opacity-90">
                              {user.email}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                className={`px-3 py-1 text-xs ${getRoleBadgeColor(
                                  user.role
                                )} bg-opacity-20 text-white rounded-full border border-opacity-30 font-semibold`}
                              >
                                {user.role}
                              </span>
                              {user.department && (
                                <span className="px-3 py-1 text-xs bg-white bg-opacity-10 text-black rounded-full">
                                  {user.department}
                                </span>
                              )}
                              <span
                                className={`px-3 py-1 text-xs ${
                                  user.isApproved
                                    ? "bg-green-500 text-black"
                                    : "bg-yellow-500 text-black"
                                } bg-opacity-20 rounded-full border-white border-1 border-opacity-30 font-semibold`}
                              >
                                {user.isApproved ? "Approved" : "Pending"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-white opacity-70">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
