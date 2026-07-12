import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AuthGuard } from "@/components/admin/auth-guard";

function AdminLayout() {
  const routerState = useRouterState();
  const isLoginPage = routerState.location.pathname === "/admin/login";

  return (
    <AuthProvider>
      {isLoginPage ? (
        <Outlet />
      ) : (
        <AuthGuard>
          <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 overflow-auto p-8">
              <Outlet />
            </main>
          </div>
        </AuthGuard>
      )}
    </AuthProvider>
  );
}

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});
