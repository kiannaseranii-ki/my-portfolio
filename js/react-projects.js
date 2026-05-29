const projects = [
  {
    title: "وبسایت شخصی",
    year: "2025",
    status: "منتشر شده",
    desc: "وبسایت شخصی و پورتفولیو من با طراحی مینیمال، تمرکز بر تجربه کاربری و رابط کاربری مدرن.",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://www.kiannaserani.ir",
    codeUrl: "https://github.com/kiannaseranii-ki/my-portfolio",
  },
  {
    title: "فروشگاه محصولات اپل",
    year: "2026",
    status: "تکمیل شده",
    desc: "طراحی و توسعه فروشگاه آنلاین محصولات اپل با الهام از تم اپل، رابط کاربری مدرن و تجربه کاربری روان.",
    tags: ["React", "HTML", "CSS", "JavaScript"],
    demoUrl: "https://shop-website-project.netlify.app",
    codeUrl: "https://github.com/kiannaseranii-ki/shop-portfolio#",
    imageUrl: "/images/apple-store.png",
  },
];

const projectsContainer = document.getElementById("react-projects");

if (projectsContainer) {
  projectsContainer.innerHTML = `
    <section class="projects-section">
      <h2 class="section-title">نمونه‌کارها</h2>
      <div class="projects-grid">
        ${projects
          .map(
            (project) => `
          <article class="project-card ${project.imageUrl ? "has-image" : "no-image"}">
            ${
              project.imageUrl
                ? `
              <div class="project-image-container">
                <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
              </div>
            `
                : ""
            }

            <div class="project-content">
              <div class="project-meta">
                <span class="project-year">${project.year}</span>
                <span class="project-status">${project.status}</span>
              </div>

              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.desc}</p>

              <ul class="tags">
                ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
              </ul>

              <div class="project-links">
                <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-demo">
                  مشاهده سایت
                </a>
                <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-code">
                  مشاهده کد
                </a>
              </div>
            </div>
          </article>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}
