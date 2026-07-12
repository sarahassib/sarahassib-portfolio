import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  FolderKanban,
  Award,
  Wrench,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Loader2,
} from "lucide-react";

async function getCount(table: string) {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}

function DashboardPage() {
  const tables = [
    { name: "projects", label: "Projects", icon: FolderKanban, color: "text-blue-500" },
    { name: "certifications", label: "Certifications", icon: Award, color: "text-amber-500" },
    { name: "tools", label: "Tools", icon: Wrench, color: "text-green-500" },
    { name: "skills", label: "Skills", icon: Lightbulb, color: "text-purple-500" },
    { name: "education", label: "Education", icon: GraduationCap, color: "text-cyan-500" },
    { name: "experience", label: "Experience", icon: Briefcase, color: "text-rose-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Manage your portfolio content</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map(({ name, label, icon: Icon, color }) => (
          <CountCard key={name} table={name} label={label} icon={Icon} color={color} />
        ))}
      </div>
    </div>
  );
}

function CountCard({
  table,
  label,
  icon: Icon,
  color,
}: {
  table: string;
  label: string;
  icon: React.ElementType;
  color: string;
}) {
  const { data: count, isLoading } = useQuery({
    queryKey: ["count", table],
    queryFn: () => getCount(table),
  });

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-card-foreground/70">{label}</div>
          <div className="mt-1 text-3xl font-semibold">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : count}
          </div>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-xl bg-secondary ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});
