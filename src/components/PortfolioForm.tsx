import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../types/Portfolio';
import { Download, Plus, Trash2 } from 'lucide-react';
import {FaGithub} from 'react-icons/fa'


interface Props {
  onSubmit: (data: PortfolioData) => void;
}

export default function PortfolioForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<PortfolioData>({
    name: '',
    title: '',
    about: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [] ,
    projects: [{ title: '', description: '', technologies: [], imageUrl: '', link: '' }],
    contact: { email: '' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }]
    });
  };

  const skillsDatabase = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
  { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "Rails", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitLab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "Webpack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
  { name: "Babel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
];

  const addSkill = (skillName: string) => {
  const selectedSkill = skillsDatabase.find(skill => skill.name === skillName);
  if (selectedSkill && !formData.skills.some(skill => skill.name === skillName)) {
    setFormData({
      ...formData,
      skills: [...formData.skills, selectedSkill],
    });
  }
};



  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', technologies: [], imageUrl: '', link: '' }]
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-8 mt-16"
      onSubmit={handleSubmit}
    >
      <nav className="fixed top-0 left-0 w-full bg-gray-900 p-4 flex justify-between items-center shadow-lg z-50">
      {/* App Name */}
        <h1 className="text-xl font-bold text-[#a78bfa]">PortfolioForge</h1>
        <h1 className="text-xl font-bold text-center text-[#a78bfa]"><span><a target='blank' href='https://resume-builder-hyper-k4j27ael6-hyperboys-projects.vercel.app/'>Build Your Resume</a></span></h1>

      {/* GitHub Link */}
      <a
        href="https://github.com/hyperboy107/portfolio-generator/tree/master"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white hover:text-violet-500"
      >
        <FaGithub size={20} />
        GitHub Repo
      </a>
    </nav>


      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-violet-600">Basic Information</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500 focus:ring-2 focus:ring-violet-600"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Professional Title"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500 focus:ring-2 focus:ring-violet-600"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="About Me"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500 focus:ring-2 focus:ring-violet-600"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-violet-600">Experience</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg text-white"
          >
            <Plus size={20} /> Add Experience
          </motion.button>
        </div>
        {formData.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3 p-4 border border-violet-500 rounded-lg"
          >
            <input
              type="text"
              placeholder="Company"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={exp.company}
              onChange={(e) => {
                const newExp = [...formData.experience];
                newExp[index].company = e.target.value;
                setFormData({ ...formData, experience: newExp });
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
                value={exp.position}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].position = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Duration"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
                value={exp.duration}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].duration = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
            <textarea
              placeholder="Description"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={exp.description}
              onChange={(e) => {
                const newExp = [...formData.experience];
                newExp[index].description = e.target.value;
                setFormData({ ...formData, experience: newExp });
              }}
              rows={3}
            />
          </motion.div>
        ))}
      </div>


      <div className="space-y-4">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-violet-600">Skills & Tools</h2>
    <select
      className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-violet-500"
      onChange={(e) => addSkill(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Select a Skill
      </option>
      {skillsDatabase.map((skill) => (
        <option key={skill.name} value={skill.name}>
          {skill.name}
        </option>
      ))}
    </select>
  </div>
  <div className="flex flex-wrap gap-4">
    {formData.skills.map((skill, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-violet-500"
      >
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-8 h-8"
        />
        <span className="text-white">{skill.name}</span>
      </motion.div>
    ))}
  </div>
</div>



      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-violet-600">Projects</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg text-white"
          >
            <Plus size={20} /> Add Project
          </motion.button>
        </div>
        {formData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3 p-4 border border-violet-500 rounded-lg"
          >
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={project.title}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].title = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
            />
            <textarea
              placeholder="Project Description"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].description = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              rows={3}
            />
            <input
              type="text"
              placeholder="Project Image URL"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={project.imageUrl}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].imageUrl = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
            />
            <input
              type="text"
              placeholder="Project Link"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={project.link}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].link = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
              value={project.technologies.join(', ')}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].technologies = e.target.value.split(',').map(tech => tech.trim());
                setFormData({ ...formData, projects: newProjects });
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-violet-600">Contact Information</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
          value={formData.contact.email}
          onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
        />
        <input
          type="text"
          placeholder="LinkedIn URL (optional)"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
          value={formData.contact.linkedin || ''}
          onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, linkedin: e.target.value } })}
        />
        <input
          type="text"
          placeholder="GitHub URL (optional)"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-violet-500"
          value={formData.contact.github || ''}
          onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, github: e.target.value } })}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 bg-violet-600 text-white rounded-lg flex items-center justify-center gap-2"
      >
        <Download size={20} />
        Generate Portfolio
      </motion.button>
    </motion.form>
  );
}