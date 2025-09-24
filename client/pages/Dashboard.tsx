import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  const { moduleId } = useParams();

  return (
    <DashboardLayout>
      {!moduleId ? (
        <div className="space-y-8">
          {/* Header con gradiente */}
          <div className="text-center space-y-4 pb-8 border-b border-slate-200">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
              Bienvenido a Iglesia 360º
            </h1>
            <p className="text-slate-600 text-lg">
              Tu plataforma integral para la gestión de la comunidad
            </p>
          </div>

          {/* Cards principales */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="h-6 w-6 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Resumen General</h3>
              <p className="text-slate-600 leading-relaxed">
                Visualiza las métricas más importantes de tu comunidad en un vistazo.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="h-6 w-6 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Próximos Eventos</h3>
              <p className="text-slate-600 leading-relaxed">
                Mantente al día con todos los eventos y actividades programadas.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="h-6 w-6 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Donaciones</h3>
              <p className="text-slate-600 leading-relaxed">
                Gestiona y supervisa las contribuciones de la comunidad.
              </p>
            </div>
          </div>

          {/* Sección de estadísticas rápidas */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Estadísticas del Día</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">124</div>
                <div className="text-white/70 text-sm">Miembros Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-white/70 text-sm">Eventos Esta Semana</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">$2,450</div>
                <div className="text-white/70 text-sm">Donaciones del Mes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-white/70 text-sm">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-4 pb-8 border-b border-slate-200">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent capitalize">
              {moduleId?.replace("-", " ")}
            </h1>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-12 shadow-lg border border-slate-200/50 text-center">
            <div className="h-24 w-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="h-12 w-12 bg-slate-400 rounded-xl opacity-60"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Módulo en Construcción</h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Este módulo está en desarrollo. Pide completar esta funcionalidad y la construiremos contigo 
              para adaptar perfectamente tus necesidades.
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
