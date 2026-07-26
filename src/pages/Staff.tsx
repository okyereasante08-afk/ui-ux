import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

/*
  Content verified via live fetch of acesknust.com/department.
  Real find: this page is "Department Officials" — actual faculty
  leading the Computer Engineering department, NOT student staff. Don't
  confuse this with a student volunteer list.
*/

export default function Staff() {
  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      <PageHeader
        eyebrow="department // officials"
        title="Department Officials"
        description="Meet the dedicated faculty members leading the Computer Engineering Department."
      />
      <EmptyState
        title="No officials listed yet"
        description="TODO: wire in real faculty profiles (photo, name, title) — not built on the live site yet either, as of this fetch."
      />
    </div>
  );
}
