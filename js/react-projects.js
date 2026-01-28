const { createElement } = React;
const root = ReactDOM.createRoot(document.getElementById("react-projects"));

function Projects() {
  const projects = [
    {
      title: "سایت شخصی",
      year: "2025",
      desc: "پورتفولیو شخصی با تمرکز بر UX و Performance",
      tags: ["HTML", "CSS", "Vanilla JS"],
      demoUrl: "#hero",
      codeUrl: "https://github.com/kiannaseranii-ki/my-portfolio",
    },
  ];

  return createElement(
    "div",
    { className: "projects-grid" },
    projects.map((p, i) =>
      createElement(
        "div",
        { className: "project-card", key: i },
        createElement("h3", null, p.title),
        createElement("p", null, p.desc),
        createElement(
          "div",
          { className: "project-tags" },
          p.tags.map((t) =>
            createElement("span", { className: "project-tag" }, t)
          )
        ),
        createElement(
          "div",
          { className: "project-actions" },
          createElement(
            "a",
            { href: p.demoUrl, className: "project-demo" },
            "دمو زنده"
          ),
          createElement(
            "a",
            {
              href: p.codeUrl,
              className: "project-link",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "مشاهده کد"
          )
        )
      )
    )
  );
}

root.render(createElement(Projects));
