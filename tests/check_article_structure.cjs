const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
    console.error("Usage: node check_article_structure.js <path_to_html>");
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

const requirements = [
    { name: "Tailwind CDN", regex: /src="https:\/\/cdn\.tailwindcss\.com"/ },
    { name: "Space Grotesk Font", regex: /family=Space\+Grotesk/ },
    { name: "Lucide Icons", regex: /src="https:\/\/unpkg\.com\/lucide@latest"/ },
    { name: "Apple Navigation", regex: /class="[^"]*nav-blur[^"]*"/ },
    { name: "Hero Gradient", regex: /class="[^"]*hero-gradient[^"]*"/ },
    { name: "Article Content Class", regex: /class="[^"]*article-content[^"]*"/ },
    { name: "Table of Contents", regex: /class="[^"]*table-of-contents[^"]*"/ },
    { name: "Lucide Init Script", regex: /lucide\.createIcons\(\)/ }
];

let failed = false;
console.log(`Checking structure for: ${filePath}`);

requirements.forEach(req => {
    if (req.regex.test(content)) {
        console.log(`✅ ${req.name}`);
    } else {
        console.log(`❌ ${req.name} MISSING`);
        failed = true;
    }
});

if (failed) {
    console.error("\n❌ Structure validation failed! Please fix the article before pushing.");
    process.exit(1);
} else {
    console.log("\n✨ Structure validation passed!");
    process.exit(0);
}
