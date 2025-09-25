import { useState, useEffect } from "react";
import { Search, Plus, Users, User, Megaphone, Settings, Phone, Video, MoreVertical, Paperclip, Smile, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  conversationType?: 'individual' | 'group' | 'announcement';
}

export function MessageInput({ 
  value, 
  onChange, 
  onSend, 
  placeholder = "Escribe tu mensaje...",
  disabled = false,
  conversationType = 'individual'
}: MessageInputProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😊', '😂', '❤️', '👍', '🙏', '✨', '🎉', '👏', '💪', '🔥'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    onChange(value + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 border-t border-foreground/10 bg-card space-y-3">
      {/* Indicador de escritura */}
      {conversationType !== 'announcement' && (
        <div className="text-xs text-foreground/50 h-4">
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span>Ana Líder está escribiendo...</span>
            </div>
          )}
        </div>
      )}
      
      {/* Área de input */}
      <div className="relative">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="min-h-[40px] max-h-32 resize-none pr-16 md:pr-20 rounded-xl text-base"
              rows={1}
            />
            
            {/* Controles dentro del input */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-secondary/50"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-4 w-4" />
              </Button>
              
              {conversationType !== 'announcement' && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-secondary/50"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            onClick={onSend}
            disabled={!value.trim() || disabled}
            size="sm"
            className="h-10 px-3 md:px-4 rounded-xl min-w-[48px]"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Enviar</span>
          </Button>
        </div>

        {/* Picker de emojis */}
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2 p-3 bg-card border border-foreground/10 rounded-xl shadow-lg">
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  className="text-lg hover:bg-secondary/20 p-1 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ConversationHeaderProps {
  conversation: {
    id: string;
    name: string;
    type: 'individual' | 'group' | 'announcement';
    avatar?: string;
    isOnline?: boolean;
    participants?: string[];
  };
  onBack?: () => void; // Para móvil
}

export function ConversationHeader({ conversation, onBack }: ConversationHeaderProps) {
  const getConversationIcon = (conv: ConversationHeaderProps['conversation']) => {
    switch (conv.type) {
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'individual':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (conversation.type) {
      case 'group':
        return `${conversation.participants?.length || 0} miembros`;
      case 'announcement':
        return 'Canal de anuncios';
      case 'individual':
        return conversation.isOnline ? 'En línea' : 'Visto hace 2h';
      default:
        return '';
    }
  };

  return (
    <div className="p-4 border-b border-foreground/10 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Botón de regreso para móvil */}
          {onBack && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 md:hidden"
              onClick={onBack}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          )}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
              {conversation.avatar || getConversationIcon(conversation)}
            </div>
            {conversation.isOnline && conversation.type === 'individual' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{conversation.name}</h3>
            <p className="text-xs text-foreground/60">{getStatusText()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {conversation.type === 'individual' && (
            <>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Video className="h-4 w-4" />
              </Button>
            </>
          )}
          {conversation.type === 'group' && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    timestamp: Date;
    senderId: string;
    senderName: string;
    type: 'text' | 'image' | 'file' | 'system';
    isRead?: boolean;
  };
  isOwn: boolean;
  showSender?: boolean;
  conversationType: 'individual' | 'group' | 'announcement';
}

export function MessageBubble({ message, isOwn, showSender = true, conversationType }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case 'file':
        return '📎';
      case 'image':
        return '🖼️';
      case 'system':
        return '🔔';
      default:
        return null;
    }
  };

  if (message.type === 'system') {
    return (
      <div className="flex justify-center py-2">
        <div className="bg-muted px-3 py-1 rounded-full text-xs text-foreground/70">
          🔔 {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex gap-3 group",
      isOwn ? 'flex-row-reverse' : 'flex-row'
    )}>
      {!isOwn && showSender && conversationType !== 'individual' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium flex-shrink-0">
          {message.senderName.charAt(0)}
        </div>
      )}
      
      <div className={cn(
        "max-w-[85%] md:max-w-[70%] space-y-1",
        isOwn ? 'items-end' : 'items-start'
      )}>
        {!isOwn && showSender && conversationType !== 'individual' && (
          <p className="text-xs text-foreground/60 px-3">{message.senderName}</p>
        )}
        
        <div className={cn(
          "rounded-2xl px-3 md:px-4 py-2 text-sm md:text-sm relative group-hover:shadow-md transition-shadow leading-relaxed",
          isOwn 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-card border border-foreground/10'
        )}>
          {getMessageIcon() && (
            <span className="mr-2">{getMessageIcon()}</span>
          )}
          {message.text}
          
          {/* Estados de lectura para mensajes propios */}
          {isOwn && (
            <div className="absolute -bottom-1 -right-1">
              <div className={cn(
                "w-3 h-3 rounded-full border-2 border-background",
                message.isRead ? 'bg-blue-500' : 'bg-gray-400'
              )}></div>
            </div>
          )}
        </div>
        
        <p className={cn(
          "text-xs text-foreground/50 px-3 opacity-0 group-hover:opacity-100 transition-opacity",
          isOwn ? 'text-right' : 'text-left'
        )}>
          {formatTime(message.timestamp)}
          {isOwn && (
            <span className="ml-2">
              {message.isRead ? '✓✓' : '✓'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}