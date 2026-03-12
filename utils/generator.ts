import { Section } from '../types';

export const generateMarkdown = (sections: Section[], globalUsername: string): string => {
  let markdown = '';

  sections.forEach((section) => {
    const { type, data } = section;

    switch (type) {
      case 'header':
        if (data.showBanner && data.bannerUrl) {
          markdown += `![Header](${data.bannerUrl})\n\n`;
        }
        markdown += `# ${data.title}\n\n`;
        if (data.subtitle) markdown += `### ${data.subtitle}\n\n`;
        break;

      case 'about':
        markdown += `${data.text}\n\n`;
        break;

      case 'tech-stack':
        markdown += `### 🛠️ Languages and Tools\n\n`;
        markdown += `<p align="left">\n`;
        data.icons.forEach((iconClass: string) => {
          const iconName = iconClass.replace('devicon-', '').split('-')[0];
          const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
          markdown += `  <a href="https://skillicons.dev" target="_blank" rel="noreferrer"> <img src="${url}" alt="${iconName}" width="40" height="40"/> </a> \n`;
        });
        markdown += `</p>\n\n`;
        break;

      case 'stats':
        if (!globalUsername) break;
        markdown += `### ⚡ Stats\n\n`;
        markdown += `![Stats](https://github-readme-stats.vercel.app/api?username=${globalUsername.trim()}&show_icons=${data.showIcons}&theme=${data.theme}&hide_border=${data.hideBorder})\n\n`;
        markdown += `![Streak](https://github-readme-streak-stats.herokuapp.com/?user=${globalUsername.trim()}&theme=${data.theme}&hide_border=${data.hideBorder})\n\n`;
        break;

      case 'socials':
        markdown += `### 📫 Connect with me\n\n`;
        markdown += `<p align="left">\n`;
        if (data.github) markdown += `  <a href="${data.github}" target="_blank"><img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white" alt="Github" /></a>\n`;
        if (data.linkedin) markdown += `  <a href="${data.linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
        if (data.twitter) markdown += `  <a href="${data.twitter}" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
        if (data.website) markdown += `  <a href="${data.website}" target="_blank"><img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Website" /></a>\n`;
        if (data.instagram) markdown += `  <a href="${data.instagram}" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>\n`;
        if (data.youtube) markdown += `  <a href="${data.youtube}" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" /></a>\n`;
        if (data.dribbble) markdown += `  <a href="${data.dribbble}" target="_blank"><img src="https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white" alt="Dribbble" /></a>\n`;
        if (data.codepen) markdown += `  <a href="${data.codepen}" target="_blank"><img src="https://img.shields.io/badge/CodePen-000000?style=for-the-badge&logo=codepen&logoColor=white" alt="CodePen" /></a>\n`;
        markdown += `</p>\n\n`;
        break;

      case 'visitors': {
        if (!globalUsername) break;
        const username = encodeURIComponent(globalUsername.trim());
        const label = encodeURIComponent(data.label || 'Profile Views');
        const color = encodeURIComponent(data.color || 'blue');
        markdown += `![Visitors](https://visitor-badge.laobi.icu/badge?page_id=${username}.${username}&left_text=${label}&color=${color}&style=${data.style})\n\n`;
        break;
      }
    }
  });

  return markdown;
};