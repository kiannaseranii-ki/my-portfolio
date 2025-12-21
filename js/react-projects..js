const { createElement } = React;
const root = ReactDOM.createRoot(document.getElementById("react-projects"));

function Projects() {
  const projects = [
    {
      title: "سایت شخصی",
      year: "2025",
      desc: "پورتفولیو شخصی با تمرکز بر UX و Performance",
      tags: ["HTML", "CSS", "Vanilla JS"],
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
        )
      )
    )
  );
}

root.render(createElement(Projects));
