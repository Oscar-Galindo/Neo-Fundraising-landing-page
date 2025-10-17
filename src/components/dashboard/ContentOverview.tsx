import React, { useEffect, useState } from 'react';

interface ContentStats {
  church: {
    sermons: number;
    events: number;
    blogPosts: number;
    pages: number;
  };
  business: {
    services: number;
    blogPosts: number;
    portfolio: number;
    pages: number;
  };
}

interface ContentOverviewProps {
  siteType: 'church' | 'business';
}

export default function ContentOverview({ siteType }: ContentOverviewProps) {
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching content stats from Contentful
    setTimeout(() => {
      setStats({
        church: {
          sermons: 156,
          events: 24,
          blogPosts: 89,
          pages: 12
        },
        business: {
          services: 8,
          blogPosts: 45,
          portfolio: 23,
          pages: 10
        }
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const churchContent = [
    {
      label: 'Sermons',
      count: stats?.church.sermons || 0,
      percentage: 45,
      color: 'blue'
    },
    {
      label: 'Events',
      count: stats?.church.events || 0,
      percentage: 15,
      color: 'green'
    },
    {
      label: 'Blog Posts',
      count: stats?.church.blogPosts || 0,
      percentage: 30,
      color: 'purple'
    },
    {
      label: 'Pages',
      count: stats?.church.pages || 0,
      percentage: 10,
      color: 'orange'
    }
  ];

  const businessContent = [
    {
      label: 'Services',
      count: stats?.business.services || 0,
      percentage: 20,
      color: 'blue'
    },
    {
      label: 'Blog Posts',
      count: stats?.business.blogPosts || 0,
      percentage: 40,
      color: 'green'
    },
    {
      label: 'Portfolio',
      count: stats?.business.portfolio || 0,
      percentage: 30,
      color: 'purple'
    },
    {
      label: 'Pages',
      count: stats?.business.pages || 0,
      percentage: 10,
      color: 'orange'
    }
  ];

  const content = siteType === 'church' ? churchContent : businessContent;

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="space-y-4">
          {content.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {item.count}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colorClasses[item.color as keyof typeof colorClasses]} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Content Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </div>
            <button
              onClick={() => window.open('https://app.contentful.com', '_blank')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Manage Content →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}