import Project from '../model/Project.js';

export async function getProjects(_, res) {
    try {
        const projects = await Project.getProjects();
        res.render("projects", { projects: projects });
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}