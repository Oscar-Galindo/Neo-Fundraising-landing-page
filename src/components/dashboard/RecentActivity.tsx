import React, { useEffect, useState } from 'react';

interface Activity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  icon: string;
  color: string;
}

interface RecentActivityProps {
  siteType: 'church' | 'business';
}

export default function RecentActivity({ siteType }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recent activity
    setTimeout(() => {
      if (siteType === 'church') {
        setActivities([
          {
            id: '1',
            type: 'prayer',
            title: 'New prayer request from Sarah Johnson',
            timestamp: '2 hours ago',
            icon: '🙏',
            color: 'purple'
          },
          {
            id: '2',
            type: 'event',
            title: 'Youth Group event registration: 5 new signups',
            timestamp: '4 hours ago',
            icon: '📅',
            color: 'blue'
          },
          {
            id: '3',
            type: 'member',
            title: 'New member joined: Michael Smith',
            timestamp: '1 day ago',
            icon: '👤',
            color: 'green'
          },
          {
            id: '4',
            type: 'donation',
            title: 'Online donation received: $250',
            timestamp: '1 day ago',
            icon: '💰',
            color: 'yellow'
          },
          {
            id: '5',
            type: 'sermon',
            title: 'Sermon uploaded: "Finding Hope"',
            timestamp: '2 days ago',
            icon: '🎤',
            color: 'indigo'
          }
        ]);
      } else {
        setActivities([
          {
            id: '1',
            type: 'lead',
            title: 'New lead: John Doe - Web Design Quote',
            timestamp: '1 hour ago',
            icon: '📊',
            color: 'blue'
          },
          {
            id: '2',
            type: 'contact',
            title: 'Contact form submission from ABC Company',
            timestamp: '3 hours ago',
            icon: '✉️',
            color: 'green'
          },
          {
            id: '3',
            type: 'blog',
            title: 'Blog post published: "10 Marketing Tips"',
            timestamp: '6 hours ago',
            icon: '✍️',
            color: 'purple'
          },
          {
            id: '4',
            type: 'payment',
            title: 'Invoice paid: $1,500 - XYZ Corp',
            timestamp: '1 day ago',
            icon: '💳',
            color: 'yellow'
          },
          {
            id: '5',
            type: 'project',
            title: 'Project completed: Website Redesign',
            timestamp: '2 days ago',
            icon: '✅',
            color: 'green'
          }
        ]);
      }
      setLoading(false);
    }, 1000);
  }, [siteType]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    yellow: 'bg-yellow-100',
    indigo: 'bg-indigo-100'
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`${colorClasses[activity.color as keyof typeof colorClasses]} p-2 rounded-lg`}>
                <span className="text-xl">{activity.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
          View All Activity →
        </button>
      </div>
    </div>
  );
}