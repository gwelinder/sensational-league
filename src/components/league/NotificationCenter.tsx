"use client";

import { useState, useEffect } from "react";
import { ResponsiveLogo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface NotificationCenterProps {
  notifications?: Array<{
    _id: string;
    title: string;
    message: string;
    type: string;
    priority: string;
    createdAt: string;
    customization?: {
      icon?: string;
      color?: string;
      sound?: string;
    };
    relatedContent?: {
      actionUrl?: string;
      actionText?: string;
    };
    status: string;
  }>;
  onMarkAsRead?: (notificationId: string) => void;
  onAction?: (notificationId: string, actionUrl: string) => void;
  className?: string;
}

const priorityColors = {
  urgent: "border-red-500 bg-red-50 text-red-900",
  high: "border-orange-500 bg-orange-50 text-orange-900",
  normal: "border-blue-500 bg-blue-50 text-blue-900",
  low: "border-gray-500 bg-gray-50 text-gray-900",
};

const typeIcons = {
  'match-reminder': '⚽',
  'match-result': '🏆',
  'social-milestone': '📱',
  'impact-alert': '💫',
  'announcement': '📢',
  'team-news': '📰',
  'achievement': '🏅',
  'season-update': '📅',
  'training': '🏃',
  'event': '🎉',
  'system': '⚙️',
};

const themeColors = {
  volt: "text-[var(--color-volt)] bg-[var(--color-volt)]/10",
  black: "text-[var(--color-black)] bg-black/10",
  orange: "text-orange-500 bg-orange-50",
  purple: "text-purple-500 bg-purple-50",
  cyan: "text-cyan-500 bg-cyan-50",
  green: "text-green-500 bg-green-50",
  red: "text-red-500 bg-red-50",
};

function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onAction 
}: { 
  notification: NonNullable<NotificationCenterProps['notifications']>[0];
  onMarkAsRead?: (id: string) => void;
  onAction?: (id: string, url: string) => void;
}) {
  const [isRead, setIsRead] = useState(notification.status === 'read');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMarkAsRead = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead?.(notification._id);
    }
  };

  const handleAction = () => {
    if (notification.relatedContent?.actionUrl) {
      onAction?.(notification._id, notification.relatedContent.actionUrl);
      handleMarkAsRead();
    }
  };

  const priorityClass = priorityColors[notification.priority as keyof typeof priorityColors] || priorityColors.normal;
  const icon = notification.customization?.icon || typeIcons[notification.type as keyof typeof typeIcons] || '📢';
  const themeColor = notification.customization?.color ? 
    themeColors[notification.customization.color as keyof typeof themeColors] : 
    themeColors.volt;

  const timeAgo = new Date(notification.createdAt).toLocaleDateString();

  return (
    <div
      className={cn(
        "border-l-4 p-4 rounded-r-lg transition-all duration-200 cursor-pointer",
        priorityClass,
        !isRead && "shadow-md",
        isRead && "opacity-70"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0",
            themeColor
          )}>
            {icon === 'spark' ? (
              <ResponsiveLogo type="spark" color="black" className="w-6 h-6" />
            ) : (
              icon
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className={cn(
                "font-bold text-sm brand-subhead-light",
                !isRead && "text-[var(--color-black)]",
                isRead && "text-[var(--color-text-muted)]"
              )}>
                {notification.title}
              </h4>
              <div className="flex items-center gap-2">
                {notification.priority === 'urgent' && (
                  <span className="animate-pulse text-red-500">🚨</span>
                )}
                {!isRead && (
                  <div className="w-2 h-2 bg-[var(--color-volt)] rounded-full" />
                )}
              </div>
            </div>

            <p className={cn(
              "text-sm brand-body",
              isExpanded ? "" : "line-clamp-2",
              !isRead && "text-[var(--color-text-muted)]",
              isRead && "text-[var(--color-text-muted)]/70"
            )}>
              {notification.message}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs brand-caption opacity-60">
                {timeAgo}
              </span>
              
              {isExpanded && (
                <div className="flex gap-2">
                  {!isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead();
                      }}
                      className="text-xs px-2 py-1 rounded bg-[var(--color-volt)]/20 text-[var(--color-black)] hover:bg-[var(--color-volt)]/30 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  
                  {notification.relatedContent?.actionUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction();
                      }}
                      className="text-xs px-2 py-1 rounded bg-[var(--color-volt)] text-[var(--color-black)] hover:bg-[var(--color-volt)]/80 transition-colors brand-motion-right"
                    >
                      {notification.relatedContent.actionText || 'View Details'} →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationCenter({ 
  notifications = [], 
  onMarkAsRead, 
  onAction, 
  className 
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.status !== 'read').length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.status !== 'read';
    return notification.type === filter;
  });

  const notificationTypes = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'unread', label: 'Unread', icon: '🔔' },
    { value: 'match-reminder', label: 'Matches', icon: '⚽' },
    { value: 'social-milestone', label: 'Social', icon: '📱' },
    { value: 'impact-alert', label: 'Impact', icon: '💫' },
    { value: 'achievement', label: 'Achievements', icon: '🏆' },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-full transition-all duration-200",
          "hover:bg-[var(--color-volt)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)]",
          isOpen && "bg-[var(--color-volt)]/20"
        )}
      >
        <div className="text-xl">🔔</div>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-h-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-[var(--color-off-white)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold brand-subhead-light">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto">
              {notificationTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilter(type.value)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap transition-colors",
                    filter === type.value 
                      ? "bg-[var(--color-volt)] text-[var(--color-black)]" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                  {type.value === 'unread' && unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-2">📭</div>
                <p className="brand-body">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </p>
                {filter === 'all' && (
                  <p className="text-sm brand-caption mt-1">
                    Stay tuned for match updates, achievements, and impact milestones!
                  </p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onAction={onAction}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-[var(--color-off-white)] text-center">
              <button
                onClick={() => {
                  // Mark all visible notifications as read
                  filteredNotifications
                    .filter(n => n.status !== 'read')
                    .forEach(n => onMarkAsRead?.(n._id));
                }}
                className="text-sm text-[var(--color-volt)] hover:underline brand-caption"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}