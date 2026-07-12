import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  school: string | null;
  year: string | null;
  description: string | null;
  sort_order: number;
}

const emptyEdu: Omit<Education, "id" | "sort_order"> = {
  degree: "",
  school: null,
  year: null,
  description: null,
};

function EducationPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState(emptyEdu);

  const { data: education = [], isLoading } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data } = await supabase
        .from("education")
        .select("*")
        .order("sort_order", { ascending: true });
      return (data ?? []) as Education[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      if (editing) {
        await supabase.from("education").update(data).eq("id", editing.id);
      } else {
        await supabase.from("education").insert(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      setOpen(false);
      setEditing(null);
      setForm(emptyEdu);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("education").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      setDeleteId(null);
    },
  });

  const openNew = () => {
    setEditing(null);
    setForm(emptyEdu);
    setOpen(true);
  };

  const openEdit = (e: Education) => {
    setEditing(e);
    setForm({
      degree: e.degree,
      school: e.school,
      year: e.year,
      description: e.description,
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Education</h1>
          <p className="mt-2 text-muted-foreground">{education.length} entries</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Degree</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : education.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No education entries yet. Click "Add Education" to get started.
                </TableCell>
              </TableRow>
            ) : (
              education.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.degree}</TableCell>
                  <TableCell>{e.school}</TableCell>
                  <TableCell>{e.year}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(e)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(e.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Education" : "Add Education"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>School</Label>
              <Input
                value={form.school ?? ""}
                onChange={(e) => setForm({ ...form, school: e.target.value || null })}
              />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={form.year ?? ""}
                onChange={(e) => setForm({ ...form, year: e.target.value || null })}
                placeholder="2021 — 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value || null })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editing ? "Save Changes" : "Add Education"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Education</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this education entry?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/admin/education")({
  component: EducationPage,
});
