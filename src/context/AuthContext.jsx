// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper to safely get item from localStorage
const getStored = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

// Parse user object safely
const getStoredUser = () => {
  const saved = localStorage.getItem("user");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      localStorage.removeItem("user");
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [selectedSite, setSelectedSite] = useState(getStored("selectedSite", ""));
  const [poId, setPoId] = useState(getStored("poId", ""));
  const [poNumber, setPoNumber] = useState(getStored("poNumber", ""));
  const [description, setDescription] = useState(getStored("description", ""));
  const [projectId, setProjectId] = useState(() => {
    const id = getStored("projectId");
    return id ? parseInt(id, 10) : "";
  });
  const [projectName, setProjectName] = useState(getStored("projectName", "")); // Added project name
  const [loading, setLoading] = useState(true);

  // Sync to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("selectedSite", selectedSite);
  }, [selectedSite]);

  useEffect(() => {
    if (poId !== "") localStorage.setItem("poId", poId);
    else localStorage.removeItem("poId");
  }, [poId]);

  useEffect(() => {
    if (poNumber !== "") localStorage.setItem("poNumber", poNumber);
    else localStorage.removeItem("poNumber");
  }, [poNumber]);

  useEffect(() => {
    if (description !== "") localStorage.setItem("description", description);
    else localStorage.removeItem("description");
  }, [description]);

  useEffect(() => {
    if (projectId !== "") localStorage.setItem("projectId", projectId);
    else localStorage.removeItem("projectId");
  }, [projectId]);

  useEffect(() => {
    if (projectName !== "") localStorage.setItem("projectName", projectName);
    else localStorage.removeItem("projectName");
  }, [projectName]); // Added project name sync

  // Simulate auth check (or real API call)
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedSite");
    localStorage.removeItem("poId");
    localStorage.removeItem("poNumber");
    localStorage.removeItem("description");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectName"); // Added project name removal
    setUser(null);
    setSelectedSite("");
    setPoId("");
    setPoNumber("");
    setDescription("");
    setProjectId("");
    setProjectName(""); // Reset project name
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedSite,
        setSelectedSite,
        poId,
        setPoId,
        poNumber,
        setPoNumber,
        description,
        setDescription,
        projectId,
        setProjectId,
        projectName, // Added project name
        setProjectName, // Added project name setter
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;