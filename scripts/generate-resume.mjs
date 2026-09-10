import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;

  // Name (centered)
  const nameText = 'ABHISHEK S';
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 18);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y: y,
    size: 18,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 25;

  // Contact Info (left aligned)
  const contactLines = [
    'Phone: +91 9962853431',
    'Email: crispyabhi2006@gmail.com',
    'LinkedIn: https://www.linkedin.com/in/abhishek-s-642484381',
    'GitHub: https://github.com/crispyabhi2006-max',
  ];

  for (const line of contactLines) {
    page.drawText(line, {
      x: margin,
      y: y,
      size: 10,
      font: fontRegular,
      color: rgb(0.15, 0.15, 0.15),
    });
    y -= 14;
  }
  y -= 8;

  function drawSectionHeader(title) {
    page.drawText(title, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: rgb(0.05, 0.05, 0.05),
    });
    y -= 15;
  }

  function drawWrappedText(text, fontSize = 9.5, lineHeight = 13.5, maxWidth = width - margin * 2) {
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        page.drawText(currentLine, {
          x: margin,
          y: y,
          size: fontSize,
          font: fontRegular,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= lineHeight;
        currentLine = word;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y: y,
        size: fontSize,
        font: fontRegular,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= lineHeight;
    }
  }

  // CAREER OBJECTIVE
  drawSectionHeader('CAREER OBJECTIVE');
  drawWrappedText(
    'Motivated and enthusiastic Computer Science and Engineering student with a strong foundation in Java, Python, SQL, HTML, CSS, and JavaScript. Passionate about software development, problem-solving, and emerging technologies. Seeking opportunities to apply technical skills, contribute to innovative projects, and gain practical industry experience while continuously enhancing professional growth.'
  );
  y -= 8;

  // EDUCATION
  drawSectionHeader('EDUCATION');
  page.drawText('B.E. Computer Science and Engineering', { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
  y -= 13.5;
  page.drawText('Easwari Engineering College', { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
  y -= 13.5;
  page.drawText('Department: CSE-A', { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
  y -= 13.5;
  page.drawText('Current Year: Second Year', { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
  y -= 21.5;

  // TECHNICAL SKILLS
  drawSectionHeader('TECHNICAL SKILLS');
  drawWrappedText(
    'Java, Python, SQL, HTML, CSS, JavaScript, Git, GitHub, Problem Solving, Data Structures & Algorithms, Database Management, Frontend Development'
  );
  y -= 8;

  // PROJECTS
  drawSectionHeader('PROJECTS');
  const projects = [
    'AI Study Assistant Dashboard',
    'AI Sentiment Analysis Web Application',
    'Household Water Usage Analysis & Conservation Plan',
    'Frontend Web Development Projects',
    'Java and Python Mini Projects',
  ];
  for (const proj of projects) {
    page.drawText(proj, { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
    y -= 13.5;
  }
  y -= 8;

  // INTERNSHIPS
  drawSectionHeader('INTERNSHIPS');
  const internships = [
    'CodeAlpha Internship',
    '1M1B Green Internship',
    'QSpiders / QSkill Internship',
    'Tamizhan Skills Internship',
  ];
  for (const intern of internships) {
    page.drawText(intern, { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });
    y -= 13.5;
  }
  y -= 8;

  // ACHIEVEMENTS
  drawSectionHeader('ACHIEVEMENTS');
  drawWrappedText(
    'Active LeetCode problem solver, participated in coding challenges, developed multiple software projects, continuously improving programming and problem-solving skills.'
  );
  y -= 8;

  // LANGUAGES
  drawSectionHeader('LANGUAGES');
  page.drawText('English, Tamil, Telugu, German', { x: margin, y: y, size: 9.5, font: fontRegular, color: rgb(0.15, 0.15, 0.15) });

  const pdfBytes = await pdfDoc.save();

  const targetDirs = [
    path.resolve(process.cwd(), 'frontend', 'assets'),
    path.resolve(process.cwd(), 'public', 'frontend', 'assets'),
    path.resolve(process.cwd(), 'public'),
    path.resolve(process.cwd(), 'dist', 'frontend', 'assets'),
  ];

  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'Abhishek_S_Resume.pdf'), pdfBytes);
  }

  console.log('Successfully generated and deployed Abhishek_S_Resume.pdf to all asset targets!');
}

createResume();
