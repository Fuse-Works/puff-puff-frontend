import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../SignIn';
import Dashboard from '../Dashboard';
import VerificationRequets from '../VerificationRequests'
import PurchaseHistory from '../PurchaseHistory'
import TopUpHistory from '../TopUpHistory'
import SignUp from '../SignUp';
import AgentUsers from '../AgentUsers';


const Navigation = () => {
  const isAuthenticated = true;
  return (
    <>

      <Routes>
        {/* Redirect to SignIn if not authenticated, otherwise show Dashboard */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/signin" /> : <SignIn />} />
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


        <Route
          path="/signup"
          element={isAuthenticated ? <SignUp /> : <Navigate to="/signup" />}
        />

        <Route
          path="/agent-users"
          element={isAuthenticated ? <AgentUsers /> : <Navigate to="/agent-users" />}
        />

        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </>
  )
}

export default Navigation