import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  const { moduleId } = useParams();

  return (
    <DashboardLayout>
      {!moduleId ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Bienvenido a Iglesia 360º</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground/70">Resumen</h3>
              <p className="mt-2 text-sm text-foreground/80">Aquí verás un resumen general del sistema.</p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground/70">Próximos eventos</h3>
              <p className="mt-2 text-sm text-foreground/80">Integra tu calendario para mostrar eventos.</p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground/70">Donaciones</h3>
              <p className="mt-2 text-sm text-foreground/80">Agrega tu proveedor de pagos para ver métricas.</p>
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
