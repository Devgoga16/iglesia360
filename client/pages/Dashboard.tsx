import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, Heart, Users, TrendingUp, Bell, Activity, MessageCircle, DollarSign, Eye, ChevronUp, MoreVertical, Plus } from "lucide-react";

export default function Dashboard() {
  const { moduleId } = useParams();

  return (
    <DashboardLayout>
      {!moduleId ? (
        <div className="space-y-8">
          {/* Header moderno */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">¡Buen día!</h1>
                <p className="text-foreground/60 mt-1">Aquí tienes un resumen de tu comunidad</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                  <Plus className="h-4 w-4" />
                  Nuevo evento
                </button>
              </div>
            </div>
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Miembros Totales */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">Miembros</p>
                    <p className="text-2xl font-bold text-foreground">1,423</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <ChevronUp className="h-4 w-4" />
                  12%
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

            {/* Donaciones */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">Donaciones</p>
                    <p className="text-2xl font-bold text-foreground">$15,750</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <ChevronUp className="h-4 w-4" />
                  8.3%
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            {/* Eventos */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">Eventos</p>
                    <p className="text-2xl font-bold text-foreground">28</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <ChevronUp className="h-4 w-4" />
                  5%
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            {/* Participación */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Activity className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">Participación</p>
                    <p className="text-2xl font-bold text-foreground">94%</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <ChevronUp className="h-4 w-4" />
                  2%
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
          </div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico de donaciones */}
            <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ingresos Mensuales</h3>
                  <p className="text-3xl font-bold text-foreground mt-2">$15,750</p>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-foreground/60" />
                </button>
              </div>
              
              {/* Simulación de gráfico */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                  <div key={i} className="bg-primary/20 rounded-t-lg flex-1 transition-all duration-300 hover:bg-primary/40" style={{ height: `${height}%` }}>
                    <div className="w-full bg-primary rounded-t-lg" style={{ height: "20%" }}></div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-foreground/60">
                <span>Ene</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Ago</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dic</span>
              </div>
            </div>

            {/* Actividades recientes */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Actividades Recientes</h3>
                <button className="text-sm text-primary font-medium hover:underline">Ver todas</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Nuevo miembro registrado</p>
                    <p className="text-xs text-foreground/60">María González se unió a la comunidad</p>
                    <p className="text-xs text-foreground/40 mt-1">Hace 2 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Evento programado</p>
                    <p className="text-xs text-foreground/60">Servicio dominical agregado al calendario</p>
                    <p className="text-xs text-foreground/40 mt-1">Hace 4 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Donación recibida</p>
                    <p className="text-xs text-foreground/60">$250 para proyecto juvenil</p>
                    <p className="text-xs text-foreground/40 mt-1">Hace 6 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Mensaje enviado</p>
                    <p className="text-xs text-foreground/60">Recordatorio de reunión pastoral</p>
                    <p className="text-xs text-foreground/40 mt-1">Hace 1 día</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Módulos de acceso rápido */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="group bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">Gestión Pastoral</h3>
              <p className="text-foreground/70 leading-relaxed mb-5 text-sm">
                Administra miembros, seguimiento pastoral y crecimiento espiritual de la comunidad.
              </p>
              
              <div className="flex items-center text-sm text-primary font-medium group-hover:text-secondary transition-colors">
                <span>Explorar módulo</span>
                <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 bg-gradient-to-br from-accent to-orange-400 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">Eventos</h3>
              <p className="text-foreground/70 leading-relaxed mb-5 text-sm">
                Programa y gestiona servicios, reuniones y actividades especiales de la iglesia.
              </p>
              
              <div className="flex items-center text-sm text-primary font-medium group-hover:text-accent transition-colors">
                <span>Explorar módulo</span>
                <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">Donaciones</h3>
              <p className="text-foreground/70 leading-relaxed mb-5 text-sm">
                Gestiona ofrendas, diezmos y proyectos especiales con transparencia total.
              </p>
              
              <div className="flex items-center text-sm text-primary font-medium group-hover:text-emerald-600 transition-colors">
                <span>Explorar módulo</span>
                <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold capitalize">{moduleId?.replace("-", " ")}</h1>
          <div className="rounded-xl bg-card p-8 shadow-sm text-sm text-foreground/80">
            Esta página es un marcador de posición. Pide completar este módulo y lo construiremos contigo.
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
