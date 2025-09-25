import { useState, useEffect, useRef } from "react";
import { Search, Plus, Users, User, Megaphone, Filter, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { MessageInput, ConversationHeader, MessageBubble } from "@/components/messages/MessageComponents";

// Tipos de datos
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  type: 'text' | 'image' | 'file' | 'system';
  isRead?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  type: 'individual' | 'group' | 'announcement';
  avatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
  participants?: string[];
}

// Datos de ejemplo
const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Anuncios Generales',
    type: 'announcement',
    avatar: '📢',
    lastMessage: {
      id: '1',
      text: 'Recordatorio: Servicio especial este domingo a las 10:00 AM',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      senderId: 'admin',
      senderName: 'Administración',
      type: 'text'
    },
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Grupo de Líderes',
    type: 'group',
    avatar: '👥',
    lastMessage: {
      id: '2',
      text: 'Confirmemos la reunión de mañana',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      senderId: 'pastor1',
      senderName: 'Pastor Juan',
      type: 'text'
    },
    unreadCount: 1,
    participants: ['pastor1', 'leader1', 'leader2']
  },
  {
    id: '3',
    name: 'María González',
    type: 'individual',
    avatar: '👤',
    lastMessage: {
      id: '3',
      text: 'Gracias por la oración de ayer',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      senderId: 'maria',
      senderName: 'María González',
      type: 'text'
    },
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '4',
    name: 'Ministerio de Jóvenes',
    type: 'group',
    avatar: '🎵',
    lastMessage: {
      id: '4',
      text: 'Adjunto las canciones para el próximo ensayo',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      senderId: 'youth1',
      senderName: 'Carlos Música',
      type: 'file'
    },
    unreadCount: 0,
    participants: ['youth1', 'youth2', 'youth3']
  }
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    text: '¡Hola! ¿Cómo están todos?',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    senderId: 'pastor1',
    senderName: 'Pastor Juan',
    type: 'text',
    isRead: true
  },
  {
    id: '2',
    text: 'Todo bien por aquí, gracias por preguntar',
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
    senderId: 'leader1',
    senderName: 'Ana Líder',
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    text: 'Necesitamos confirmar la cantidad de personas para el evento del sábado',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    senderId: 'current',
    senderName: 'Tú',
    type: 'text',
    isRead: true
  },
  {
    id: '4',
    text: 'Yo puedo ayudar con la organización',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    senderId: 'leader2',
    senderName: 'Pedro Coordinador',
    type: 'text',
    isRead: false
  }
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string>(''); // Vacío por defecto en móvil
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'group' | 'announcement'>('all');
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // En desktop, seleccionar conversación por defecto
      if (window.innerWidth >= 768 && !selectedConversation) {
        setSelectedConversation('2');
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [selectedConversation]);

  const filteredConversations = SAMPLE_CONVERSATIONS.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const currentConversation = SAMPLE_CONVERSATIONS.find(conv => conv.id === selectedConversation);

  // Scroll automático al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simular recepción de mensajes en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% de probabilidad cada segundo
        const newMessage: Message = {
          id: Date.now().toString(),
          text: "Este es un mensaje de ejemplo en tiempo real 🚀",
          timestamp: new Date(),
          senderId: 'leader1',
          senderName: 'Ana Líder',
          type: 'text',
          isRead: false
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) {
      return `${Math.floor(diff / (1000 * 60))}m`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getConversationIcon = (conv: Conversation) => {
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

  const sendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date(),
      senderId: 'current',
      senderName: user?.name || 'Tú',
      type: 'text',
      isRead: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    
    // Simular confirmación de entrega después de un delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, isRead: true } : msg
      ));
    }, 1000);
  };

  const getFilterIcon = (type: typeof filterType) => {
    switch (type) {
      case 'individual': return <User className="h-3 w-3" />;
      case 'group': return <Users className="h-3 w-3" />;
      case 'announcement': return <Megaphone className="h-3 w-3" />;
      default: return <Filter className="h-3 w-3" />;
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-background border border-foreground/10 rounded-2xl overflow-hidden flex relative">
      {/* Sidebar de conversaciones - Responsive */}
      <div className={cn(
        "bg-card border-r border-foreground/10 flex flex-col transition-all duration-300 ease-in-out",
        "w-full md:w-80", // Full width en móvil, 320px en desktop
        // En móvil, ocultar cuando hay conversación seleccionada
        isMobile && selectedConversation ? "hidden" : "flex"
      )}>
        {/* Header del sidebar */}
        <div className="p-4 border-b border-foreground/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Mensajes</h2>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Barra de búsqueda */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>

          {/* Filtros - Scrollable en móvil */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { key: 'all' as const, label: 'Todos' },
              { key: 'individual' as const, label: 'Directos' },
              { key: 'group' as const, label: 'Grupos' },
              { key: 'announcement' as const, label: 'Anuncios' }
            ].map((filter) => (
              <Button
                key={filter.key}
                size="sm"
                variant={filterType === filter.key ? "default" : "outline"}
                className="flex items-center gap-1.5 text-xs whitespace-nowrap h-7 px-3"
                onClick={() => setFilterType(filter.key)}
              >
                {getFilterIcon(filter.key)}
                <span className="hidden sm:inline">{filter.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation.id);
              }}
              className={cn(
                "p-4 border-b border-foreground/5 cursor-pointer hover:bg-secondary/20 transition-colors",
                selectedConversation === conversation.id && "bg-primary/5 border-l-2 border-l-primary"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {conversation.avatar || getConversationIcon(conversation)}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                    <div className="flex items-center gap-2">
                      {conversation.unreadCount > 0 && (
                        <Badge variant="default" className="h-5 min-w-5 text-xs px-1.5">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-foreground/50">
                        {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  {conversation.lastMessage && (
                    <p className="text-xs text-foreground/70 truncate">
                      <span className="font-medium">{conversation.lastMessage.senderName}: </span>
                      {conversation.lastMessage.type === 'file' ? '📎 Archivo adjunto' : conversation.lastMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área principal de chat - Responsive */}
      <div className={cn(
        "flex-1 flex flex-col",
        // En móvil, mostrar solo cuando hay conversación seleccionada
        isMobile && !selectedConversation ? "hidden" : "flex"
      )}>
        {currentConversation ? (
          <>
            {/* Header del chat */}
            <ConversationHeader 
              conversation={currentConversation} 
              onBack={() => setSelectedConversation('')}
            />

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {/* Mensajes fijados */}
              {currentConversation.type === 'announcement' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-700 text-sm">
                    <Pin className="h-4 w-4" />
                    <span className="font-medium">Mensaje fijado</span>
                  </div>
                  <p className="text-blue-800 text-sm mt-1">
                    Recuerden que el próximo domingo tenemos servicio especial a las 10:00 AM
                  </p>
                </div>
              )}

              {messages.map((message, index) => {
                const isOwn = message.senderId === 'current';
                const showSender = index === 0 || messages[index - 1].senderId !== message.senderId;
                
                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={isOwn}
                    showSender={showSender}
                    conversationType={currentConversation.type}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <MessageInput
              value={messageText}
              onChange={setMessageText}
              onSend={sendMessage}
              conversationType={currentConversation.type}
              placeholder={
                currentConversation.type === 'announcement' 
                  ? "Escribe un anuncio para la comunidad..." 
                  : "Escribe tu mensaje..."
              }
            />
          </>
        ) : (
          // Estado vacío
          <div className="flex-1 flex items-center justify-center bg-background/50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Selecciona una conversación</h3>
                <p className="text-sm text-foreground/60">Elige una conversación de la lista para comenzar a chatear</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}