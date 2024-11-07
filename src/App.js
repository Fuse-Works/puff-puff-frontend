// App.js
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import VerificationRequets from './VerificationRequests'
import PurchaseHistory from './PurchaseHistory'
import TopUpHistory from './TopUpHistory'

function App() {
  // Placeholder for authentication logic
  const isAuthenticated = true; // Change this based on actual authentication state

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to SignIn if not authenticated, otherwise show Dashboard */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protect the Dashboard route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/verification-requests"
          element={isAuthenticated ? <VerificationRequets /> : <Navigate to="/verification-requests" />}
        />

        <Route
          path="/purchase-history"
          element={isAuthenticated ? <PurchaseHistory /> : <Navigate to="/purchase-history" />}
        />

        <Route
          path="/top-up-history"
          element={isAuthenticated ? <TopUpHistory /> : <Navigate to="/top-up-history" />}
        />

        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
