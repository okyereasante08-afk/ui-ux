import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

/*
  Header copy verified via live fetch of acesknust.com/courses
  (real meta description: "Download lecture slides, past questions, and
  study materials for Computer Engineering courses at KNUST"). No real
  resource listings were visible in that fetch — treated as empty.
*/

export default function Courses() {
  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="courses // resources"
        title="Course Materials"
        description="Access comprehensive course materials, resources, and study guides for your academic program."
      />
      <EmptyState
        title="No resources uploaded yet"
        description="TODO: wire in real lecture slides, past questions, and study guides once available."
      />
    </div>
  );
}
