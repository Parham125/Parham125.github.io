const root = document.documentElement
const toggle = document.querySelector(".theme")
const themeMeta = document.querySelector("meta[name=theme-color]")
const comments = document.getElementById("comments")

function applyTheme(theme) {
  root.dataset.theme = theme
  themeMeta.content = theme === "light" ? "#E4E5E0" : "#1A1D21"
  toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode")
  const frame = document.querySelector("iframe.giscus-frame")
  if (frame) frame.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app")
}

applyTheme(root.dataset.theme === "light" ? "light" : "dark")
toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light"
  applyTheme(next)
  try { localStorage.setItem("theme", next) } catch (e) {}
})
if (comments) {
  // giscus reads its config from data-* attributes on its own script tag, so copy them over
  const script = document.createElement("script")
  for (const attr of comments.attributes) if (attr.name.startsWith("data-")) script.setAttribute(attr.name, attr.value)
  script.setAttribute("data-theme", root.dataset.theme === "light" ? "light" : "dark")
  script.src = "https://giscus.app/client.js"
  script.crossOrigin = "anonymous"
  script.async = true
  comments.appendChild(script)
}
