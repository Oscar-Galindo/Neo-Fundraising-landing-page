import React from 'react';

interface QuickActionsProps {
  siteType: 'church' | 'business';
}

export default function QuickActions({ siteType }: QuickActionsProps) {
  const churchActions = [
    {
      label: 'Add Event',
      icon: '📅',
      action: () => window.open('https://app.contentful.com/spaces/jn2q4lg00k6r/entries/new/event', '_blank'),
      color: 'blue'
    },
    {
      label: 'New Sermon',
      icon: '🎤',
      action: () => window.open('https://app.contentful.com/spaces/jn2q4lg00k6r/entries/new/sermon', '_blank'),
      color: 'green'
    },
    {
      label: 'Send Newsletter',
      icon: '✉️',
      action: () => alert('Newsletter composer coming soon!'),
      color: 'purple'
    },
    {
      label: 'View Prayers',
      icon: '🙏',
      action: () => window.location.href = '/admin/prayers',
      color: 'orange'
    },
    {
      label: 'Member Directory',
      icon: '👥',
      action: () => window.location.href = '/admin/members',
      color: 'indigo'
    },
    {
      label: 'Donation Report',
      icon: '💰',
      action: () => window.location.href = '/admin/donations',
      color: 'pink'
    }
  ];

  const businessActions = [
    {
      label: 'New Blog Post',
      icon: '✍️',
      action: () => window.open('https://app.contentful.com/spaces/jn2q4lg00k6r/entries/new/blogPost', '_blank'),
      color: 'blue'
    },
    {
      label: 'View Leads',
      icon: '📊',
      action: () => window.location.href = '/admin/leads',
      color: 'green'
    },
    {
      label: 'Add Service',
      icon: '🛠️',
      action: () => window.open('https://app.contentful.com/spaces/jn2q4lg00k6r/entries/new/service', '_blank'),
      color: 'purple'
    },
    {
      label: 'Team Member',
      icon: '👤',
      action: () => window.open('https://app.contentful.com/spaces/jn2q4lg00k6r/entries/new/teamMember', '_blank'),
      color: 'orange'
    },
    {
      label: 'Analytics',
      icon: '📈',
      action: () => window.location.href = '/admin/analytics',
      color: 'indigo'
    },
    {
      label: 'Invoices',
      icon: '💳',
      action: () => window.location.href = '/admin/invoices',
      color: 'pink'
    }
  ];

  const actions = siteType === 'church' ? churchActions : businessActions;

  const colorClasses = {
    blue: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
    green: 'bg-green-100 hover:bg-green-200 text-green-700',
    purple: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
    orange: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
    indigo: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700',
    pink: 'bg-pink-100 hover:bg-pink-200 text-pink-700'
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className={`
            ${colorClasses[action.color as keyof typeof colorClasses]}
            rounded-lg p-4 text-center transition-all transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${action.color}-500
          `}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <div className="text-sm font-medium">{action.label}</div>
        </button>
      ))}
    </div>
  );
}