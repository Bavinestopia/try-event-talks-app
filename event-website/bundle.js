const fs = require('fs');
const path = require('path');

const talks = JSON.parse(fs.readFileSync(path.join(__dirname, 'talks.json'), 'utf8'));
const styles = fs.readFileSync(path.join(__dirname, 'public', 'styles.css'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, 'public', 'script.js'), 'utf8');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Talks Daily</title>
  <style>${styles}</style>
</head>
<body>
  <header>
    <h1>Tech Talks Daily</h1>
    <p>A 1-day event filled with technical talks.</p>
  </header>
  <main>
    <div class="search-container">
      <input type="text" id="searchInput" placeholder="Search by category...">
    </div>
    <div id="schedule-container" class="schedule-container"></div>
  </main>
  <script>
    const talks = ${JSON.stringify(talks)};
    ${script.replace("fetch('/api/talks').then(response => response.json()).then(data => { talks = data; renderSchedule(talks); });", 'renderSchedule(talks);')}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);

console.log('Bundled serverless website to dist/index.html');
