const commissionForm = {
  title: "Use the request form to send your brief.",
  description:
    "Google Forms is the easiest commission intake option because it handles responses without a custom backend.",
  formUrl: "",
  embedUrl: ""
};

const formTitle = document.querySelector("#form-title");
const formDescription = document.querySelector("#form-description");
const formLink = document.querySelector("#form-link");
const formEmbedShell = document.querySelector("#form-embed-shell");
const formEmbed = document.querySelector("#form-embed");

formTitle.textContent = commissionForm.title;
formDescription.textContent = commissionForm.description;

if (commissionForm.formUrl) {
  formLink.href = commissionForm.formUrl;
  formLink.textContent = "Open commission request form";
} else {
  formLink.removeAttribute("href");
  formLink.setAttribute("aria-disabled", "true");
}

if (commissionForm.embedUrl) {
  formEmbedShell.hidden = false;
  formEmbed.src = commissionForm.embedUrl;
}