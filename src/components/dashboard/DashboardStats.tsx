import React, { useEffect, useState } from 'react';

interface StatsData {
  church: {
    totalMembers: number;
    weeklyAttendance: number;
    prayerRequests: number;
    upcomingEvents: number;
  };
  business: {
    totalLeads: number;
    conversionRate: number;
    activeProjects: number;
    monthlyVisitors: number;
  };
}

interface DashboardStatsProps {
  siteType: 'church' | 'business';
}

export default function DashboardStats({ siteType }: DashboardStatsProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (siteType === 'church') {
    const churchStats = stats?.church || {
      totalMembers: 0,
      weeklyAttendance: 0,
      prayerRequests: 0,
      upcomingEvents: 0
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={churchStats.totalMembers}
          icon="👥"
          color="blue"
          trend="+12% from last month"
        />
        <StatCard
          title="Weekly Attendance"
          value={churchStats.weeklyAttendance}
          icon="⛪"
          color="green"
          trend="Average this month"
        />
        <StatCard
          title="Prayer Requests"
          value={churchStats.prayerRequests}
          icon="🙏"
          color="purple"
          trend="This week"
        />
        <StatCard
          title="Upcoming Events"
          value={churchStats.upcomingEvents}
          icon="📅"
          color="orange"
          trend="Next 30 days"
        />
      </div>
    );
  }

  // Business stats
  const businessStats = stats?.business || {
    totalLeads: 0,
    conversionRate: 0,
    activeProjects: 0,
    monthlyVisitors: 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Leads"
        value={businessStats.totalLeads}
        icon="📊"
        color="blue"
        trend="+23% from last month"
      />
      <StatCard
        title="Conversion Rate"
        value={`${businessStats.conversionRate}%`}
        icon="📈"
        color="green"
        trend="2% increase"
      />
      <StatCard
        title="Active Projects"
        value={businessStats.activeProjects}
        icon="💼"
        color="purple"
        trend="In progress"
      />
      <StatCard
        title="Monthly Visitors"
        value={businessStats.monthlyVisitors.toLocaleString()}
        icon="👁️"
        color="orange"
        trend="+15% growth"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: string;
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  const bgClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50'
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgClasses[color]} p-3 rounded-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {trend && (
          <span className="text-xs text-gray-500">{trend}</span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}