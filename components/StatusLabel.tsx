<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";

interface StatusLabelProps {
  status: string;
}

export function StatusLabel({ status }: StatusLabelProps) {
  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberto":
      case "open":
        return "Aberto";
      case "em_andamento":
      case "in_progress":
        return "Em andamento";
      case "solucionado":
      case "resolved":
      case "closed":
        return "Solucionado";
      default:
        return "Desconhecido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberto":
      case "open":
        return "bg-red-100 text-red-500";
      case "em_andamento":
      case "in_progress":
        return "bg-amber-100 text-amber-500";
      case "solucionado":
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-500";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <Badge
      className={`rounded-md px-2 py-1 text-base font-semibold ${getStatusColor(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
=======
import { Badge } from "@/components/ui/badge";

interface StatusLabelProps {
  status: string;
}

export function StatusLabel({ status }: StatusLabelProps) {
  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberto":
      case "open":
        return "Aberto";
      case "em_andamento":
      case "in_progress":
        return "Em andamento";
      case "solucionado":
      case "resolved":
      case "closed":
        return "Solucionado";
      default:
        return "Desconhecido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberto":
      case "open":
        return "bg-red-100 text-red-500";
      case "em_andamento":
      case "in_progress":
        return "bg-amber-100 text-amber-500";
      case "solucionado":
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-500";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <Badge
      className={`rounded-md px-2 py-1 text-base font-semibold ${getStatusColor(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
>>>>>>> fd4214c (Add self assign functionality)
