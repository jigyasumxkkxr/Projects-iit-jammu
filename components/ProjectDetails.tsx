import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, IndianRupee, ArrowLeft, User, Building2, GraduationCap } from 'lucide-react'
import Link from "next/link"

interface ProjectDetailsProps {
    id: string;
    title: string;
    description: string;
    professorName: string;
    deadline: string;
    duration: string;
    department: string;
    stipend: string;
    features: string[];
    closed: boolean;
}

export default function ProjectPage({
    id,
    title,
    description,
    professorName,
    deadline,
    duration,
    department,
    stipend,
    features,
    closed,
}: ProjectDetailsProps) {
  const isOutdated = new Date(deadline) < new Date() && !closed
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-background">
      <header className="border-b px-4">
        <div className="py-4 w-full">
          <Button asChild variant="ghost" className={`mb-4 ${closed ? "text-blue-600 bg-blue-100 hover:bg-blue-600 hover:text-white" : isOutdated ? "text-yellow-600 bg-yellow-100 hover:bg-yellow-600 hover:text-white" :  "text-teal-600 bg-teal-100 hover:bg-teal-600 hover:text-white" } `}>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <h1 className={`text-2xl sm:text-3xl font-bold break-words ${closed ? "text-blue-700" : isOutdated ? "text-yellow-700" : "text-teal-700" } `}>{title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-700" : "text-teal-700" }`} />
              <span className="text-sm sm:text-base">{professorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-700" : "text-teal-700" }`} />
              <span className="text-sm sm:text-base">{department}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-8 w-full">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Card className={`h-full ${closed ? "bg-gradient-to-b from-blue-600 to-blue-500 shadow-md shadow-blue-50" : isOutdated ? "bg-gradient-to-b from-yellow-600 to-yellow-500 shadow-md shadow-yellow-50" : "bg-gradient-to-b from-teal-600 to-teal-500 shadow-md shadow-teal-50" }`}>
              <CardHeader>
                <CardTitle className="text-white text-lg">Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className={`${closed ? "bg-gradient-to-t from-white to-blue-50 shadow-md shadow-blue-50" : isOutdated ? "bg-gradient-to-t from-white to-yellow-50 shadow-md shadow-yellow-50" : "bg-gradient-to-t from-white to-teal-50 shadow-md shadow-teal-50"}`}>
              <CardHeader>
                <CardTitle className={`${closed ? "text-blue-600" : isOutdated ? "text-yellow-600" : "text-teal-600"}`}>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <Clock className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-600" : "text-teal-700" }`} />
                  <span>Duration: {duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-600" : "text-teal-700" }`} />
                  <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
                </div>
                {stipend && (
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <IndianRupee className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-600" : "text-teal-700" }`} />
                    <span>Stipend: ₹{stipend}/month</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <GraduationCap className={`h-4 w-4 flex-shrink-0 ${closed ? "text-blue-700" : isOutdated ? "text-yellow-700" : "text-teal-700" }`} />
                  <span>Department: {department}</span>
                </div>
                <Button asChild className={`w-full ${closed ? "bg-blue-600 text-white hover:bg-blue-700" : isOutdated ? "bg-yellow-600 text-white hover:bg-yellow-700" : "bg-teal-600 text-white hover:bg-teal-700"} `}>
                  <Link href={`/student/apply/${id}`}>Apply for this Project</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className={`${closed ? "bg-gradient-to-t from-white to-blue-50 shadow-md shadow-blue-50" : isOutdated ? "bg-gradient-to-t from-white to-yellow-50 shadow-md shadow-yellow-50" : "bg-gradient-to-t from-white to-teal-50 shadow-md shadow-teal-50"}`}>
              <CardHeader>
                <CardTitle className={`${closed ? "text-blue-600" : isOutdated ? "text-yellow-600" : "text-teal-600"}`}>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <Badge key={feature} variant="secondary" className={`text-xs sm:text-sm ${closed ? "bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white" : isOutdated ? "bg-transparent text-yellow-600 hover:bg-yellow-600 hover:text-white" : "bg-transparent text-teal-600 hover:bg-teal-600 hover:text-white"}`}>
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
    </div>
  )
}