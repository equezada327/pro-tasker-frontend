import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project, Task } from "../types";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const res = await apiClient.get(`/projects/${projectId}`);
      setProject(res.data);
    };
    const fetchTasks = async () => {
      const res = await apiClient.get(`/projects/${projectId}/tasks`);
      setTasks(res.data);
    };
    fetchProject();
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiClient.post(`/projects/${projectId}/tasks`, { title, description, status: "To Do" });
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  };

  const handleDeleteTask = async (taskId: string) => {
    await apiClient.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((t) => t._id !== taskId));
  };

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl mb-4">{project?.name}</h1>
      <p className="mb-8">{project?.description}</p>
      
      <h2 className="text-2xl mb-4">Add Task</h2>
      <form onSubmit={handleCreateTask} className="mb-8 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Task title"
          className="p-2 rounded bg-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description"
          className="p-2 rounded bg-gray-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 p-2 rounded">Create Task</button>
      </form>

      <h2 className="text-2xl mb-4">Tasks</h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <span className="text-sm text-gray-400">{task.status}</span>
            </div>
            <button onClick={() => handleDeleteTask(task._id)} className="bg-red-600 px-4 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;