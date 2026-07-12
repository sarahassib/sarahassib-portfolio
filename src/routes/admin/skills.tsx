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

interface Skill {
  id: string;
  category: string;
  icon: string | null;
  items: string[];
  sort_order: number;
}

const emptySkill: Omit<Skill, "id" | "sort_order"> = {
  category: "",
  icon: null,
  items: [],
};

function SkillsPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptySkill);
  const [itemsInput, setItemsInput] = useState("");

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });
      return (data ?? []) as Skill[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      if (editing) {
        await supabase.from("skills").update(data).eq("id", editing.id);
      } else {
        await supabase.from("skills").insert(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setOpen(false);
      setEditing(null);
      setForm(emptySkill);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("skills").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setDeleteId(null);
    },
  });

  const openNew = () => {
    setEditing(null);
    setForm(emptySkill);
    setItemsInput("");
    setOpen(true);
  };

  const openEdit = (s: Skill) => {
    setEditing(s);
    setForm({ category: s.category, icon: s.icon, items: s.items ?? [] });
    setItemsInput((s.items ?? []).join(", "));
    setOpen(true);
  };

  const addItems = () => {
    if (itemsInput.trim()) {
      setForm({
        ...form,
        items: itemsInput
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Skills</h1>
          <p className="mt-2 text-muted-foreground">{skills.length} skill groups</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Skill Group
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No skill groups yet. Click "Add Skill Group" to get started.
                </TableCell>
              </TableRow>
            ) : (
              skills.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(s.items ?? []).slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-secondary px-2 py-0.5 text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                      {(s.items ?? []).length > 4 && (
                        <span className="text-[11px] text-muted-foreground">
                          +{(s.items ?? []).length - 4}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(s.id)}>
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
            <DialogTitle>{editing ? "Edit Skill Group" : "Add Skill Group"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Paid Advertising"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon Name</Label>
              <Input
                value={form.icon ?? ""}
                onChange={(e) => setForm({ ...form, icon: e.target.value || null })}
                placeholder="e.g. Megaphone"
              />
            </div>
            <div className="space-y-2">
              <Label>Items (comma separated)</Label>
              <Textarea
                value={itemsInput}
                onChange={(e) => setItemsInput(e.target.value)}
                onBlur={addItems}
                placeholder="Meta Ads, Google Ads, TikTok Ads"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editing ? "Save Changes" : "Add Skill Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Skill Group</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this skill group?
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

export const Route = createFileRoute("/admin/skills")({
  component: SkillsPage,
});
