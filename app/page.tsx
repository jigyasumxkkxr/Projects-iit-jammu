"use client"
import { useEffect, useState } from "react";
import { ProjectsList } from "@/components/projects-list";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import NoProjects from "@/components/no_project";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("/api/projects/list", {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-grow bg-background max-w-screen overflow-x-hidden">
      <Header />

      <main className="py-8 w-full">
        {loading ? (
          <div className={cn("flex mt-64 items-center justify-center bg-white")}>
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-700"></div>
              </div>
        ) : error ? (
          <div className="flex w-screen h-fit mt-48 lg:mt-64 justify-center items-center">
            <div className="bg-red-100 text-red-500 flex gap-2 p-3 rounded-md shadow">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm ">{error}</p>
            </div>
          </div>
        ) : projects.length > 0 ? (
          <ProjectsList projects={projects} />
        ) : (
          <NoProjects />
        )}
      </main>
    </div>
  );
}
