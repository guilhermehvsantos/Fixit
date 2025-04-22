<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  switch (priority.toLowerCase()) {
    case "critica":
      return (
        <Badge variant="outline" className="border-purple-600 text-purple-600">
          Crítica
        </Badge>
      );
    case "alta":
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Alta
        </Badge>
      );
    case "media":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Média
        </Badge>
      );
    case "baixa":
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Baixa
        </Badge>
      );
    default:
      return <Badge variant="outline">Normal</Badge>;
  }
=======
import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  switch (priority.toLowerCase()) {
    case "critica":
      return (
        <Badge variant="outline" className="border-purple-600 text-purple-600">
          Crítica
        </Badge>
      );
    case "alta":
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Alta
        </Badge>
      );
    case "media":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Média
        </Badge>
      );
    case "baixa":
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Baixa
        </Badge>
      );
    default:
      return <Badge variant="outline">Normal</Badge>;
  }
>>>>>>> fd4214c (Add self assign functionality)
}