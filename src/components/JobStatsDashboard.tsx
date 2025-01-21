"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

interface AppliedJob {
  jobId: string;
  status: "pending" | "declined" | "interview";
  _id: string;
}

interface Applicant {
  _id: string;
  name: string;
  email: string;
  appliedJobs: AppliedJob[];
}

interface JobStatsDashboardProps {
  applicant: Applicant;
}

const JobStatsDashboard: React.FC<JobStatsDashboardProps> = ({ applicant }) => {
  const { appliedJobs } = applicant;

  const totalJobs = appliedJobs.length;

  // Count statuses
  const statusCounts = appliedJobs.reduce(
    (acc: Record<string, number>, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const barChartData = [
    { name: "Pending", count: statusCounts.pending || 0 },
    { name: "Interview", count: statusCounts.interview || 0 },
    { name: "Declined", count: statusCounts.declined || 0 },
  ];

  const pieChartData = barChartData.map((item) => ({
    name: item.name,
    value: parseFloat(((item.count / totalJobs) * 100).toFixed(1)), 
  }));

  console.log(pieChartData);
  

  const colors = {
    Pending: "#FCD34D", // Yellow
    Interview: "#34D399", // Green
    Declined: "#EF4444", // Red
  };

  return (
    <div className="w-full items-center space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Interview Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((statusCounts.interview || 0) / totalJobs * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>
              Distribution of application statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count">
                    {barChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[entry.name as keyof typeof colors]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>
              Percentage breakdown of application statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="h-80">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={pieChartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={({ name, value }) => `${name}: ${value}%`}
      >
        {pieChartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[entry.name as keyof typeof colors]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobStatsDashboard;
