"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ResponsiveLogo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface TeamChatProps {
  teamId: string;
  messages?: Array<{
    _id: string;
    title: string;
    content: string;
    type: string;
    sender: {
      senderType: string;
      player?: {
        name: string;
        avatar?: string;
      };
      adminName?: string;
    };
    priority: string;
    createdAt: string;
    reactions?: Array<{
      emoji: string;
      count: number;
      players: Array<{ name: string }>;
    }>;
    relatedContent?: {
      match?: { title: string };
      impactProject?: { projectName: string };
      socialMediaContent?: { platform: string; contentType: string };
    };
    visibility?: {
      isPinned?: boolean;
    };
    thread?: {
      isReply: boolean;
      threadId?: string;
    };
  }>;
  currentPlayer?: {
    _id: string;
    name: string;
    role: string;
  };
  onSendMessage?: (message: { content: string; type: string; priority: string }) => void;
  onReaction?: (messageId: string, emoji: string) => void;
  className?: string;
}

const messageTypeIcons = {
  'team-chat': '💬',
  'captain-update': '🎯',
  'coach-message': '📋',
  'match-coordination': '⚽',
  'impact-update': '💫',
  'social-coordination': '📱',
  'training-schedule': '🏃',
  'announcement-response': '📢',
  'emergency': '🚨',
  'celebration': '🎉',
};

const quickReactions = ['⚽', '🔥', '💪', '❤️', '🏆', '⭐', '💫', '👏'];

function MessageBubble({ 
  message, 
  currentPlayer, 
  onReaction 
}: { 
  message: NonNullable<TeamChatProps['messages']>[0];
  currentPlayer?: TeamChatProps['currentPlayer'];
  onReaction?: (messageId: string, emoji: string) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showReactions, _setShowReactions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isOwnMessage = message.sender.player?.name === currentPlayer?.name;
  const isSystemMessage = message.sender.senderType === 'system';
  const isPinned = message.visibility?.isPinned;
  const isUrgent = message.priority === 'urgent' || message.type === 'emergency';

  const senderName = message.sender.player?.name || message.sender.adminName || 'System';
  const senderRole = message.sender.senderType;

  return (
    <div className={cn(
      "group relative",
      isPinned && "border-l-4 border-[var(--color-volt)] pl-4 bg-[var(--color-volt)]/5 rounded-r-lg",
      isUrgent && "animate-pulse"
    )}>
      {/* Pin indicator */}
      {isPinned && (
        <div className="absolute -left-1 top-0 text-[var(--color-volt)]">📌</div>
      )}

      <div className={cn(
        "flex gap-3 p-3 rounded-lg",
        isOwnMessage && "flex-row-reverse",
        isSystemMessage && "justify-center",
        !isSystemMessage && "hover:bg-gray-50"
      )}>
        {/* Avatar */}
        {!isSystemMessage && (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0",
            senderRole === 'captain' && "bg-[var(--color-volt)] text-[var(--color-black)]",
            senderRole === 'coach' && "bg-blue-500 text-white",
            senderRole === 'admin' && "bg-purple-500 text-white",
            senderRole === 'player' && "bg-gray-200 text-gray-700"
          )}>
            {message.sender.player?.avatar ? (
              <Image
                src={message.sender.player.avatar}
                alt={senderName}
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              senderName.charAt(0).toUpperCase()
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={cn(
          "flex-1 min-w-0",
          isOwnMessage && "text-right",
          isSystemMessage && "text-center max-w-md mx-auto"
        )}>
          {/* Header */}
          {!isSystemMessage && (
            <div className={cn(
              "flex items-center gap-2 mb-1",
              isOwnMessage && "justify-end"
            )}>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm brand-caption">
                  {senderName}
                </span>
                {senderRole === 'captain' && <span className="text-xs">👑</span>}
                {senderRole === 'coach' && <span className="text-xs">🎯</span>}
              </div>
              <span className="text-xs opacity-60">
                {messageTypeIcons[message.type as keyof typeof messageTypeIcons]}
              </span>
              <span className="text-xs opacity-60">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          )}

          {/* Message Title */}
          {message.title && (
            <h4 className={cn(
              "font-bold text-sm mb-1 brand-subhead-light",
              isSystemMessage && "text-center"
            )}>
              {message.title}
            </h4>
          )}

          {/* Message Body */}
          <div className={cn(
            "p-3 rounded-lg relative",
            isOwnMessage && "bg-[var(--color-volt)] text-[var(--color-black)] ml-8",
            !isOwnMessage && !isSystemMessage && "bg-white border border-gray-200 mr-8",
            isSystemMessage && "bg-gray-100 text-gray-700 italic",
            isUrgent && "border-red-300 bg-red-50"
          )}>
            <p className={cn(
              "brand-body text-sm",
              isExpanded ? "" : "line-clamp-3"
            )}>
              {message.content}
            </p>

            {message.content.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs opacity-70 hover:opacity-100 mt-1"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Related Content */}
          {message.relatedContent && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs brand-caption">
              {message.relatedContent.match && (
                <div className="flex items-center gap-1">
                  <span>⚽</span>
                  <span>Match: {message.relatedContent.match.title}</span>
                </div>
              )}
              {message.relatedContent.impactProject && (
                <div className="flex items-center gap-1">
                  <span>💫</span>
                  <span>Project: {message.relatedContent.impactProject.projectName}</span>
                </div>
              )}
              {message.relatedContent.socialMediaContent && (
                <div className="flex items-center gap-1">
                  <span>📱</span>
                  <span>
                    {message.relatedContent.socialMediaContent.platform} - 
                    {message.relatedContent.socialMediaContent.contentType}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => onReaction?.(message._id, reaction.emoji)}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                  title={reaction.players.map(p => p.name).join(', ')}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Quick Reactions (on hover) */}
          {!isSystemMessage && (
            <div className={cn(
              "absolute top-0 flex gap-1 p-1 bg-white shadow-lg rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity z-10",
              isOwnMessage ? "left-0" : "right-0"
            )}>
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onReaction?.(message._id, emoji)}
                  className="w-6 h-6 text-sm hover:scale-110 transition-transform"
                  title={`React with ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageComposer({ 
  onSend, 
  disabled = false 
}: { 
  onSend?: (message: { content: string; type: string; priority: string }) => void;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('team-chat');
  const [priority, setPriority] = useState('normal');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend({
        content: message.trim(),
        type: messageType,
        priority: priority,
      });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const messageTypes = [
    { value: 'team-chat', label: 'Chat', icon: '💬' },
    { value: 'match-coordination', label: 'Match', icon: '⚽' },
    { value: 'impact-update', label: 'Impact', icon: '💫' },
    { value: 'social-coordination', label: 'Social', icon: '📱' },
    { value: 'training-schedule', label: 'Training', icon: '🏃' },
  ];

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {/* Message Type & Priority */}
      <div className="flex gap-2 mb-3">
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--color-volt)] focus:border-transparent"
          disabled={disabled}
        >
          {messageTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--color-volt)] focus:border-transparent"
          disabled={disabled}
        >
          <option value="low">📘 Low</option>
          <option value="normal">📗 Normal</option>
          <option value="high">📙 High</option>
          <option value="urgent">📕 Urgent</option>
        </select>
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Chat is currently disabled" : "Type your message... (Enter to send, Shift+Enter for new line)"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-volt)] focus:border-transparent resize-none max-h-32 brand-body"
            rows={1}
            disabled={disabled}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={cn(
            "px-4 py-2 rounded-lg font-bold transition-all duration-200 brand-motion-right",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-volt)]",
            message.trim() && !disabled
              ? "bg-[var(--color-volt)] text-[var(--color-black)] hover:scale-105 transform-gpu"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          Send →
        </button>
      </div>
    </div>
  );
}

export function TeamChat({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teamId: _teamId,
  messages = [],
  currentPlayer,
  onSendMessage,
  onReaction,
  className
}: TeamChatProps) {
  const [filter, setFilter] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    if (filter === 'pinned') return message.visibility?.isPinned;
    return message.type === filter;
  });

  const pinnedMessages = messages.filter(m => m.visibility?.isPinned);

  const filterOptions = [
    { value: 'all', label: 'All Messages', icon: '💬' },
    { value: 'pinned', label: 'Pinned', icon: '📌' },
    { value: 'match-coordination', label: 'Matches', icon: '⚽' },
    { value: 'impact-update', label: 'Impact', icon: '💫' },
    { value: 'social-coordination', label: 'Social', icon: '📱' },
    { value: 'captain-update', label: 'Captain Updates', icon: '🎯' },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-gray-50", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold brand-subhead flex items-center gap-2">
            <ResponsiveLogo type="spark" color="black" className="w-6 h-6" />
            Team Chat
          </h2>
          <div className="text-sm brand-caption opacity-60">
            {messages.length} messages
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap transition-colors",
                filter === option.value 
                  ? "bg-[var(--color-volt)] text-[var(--color-black)]" 
                  : "hover:bg-gray-100"
              )}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
              {option.value === 'pinned' && pinnedMessages.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1">
                  {pinnedMessages.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p className="brand-body">
              {filter === 'all' ? 'No messages yet' : 'No messages in this filter'}
            </p>
            <p className="text-sm brand-caption mt-1">
              Start the conversation with your team!
            </p>
          </div>
        ) : (
          <>
            {filteredMessages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                currentPlayer={currentPlayer}
                onReaction={onReaction}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Composer */}
      <MessageComposer 
        onSend={onSendMessage}
        disabled={!currentPlayer}
      />
    </div>
  );
}