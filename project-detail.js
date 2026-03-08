// Project data
const projects = {
    ecommunity: {
        title: "Ecommunity.ph",
        image: "assets/images/projects/ecommunity.jpg",
        description: "A mobile-based solid waste management system for Baliwag, aimed at empowering residents, local government, and businesses to engage in sustainable practices. Implemented modules for garbage collection schedules, junkshop transactions, and waste segregation, alongside an educational blogspot that enhanced awareness of solid waste management.",
        youtubeLink: "https://youtube.com/watch?v=MZWhS6y7qc0",
        technologies: ["Flutter", "Firebase", "Dart"]
    },
    project2: {
        title: "Project Two",
        image: "assets/images/projects/project2.jpg",
        description: "A brief description of your second project with modern design. This project showcases advanced web development techniques and responsive design principles.",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    project3: {
        title: "Project Three",
        image: "assets/images/projects/project3.jpg",
        description: "A brief description of your third project demonstrating expertise. This project highlights full-stack development capabilities and modern architecture patterns.",
        technologies: ["Laravel", "MySQL", "Vue.js"]
    },
    project4: {
        title: "Project Four",
        image: "assets/images/projects/project4.jpg",
        description: "Additional project showcasing your skills and expertise. This demonstrates proficiency in mobile development and cloud integration.",
        technologies: ["Flutter", "Firebase", "Python"]
    },
    project5: {
        title: "Project Five",
        image: "assets/images/projects/project5.jpg",
        description: "Another project demonstrating your development capabilities. Features include real-time data processing and interactive user interfaces.",
        technologies: ["JavaScript", "HTML5", "CSS3"]
    },
    project6: {
        title: "Project Six",
        image: "assets/images/projects/project6.jpg",
        description: "More examples of your work and technical skills. This project showcases integration with third-party APIs and modern design patterns.",
        technologies: ["React", "Firebase", "TypeScript"]
    }
};

// Get project ID from URL
function getProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load project details
function loadProjectDetails() {
    const projectId = getProjectId();
    const project = projects[projectId];
    
    const contentContainer = document.getElementById('project-detail-content');
    
    if (!project) {
        contentContainer.innerHTML = `
            <div class="project-not-found">
                <h2>Project Not Found</h2>
                <p>The project you're looking for doesn't exist.</p>
                <a href="index.html#projects" class="cta-button">Back to Projects</a>
            </div>
        `;
        return;
    }
    
    // Build technologies HTML
    const techHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    // Build YouTube link HTML if available
    const youtubeLinkHTML = project.youtubeLink
        ? `<div class="project-link">
               <p>View more about the app: <a href="${project.youtubeLink}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>
           </div>`
        : '';
    
    contentContainer.innerHTML = `
        <div class="project-detail-container">
            <h1>${project.title}</h1>
            
            <div class="project-detail-image-container">
                <img src="${project.image}" alt="${project.title}">
            </div>
            
            <div class="project-detail-info">
                <h2>About This Project</h2>
                <p class="project-description">${project.description}</p>
                
                ${youtubeLinkHTML}
                
                <div class="project-technologies">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${techHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load project details when page loads
document.addEventListener('DOMContentLoaded', loadProjectDetails);
