import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PortfolioData } from '../types/Portfolio';

export const generateFiles = async (data: PortfolioData) => {
  const zip = new JSZip();

  // Generate index.html
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/framer-motion@11.0.8/dist/framer-motion.js"></script>
    <style>
        body { 
            background-color: #111827;
            scroll-behavior: smooth;
        }
        .animate-float {
            animation: float 2s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    </style>
</head>
<body>
    <nav class="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-50">
        <div class="max-w-4xl mx-auto px-6 py-4">
            <ul class="flex justify-center space-x-8">
                <li><a href="#about" class="text-gray-300 hover:text-violet-400 transition-colors">About</a></li>
                <li><a href="#experience" class="text-gray-300 hover:text-violet-400 transition-colors">Experience</a></li>
                <li><a href="#projects" class="text-gray-300 hover:text-violet-400 transition-colors">Projects</a></li>
                <li><a href="#contact" class="text-gray-300 hover:text-violet-400 transition-colors">Contact</a></li>
            </ul>
        </div>
    </nav>
    <div id="root" class="pt-16"></div>
    <script type="module" src="./main.js"></script>
</body>
</html>`;

  // Generate main.js with the portfolio data
  const js = `const data = ${JSON.stringify(data, null, 2)};

// Render the portfolio
document.getElementById('root').innerHTML = \`
  <div class="max-w-4xl mx-auto p-8 text-white">
    <header class="text-center mb-16 animate-float">
      <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
        ${data.name}
      </h1>
      <p class="text-xl mt-4 text-gray-300">${data.title}</p>
    </header>

    <section id="about" class="mb-16 scroll-mt-20">
      <h2 class="text-2xl font-bold mb-6 text-violet-400">About Me</h2>
      <p class="text-gray-300 leading-relaxed">${data.about}</p>
    </section>

    <section id="experience" class="mb-16 scroll-mt-20">
      <h2 class="text-2xl font-bold mb-6 text-violet-400">Experience</h2>
      <div class="space-y-8">
        ${data.experience.map(exp => `
          <div class="border-l-2 border-violet-500 pl-6 relative hover:translate-x-2 transition-transform">
            <div class="absolute w-3 h-3 bg-violet-500 rounded-full -left-[7px] top-2"></div>
            <h3 class="text-xl font-semibold">${exp.company}</h3>
            <p class="text-violet-400">${exp.position}</p>
            <p class="text-gray-400 text-sm">${exp.duration}</p>
            <p class="mt-2 text-gray-300">${exp.description}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="projects" class="mb-16 scroll-mt-20">
      <h2 class="text-2xl font-bold mb-6 text-violet-400">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.projects.map(project => `
          <div class="bg-gray-800 rounded-lg overflow-hidden hover:-translate-y-2 transition-transform">
            ${project.imageUrl ? `
              <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-48 object-cover"/>
            ` : ''}
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold">${project.title}</h3>
                ${project.link ? `
                  <a href="${project.link}" target="_blank" rel="noopener noreferrer" 
                     class="text-violet-400 hover:text-violet-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ` : ''}
              </div>
              <p class="text-gray-300 mb-4">${project.description}</p>
              <div class="flex flex-wrap gap-2">
                ${project.technologies.map(tech => `
                  <span class="px-3 py-1 bg-violet-500 bg-opacity-20 text-violet-300 rounded-full text-sm">
                    ${tech}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="contact" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-6 text-violet-400">Contact</h2>
      <div class="flex flex-wrap gap-4">
        <a href="mailto:${data.contact.email}" 
           class="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          ${data.contact.email}
        </a>
        ${data.contact.linkedin ? `
          <a href="${data.contact.linkedin}" target="_blank" rel="noopener noreferrer"
             class="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
        ` : ''}
        ${data.contact.github ? `
          <a href="${data.contact.github}" target="_blank" rel="noopener noreferrer"
             class="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        ` : ''}
      </div>
    </section>
  </div>
\`;

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
`;

  zip.file('index.html', html);
  zip.file('main.js', js);

  // Generate the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'portfolio.zip');
};