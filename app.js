const name = 'Pablo Pulido Mencias'; 
let hasDownloadedResume = false;
let downloadCount = 0;

// Project data arrays
const projectTitles = [
    'Tetris Game',
    'Autonomous Microcontroller Car',
    'Web Development Portfolio'
];

const projectDescriptions = [
    'I built a basic simulation of the game tetris using java\'s object oriented features. The game had different modes in which you could play by yourself or let an algorithm play allocating the pieces the lowest and furthest right as possible.',
    'Using an STM32L152 microcontroller, I built a self driving car that detected obstacles and changed the direction. It included a buzzer in order to alert when it was detecting an obstacle, buzzing stronger the closer the obstacle was. It was also connected to a mobile phone through bluetooth using a USART device, which allowed for users to control the direction and speed of the car.',
    'Currently developing a comprehensive web development portfolio showcasing various projects including responsive design, JavaScript functionality, and modern web technologies. This project demonstrates proficiency in HTML, CSS, JavaScript, and Bootstrap framework.'
];

const projectDeadlines = [
    'May 2, 2022',
    'December 15, 2023',
    'December 31, 2025'
];

// Function to create greeting message
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

// Function to determine project status
function getProjectStatus(deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    if (deadlineDate > currentDate) {
        return 'Ongoing';
    } else if (deadlineDate < currentDate) {
        return 'Completed';
    } else {
        return 'Due Today';
    }
}

// Function to dynamically generate project HTML using a for loop
function generateProjectsHTML() {
    let projectsHTML = '';
    
    // Use for loop to iterate over project arrays
    for (let i = 0; i < projectTitles.length; i++) {
        const title = projectTitles[i];
        const description = projectDescriptions[i];
        const deadline = projectDeadlines[i];

        const projectStatus = getProjectStatus(deadline);

        let projectType = '';
        let badgeClass = '';
        let cardClass = '';
        
        if (i === 0) {
            projectType = 'Programming Project';
            badgeClass = 'btn-outline-primary';
            cardClass = 'text-primary';
        } else if (i === 1) {
            projectType = 'Hardware Project';
            badgeClass = 'bg-success';
            cardClass = 'text-success';
        } else {
            projectType = 'Web Development Project';
            badgeClass = 'bg-warning text-dark';
            cardClass = 'text-warning';
        }
        
        // Calculate days remaining for the deadline
        const daysRemaining = daysUntilDeadline(deadline);
        let daysRemainingHTML = '';
        
        if (daysRemaining > 0) {
            daysRemainingHTML = `<div class="mb-3">
                <strong>Days Remaining:</strong> <span class="badge bg-warning text-dark">${daysRemaining} days</span>
            </div>`;
        } else if (daysRemaining === 0) {
            daysRemainingHTML = `<div class="mb-3">
                <strong>Days Remaining:</strong> <span class="badge bg-danger">Due today!</span>
            </div>`;
        } else {
            daysRemainingHTML = `<div class="mb-3">
                <strong>Days Remaining:</strong> <span class="badge bg-danger">${Math.abs(daysRemaining)} days overdue</span>
            </div>`;
        }
        
        // Determine status badge styling based on project status
        let statusBadgeClass = '';
        if (projectStatus === 'Ongoing') {
            statusBadgeClass = 'bg-info text-white';
        } else if (projectStatus === 'Completed') {
            statusBadgeClass = 'bg-success text-white';
        } else {
            statusBadgeClass = 'bg-warning text-dark';
        }
        
        // Generate HTML for each project
        projectsHTML += `
            <div class="col-lg-6 col-md-12 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title ${cardClass}">${title}</h5>
                        <p class="card-text">${description}</p>
                        <div class="mb-3">
                            <strong>Deadline:</strong> <span class="project-deadline">${deadline}</span>
                        </div>
                        <div class="mb-3">
                            <strong>Status:</strong> <span class="badge ${statusBadgeClass}">${projectStatus}</span>
                        </div>
                        ${daysRemainingHTML}
                        <span class="badge ${badgeClass}">${projectType}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    return projectsHTML;
}

// Function to handle resume download and update count
function handleResumeDownload() {
    downloadCount++;
    updateDownloadCountDisplay();
    alert(`Your resume has been downloaded successfully! Total downloads: ${downloadCount}`);
    hasDownloadedResume = true;
}
// Function to update download count display
function updateDownloadCountDisplay() {
    const downloadCountElement = document.getElementById('download-count');
    if (downloadCountElement) {
        downloadCountElement.textContent = downloadCount;
    }
}


// Function to calculate days until deadline
function daysUntilDeadline(deadlineDate) {
    // Get current date
    const currentDate = new Date();
    
    // Create date object from deadline parameter
    const deadline = new Date(deadlineDate);
    
    // Calculate the difference in milliseconds
    const timeDifference = deadline.getTime() - currentDate.getTime();
    
    // Convert milliseconds to days (1000 ms * 60 s * 60 m * 24 h)
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysRemaining;
}

// Function to add a new skill to the appropriate category
function addSkill(skillName) {
    // Get the skill input and clear it
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (!skill) {
        alert('Please enter a skill name.');
        return;
    }
    
    let targetList;
    let badgeClass;
    
    // Programming skills
    const programmingKeywords = ['programming', 'code', 'java', 'python', 'javascript', 'c++', 'c#', 'php', 'ruby', 'swift', 'kotlin', 'go', 'rust', 'html', 'css', 'sql', 'algorithm', 'data structure'];
    // Tools skills  
    const toolsKeywords = ['tool', 'software', 'ide', 'editor', 'debugger', 'git', 'docker', 'kubernetes', 'aws', 'azure', 'linux', 'windows', 'macos', 'database', 'server'];
    // Language skills
    const languageKeywords = ['language', 'spanish', 'english', 'french', 'german', 'italian', 'portuguese', 'chinese', 'japanese', 'korean', 'arabic', 'russian'];
    
    const lowerSkill = skill.toLowerCase();
    
    if (programmingKeywords.some(keyword => lowerSkill.includes(keyword))) {
        targetList = document.getElementById('programming-skills');
        badgeClass = 'badge bg-primary me-2';
    } else if (toolsKeywords.some(keyword => lowerSkill.includes(keyword))) {
        targetList = document.getElementById('tools-skills');
        badgeClass = 'badge bg-success me-2';
    } else if (languageKeywords.some(keyword => lowerSkill.includes(keyword))) {
        targetList = document.getElementById('languages-skills');
        badgeClass = 'badge bg-warning text-dark me-2';
    } else {
        targetList = document.getElementById('programming-skills');
        badgeClass = 'badge bg-primary me-2';
    }
    
    // Check if skill already exists
    const existingSkills = targetList.querySelectorAll('span');
    for (let existingSkill of existingSkills) {
        if (existingSkill.textContent.toLowerCase() === skill.toLowerCase()) {
            alert('This skill already exists!');
            return;
        }
    }
    
    // Create new skill element
    const newSkillItem = document.createElement('li');
    newSkillItem.className = 'mb-2';
    newSkillItem.innerHTML = `<span class="${badgeClass}">${skill}</span>`;

    targetList.appendChild(newSkillItem);

    skillInput.value = '';
    // Show skill message
    alert(`Skill "${skill}" has been added successfully!`);
}

// Add click event for the download button
document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById('greeting-message');
    if (greetingElement) {
        greetingElement.textContent = showGreeting(name);
    }
    
    // Initialize download count display
    updateDownloadCountDisplay();
    
    // Find the download button by its href attribute
    const downloadButton = document.querySelector('a[href="Portfolio_Pablo Pulido.pdf"]');
    
    if (downloadButton) { // Check if the button exists
        downloadButton.addEventListener('click', function(event) {
            // Call the new download handler function
            handleResumeDownload();
        });
    }
    
    // Add event listener for the skills form
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting normally
            addSkill(); // Call the addSkill function
        });
    }
    
    // Generate and populate projects dynamically
    const projectsContainer = document.querySelector('#projects .row');
    if (projectsContainer) {
        // Clear existing content and add dynamically generated projects
        projectsContainer.innerHTML = generateProjectsHTML();
    }
});