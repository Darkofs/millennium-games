const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/gameData.ts");
let content = fs.readFileSync(filePath, "utf8");

// 1. Update Game interface to include isOnlineOnly?: boolean;
if (!content.includes("isOnlineOnly?: boolean;")) {
  content = content.replace(
    "  preorder?: boolean;\r\n}",
    "  preorder?: boolean;\r\n  isOnlineOnly?: boolean;\r\n}"
  ).replace(
    "  preorder?: boolean;\n}",
    "  preorder?: boolean;\n  isOnlineOnly?: boolean;\n}"
  );
}

// 2. Replace all regular 399 prices with 299
content = content.replace(/price:\s*399,/g, "price: 299,");
content = content.replace(/preorderPrice:\s*399,/g, "preorderPrice: 299,");
content = content.replace(/dealPrice:\s*399,/g, "dealPrice: 299,");

// 3. Specifically set COD Modern Warfare II and Modern Warfare III to 499 with isOnlineOnly: true
content = content.replace(
  /id:\s*8,\s*title:\s*"Call of Duty: Modern Warfare II",\s*price:\s*\d+,/g,
  'id: 8,\n    title: "Call of Duty: Modern Warfare II",\n    price: 499,\n    isOnlineOnly: true,'
);

content = content.replace(
  /id:\s*9,\s*title:\s*"Call of Duty: Modern Warfare III",\s*price:\s*\d+,/g,
  'id: 9,\n    title: "Call of Duty: Modern Warfare III",\n    price: 499,\n    isOnlineOnly: true,'
);

// Verify bundle deals are intact
console.log("Bundle 123 deal check:", content.includes("dealPrice: 1200"));
console.log("Bundle 124 deal check:", content.includes("dealPrice: 1100"));

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully updated gameData.ts");
