import fs from "fs";
import path from "path";

const injectPartials = (filePath) => {
  const fullPath = path.join("src", filePath); // Adjust path to read from src folder
  let content = fs.readFileSync(fullPath, "utf8");

  const common_head = fs.readFileSync("src/common/_head.html", "utf8");
  const common_navbar = fs.readFileSync("src/common/_navbar.html", "utf8");
  const common_footer = fs.readFileSync("src/common/_footer.html", "utf8");

  content = content.replace("<COMMON_HEAD />", common_head);
  content = content.replace("<COMMON_NAVBAR />", common_navbar);
  content = content.replace("<COMMON_FOOTER />", common_footer);

  const outputDir = "dist";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Ensure the dist directory exists
  }

  fs.writeFileSync(path.join(outputDir, filePath), content, "utf8");
};

// Adjust paths to include src folder
const files = ["index.html", "privacy.html", "terms.html", "about.html"];
files.forEach((file) => injectPartials(file));

console.log("Build completed successfully!");