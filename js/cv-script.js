async function loadCvData() {
    try {
        const [profileData, educationData, experienceData, projectsData] = await Promise.all([
            fetch('data/profile.json').then(res => res.json()),
            fetch('data/education.json').then(res => res.json()),
            fetch('data/experience.json').then(res => res.json()),
            fetch('data/projects.json').then(res => res.json())
        ]);

        renderCvProfile(profileData);
        renderCvSkills(profileData.skills || []);
        renderCvSocial(profileData.socialMedia || []);
        renderCvEducation(educationData);
        renderCvExperience(experienceData);
        renderCvProjects(projectsData);
        document.getElementById('current-year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error('Error loading CV data:', error);
    }
}

function renderCvProfile(data) {
    document.getElementById('cv-name').textContent = data.name;
    document.getElementById('cv-description').textContent = data.description;
    document.getElementById('cv-email').textContent = data.email;
    document.getElementById('cv-phone').textContent = data.phone;

    const photo = document.getElementById('cv-photo');
    photo.src = data.profileImage;
    photo.alt = `${data.name} profile picture`;
}

function renderCvSkills(skills) {
    const skillsContainer = document.getElementById('cv-skills');
    skillsContainer.innerHTML = '';

    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'cv-skill-item';
        skillItem.innerHTML = `<span class="cv-skill-name">${skill.name}</span>`;
        skillsContainer.appendChild(skillItem);
    });
}

function renderCvSocial(socialMedia) {
    const socialContainer = document.getElementById('cv-social');
    socialContainer.innerHTML = '';

    socialMedia.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<i class="fab fa-${social.platform.toLowerCase()}"></i> ${social.platform}`;
        socialContainer.appendChild(link);
    });
}

function renderCvEducation(data) {
    const educationContainer = document.getElementById('cv-education');
    educationContainer.innerHTML = '';

    data.forEach(item => {
        const educationItem = document.createElement('div');
        educationItem.className = 'cv-list-item';
        educationItem.innerHTML = `
            <div class="cv-item-header">
                <h4>${item.university}</h4>
                <span>${item.year}</span>
            </div>
            <p class="cv-item-subtitle">${item.major}</p>
            <p>${item.description}</p>
        `;
        educationContainer.appendChild(educationItem);
    });
}

function renderCvExperience(data) {
    const experienceContainer = document.getElementById('cv-experience');
    experienceContainer.innerHTML = '';

    data.forEach(item => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'cv-list-item';
        experienceItem.innerHTML = `
            <div class="cv-item-header">
                <h4>${item.company}</h4>
                <span>${item.year}</span>
            </div>
            <p class="cv-item-subtitle">${item.position}</p>
            <p>${item.description}</p>
        `;
        experienceContainer.appendChild(experienceItem);
    });
}

function renderCvProjects(data) {
    const projectsContainer = document.getElementById('cv-projects');
    projectsContainer.innerHTML = '';

    data.forEach(item => {
        const projectItem = document.createElement('div');
        projectItem.className = 'cv-list-item';
        projectItem.innerHTML = `
            <div class="cv-item-header">
                <h4>${item.title}</h4>
                <span>${item.year}</span>
            </div>
            <p class="cv-item-subtitle">${item.role || 'Team Member'}</p>
            <p>${item.description}</p>
        `;
        projectsContainer.appendChild(projectItem);
    });
}

function setupPrintButton() {
    const printButton = document.getElementById('print-cv');
    if (printButton) {
        printButton.addEventListener('click', () => {
            const element = document.querySelector('.cv-page');
            if (!element) {
                window.print();
                return;
            }

            const opt = {
                margin:       0.4,
                filename:     'CV-Rachmadhani-Aji.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadCvData();
    setupPrintButton();
});
