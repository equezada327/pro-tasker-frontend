import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/projects");
        console.log(res.data);
        setProjects(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await apiClient.post("/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
      setName("");
      setDescription("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiClient.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading && projects.length === 0) {
    return <div className="text-3xl text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      {/* CREATE PROJECT FORM */}
      <form
        onSubmit={handleSubmit}
        className="border border-gray-600 p-6 mb-8 flex flex-col gap-4 rounded-lg bg-gray-800 max-w-md"
      >
        <h2 className="text-2xl font-bold">Create New Project</h2>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="project-name">Project Name:</label>
          <input
            type="text"
            name="project-name"
            className="border border-gray-600 p-2 rounded bg-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="project-description">Project Description:</label>
          <textarea
            name="project-description"
            className="border border-gray-600 p-2 rounded bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}

      {/* PROJECTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="text-gray-400 text-xl col-span-full text-center">
            No projects yet. Create your first project above!
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="border border-gray-600 p-4 rounded-lg bg-gray-800 flex flex-col gap-3 hover:border-blue-500 transition-colors"
            >
              <h3 className="font-bold text-xl">{project.name}</h3>
              <p className="text-gray-300 flex-grow">{project.description}</p>
              
              <div className="flex gap-2">
                <Link
                  to={`/projects/${project._id}`}
                  className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-center flex-grow"
                >
                  View Project
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
