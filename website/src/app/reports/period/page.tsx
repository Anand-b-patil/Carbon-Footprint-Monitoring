"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getReportPeriod } from "@/lib/reports/api";
import { Calendar, FileText, AlertCircle, RefreshCw, Clock } from 'lucide-react';

export default function ReportPeriodPage() {
  const [period, setPeriod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPeriod() {
    setLoading(true);
    setError(null);
    try {
      const p = await getReportPeriod();
      setPeriod(p);
    } catch (err) {
      console.error('Report period error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch report period');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute requiredRole="viewer">
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-emerald-900">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-400" />
              Report Period
            </h1>
            <p className="text-gray-400">Current reporting period configuration</p>
          </div>

          {/* Main Content Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 max-w-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Current Reporting Period</h2>
              <p className="text-gray-400 mb-8">
                Click below to fetch the current reporting period configuration from the system.
              </p>

              {/* Action Button */}
              <button
                onClick={fetchPeriod}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors mx-auto mb-8"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Fetching...' : 'Get Current Period'}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 flex items-center gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-red-300 font-medium">Error</p>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Period Result */}
              {period && (
                <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-emerald-300">Active Period</h3>
                  </div>
                  <div className="text-2xl font-bold text-white bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    {period}
                  </div>
                  <p className="text-emerald-400 text-sm mt-2">
                    This is the current reporting period used for emissions calculations and reports.
                  </p>
                </div>
              )}

              {/* Help Text */}
              {!period && !loading && !error && (
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-left">
                  <h4 className="text-blue-300 font-medium mb-2">About Reporting Periods</h4>
                  <p className="text-blue-400 text-sm">
                    The reporting period defines the timeframe used for emissions calculations and compliance reporting. 
                    This configuration affects how data is aggregated and presented in your reports.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
