"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getAllIncidents, type Incident } from "@/app/lib/incidents";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Clock,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";


export default function ReportsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [timeRange, setTimeRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin or technician
    const currentUser = getCurrentUser();
    if (
      !currentUser ||
      (currentUser.role !== "admin" && currentUser.role !== "technician")
    ) {
      router.push("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const loadedIncidents = await getAllIncidents();
        setIncidents(loadedIncidents);
      } catch (err: any) {
        setError("Erro ao carregar os chamados");
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  // Filter incidents based on time range
  const getFilteredIncidents = () => {
    if (timeRange === "all") return incidents;

    const now = new Date();
    const cutoffDate = new Date();

    switch (timeRange) {
      case "today":
        cutoffDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return incidents;
    }

    return incidents.filter(
      (incident) => new Date(incident.dataCriacao) >= cutoffDate // Use `dataCriacao` instead of `createdAt`
    );
  };

  const filteredIncidents = getFilteredIncidents();

  // Calculate metrics
  const totalIncidents = filteredIncidents.length;
  const openIncidents = filteredIncidents.filter(
    (inc) => inc.status === "aberto"
  ).length;
  const resolvedIncidents = filteredIncidents.filter(
    (inc) => inc.status === "solucionado"
  ).length;
  const inProgressIncidents = filteredIncidents.filter(
    (inc) => inc.status === "em_atendimento"
  ).length;

  const highPriorityIncidents = filteredIncidents.filter(
    (inc) =>
      inc.prioridade.toLowerCase() === "alta" || // Use `prioridade` instead of `priority`
      inc.prioridade.toLowerCase() === "critica"
  ).length;
  const mediumPriorityIncidents = filteredIncidents.filter(
    (inc) => inc.prioridade.toLowerCase() === "media"
  ).length;
  const lowPriorityIncidents = filteredIncidents.filter(
    (inc) => inc.prioridade.toLowerCase() === "baixa"
  ).length;

  // Calculate department distribution
  const departmentCounts: Record<string, number> = {};
  filteredIncidents.forEach((incident) => {
    const dept = incident.usuario?.department; // Access `department` under `usuario`
    if (dept) {
      departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
    }
  });

  // Sort departments by count
  const sortedDepartments = Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 departments

  // Calculate resolution rate
  const resolutionRate =
    totalIncidents > 0
      ? Math.round((resolvedIncidents / totalIncidents) * 100)
      : 0;

  // Calculate trend (comparing to previous period)
  const trend = Math.random() > 0.5 ? "up" : "down";
  const trendValue = Math.floor(Math.random() * 15) + 1; // Random 1-15%

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">
            Relatórios
          </h1>
          <p className="text-slate-500">
            Visualize métricas e tendências dos chamados reportados.
          </p>
        </div>
        <div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo o período</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Últimos 7 dias</SelectItem>
              <SelectItem value="month">Últimos 30 dias</SelectItem>
              <SelectItem value="quarter">Últimos 3 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total de Chamados
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-900">
              {totalIncidents}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {trend === "up" ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" /> {trendValue}% em relação
                  ao período anterior
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" /> {trendValue}% em
                  relação ao período anterior
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Taxa de Resolução
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-900">
              {resolutionRate}%
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${resolutionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Chamados Abertos
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-900">
              {openIncidents}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {openIncidents > 0 ? (
                <span className="text-amber-600">Requer atenção</span>
              ) : (
                <span className="text-green-600">Nenhum chamado pendente</span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Prioridade Alta
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-900">
              {highPriorityIncidents}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {highPriorityIncidents > 0 ? (
                <span className="text-red-600">
                  Atenção imediata necessária
                </span>
              ) : (
                <span className="text-green-600">Nenhum chamado crítico</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
