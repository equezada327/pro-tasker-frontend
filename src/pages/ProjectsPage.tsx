import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await apiClient.get("/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiClient.post("/projects", { name, description });
    setProjects([...projects, res.data]);
    setName("");
    setDescription("");
  };

  const handleDelete = async (projectId: string) => {
    await apiClient.delete(`/projects/${projectId}`);
    setProjects(projects.filter((p) => p._id !== projectId));
  };

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl mb-8">Projects</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Project name"
          className="p-2 rounded bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project description"
          className="p-2 rounded bg-gray-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 p-2 rounded">Create Project</button>
      </form>

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/projects/${project._id}`} className="bg-blue-600 px-4 py-2 rounded">View</Link>
              <button onClick={() => handleDelete(project._id)} className="bg-red-600 px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;