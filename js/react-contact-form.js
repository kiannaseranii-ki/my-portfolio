const e = React.createElement;

function ContactForm() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = React.useState({
    visible: false,
    text: "",
  });

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // پیام در حال ارسال (اختیاری اما خوب)
    setStatus({ visible: true, text: "در حال ارسال..." });

    const data = new FormData(event.target);

    fetch("/", {
      method: "POST",
      body: data,
    })
      .then(() => {
        setStatus({ visible: true, text: "پیام شما ارسال شد." });
        setForm({ name: "", email: "", message: "" });

        window.clearTimeout(ContactForm._t);
        ContactForm._t = window.setTimeout(() => {
          setStatus((prev) => ({ ...prev, visible: false }));
        }, 3500);
      })
      .catch(() => {
        setStatus({ visible: true, text: "ارسال ناموفق بود." });
      });
  };

  return e(
    "form",
    {
      className: "contact-form",
      name: "contact",
      method: "POST",
      "data-netlify": "true",
      onSubmit,
    },

    // فیلد مخفی برای Netlify (خیلی مهم)
    e("input", {
      type: "hidden",
      name: "form-name",
      value: "contact",
    }),

    e("input", {
      type: "text",
      name: "name",
      placeholder: "نام شما",
      required: true,
      value: form.name,
      onChange: onChange("name"),
    }),

    e("input", {
      type: "email",
      name: "email",
      placeholder: "ایمیل",
      required: true,
      value: form.email,
      onChange: onChange("email"),
    }),

    e("textarea", {
      name: "message",
      placeholder: "پیام شما",
      required: true,
      value: form.message,
      onChange: onChange("message"),
    }),

    e("button", { type: "submit", className: "cta-button" }, "ارسال پیام"),

    e(
      "p",
      { className: `form-status ${status.visible ? "is-visible" : ""}` },
      status.text
    )
  );
}

// Mount
const mount = document.getElementById("react-contact-form");
if (mount) {
  ReactDOM.createRoot(mount).render(e(ContactForm));
}
