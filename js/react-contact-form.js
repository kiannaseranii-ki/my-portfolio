const e = React.createElement;

const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

function ContactForm() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
    botField: "",
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

    setStatus({ visible: true, text: "در حال ارسال..." });

    const payload = {
      "form-name": "contact",
      name: form.name,
      email: form.email,
      message: form.message,
      "bot-field": form.botField,
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(payload),
    })
      .then(() => {
        setStatus({ visible: true, text: "پیام شما ارسال شد. ممنون!" });
        setForm({ name: "", email: "", message: "", botField: "" });

        window.clearTimeout(ContactForm._t);
        ContactForm._t = window.setTimeout(() => {
          setStatus((prev) => ({ ...prev, visible: false }));
        }, 3500);
      })
      .catch(() => {
        setStatus({
          visible: true,
          text: "خطا شد. دوباره تلاش کنید.",
        });
      });
  };

  return e(
    "form",
    {
      className: "contact-form",
      name: "contact",
      method: "POST",
      "data-netlify": "true",
      "netlify-honeypot": "bot-field",
      onSubmit,
    },

    e("input", {
      type: "hidden",
      name: "form-name",
      value: "contact",
    }),

    e(
      "p",
      { className: "sr-only" },
      e("label", { htmlFor: "bot-field" }, "این فیلد را خالی بگذارید"),
      e("input", {
        id: "bot-field",
        name: "bot-field",
        value: form.botField,
        onChange: onChange("botField"),
        tabIndex: "-1",
        autoComplete: "off",
      })
    ),

    e("input", {
      type: "text",
      name: "name",
      placeholder: "نام",
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

const mount = document.getElementById("react-contact-form");
if (mount) {
  ReactDOM.createRoot(mount).render(e(ContactForm));
}
