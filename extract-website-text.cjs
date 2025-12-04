const https = require('https');
const { JSDOM } = require('jsdom');
const fs = require('fs');

async function extractAllText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // Parse HTML with jsdom
        const dom = new JSDOM(data);
        const document = dom.window.document;

        // Extract text from different elements
        const textContent = {
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          p: [],
          span: [],
          a: [],
          button: [],
          li: [],
          div: [],
          label: [],
          td: [],
          th: [],
          strong: [],
          em: [],
          small: []
        };

        // Extract all headings
        document.querySelectorAll('h1').forEach(el => {
          if (el.textContent.trim()) textContent.h1.push(el.textContent.trim());
        });

        document.querySelectorAll('h2').forEach(el => {
          if (el.textContent.trim()) textContent.h2.push(el.textContent.trim());
        });

        document.querySelectorAll('h3').forEach(el => {
          if (el.textContent.trim()) textContent.h3.push(el.textContent.trim());
        });

        document.querySelectorAll('h4').forEach(el => {
          if (el.textContent.trim()) textContent.h4.push(el.textContent.trim());
        });

        document.querySelectorAll('h5').forEach(el => {
          if (el.textContent.trim()) textContent.h5.push(el.textContent.trim());
        });

        document.querySelectorAll('h6').forEach(el => {
          if (el.textContent.trim()) textContent.h6.push(el.textContent.trim());
        });

        // Extract paragraphs
        document.querySelectorAll('p').forEach(el => {
          if (el.textContent.trim()) textContent.p.push(el.textContent.trim());
        });

        // Extract spans
        document.querySelectorAll('span').forEach(el => {
          if (el.textContent.trim() && !el.querySelector('span')) {
            textContent.span.push(el.textContent.trim());
          }
        });

        // Extract links
        document.querySelectorAll('a').forEach(el => {
          if (el.textContent.trim()) textContent.a.push(el.textContent.trim());
        });

        // Extract buttons
        document.querySelectorAll('button').forEach(el => {
          if (el.textContent.trim()) textContent.button.push(el.textContent.trim());
        });

        // Extract list items
        document.querySelectorAll('li').forEach(el => {
          if (el.textContent.trim()) textContent.li.push(el.textContent.trim());
        });

        // Extract divs with direct text content
        document.querySelectorAll('div').forEach(el => {
          const directText = Array.from(el.childNodes)
            .filter(node => node.nodeType === 3)
            .map(node => node.textContent.trim())
            .filter(text => text.length > 0)
            .join(' ');
          if (directText) textContent.div.push(directText);
        });

        // Extract labels
        document.querySelectorAll('label').forEach(el => {
          if (el.textContent.trim()) textContent.label.push(el.textContent.trim());
        });

        // Extract table cells
        document.querySelectorAll('td').forEach(el => {
          if (el.textContent.trim()) textContent.td.push(el.textContent.trim());
        });

        document.querySelectorAll('th').forEach(el => {
          if (el.textContent.trim()) textContent.th.push(el.textContent.trim());
        });

        // Extract other text elements
        document.querySelectorAll('strong').forEach(el => {
          if (el.textContent.trim()) textContent.strong.push(el.textContent.trim());
        });

        document.querySelectorAll('em').forEach(el => {
          if (el.textContent.trim()) textContent.em.push(el.textContent.trim());
        });

        document.querySelectorAll('small').forEach(el => {
          if (el.textContent.trim()) textContent.small.push(el.textContent.trim());
        });

        // Also get all text content as one block
        const allText = document.body.textContent
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');

        resolve({ textContent, allText });
      });
    }).on('error', reject);
  });
}

// Run the extraction
extractAllText('https://www.vibe.co/')
  .then(result => {
    // Save structured content
    let output = '=== WEBSITE TEXT EXTRACTION ===\n\n';

    // Add structured content
    Object.entries(result.textContent).forEach(([tag, texts]) => {
      if (texts.length > 0) {
        output += `\n=== ${tag.toUpperCase()} TAGS ===\n`;
        texts.forEach((text, index) => {
          output += `${index + 1}. ${text}\n`;
        });
      }
    });

    // Add raw text dump
    output += '\n\n=== RAW TEXT DUMP ===\n';
    output += result.allText;

    // Save to file
    fs.writeFileSync('vibe-website-text.txt', output);
    console.log('Text extracted and saved to vibe-website-text.txt');

    // Also output to console
    console.log('\n=== PREVIEW OF EXTRACTED TEXT ===\n');
    console.log(output.substring(0, 2000) + '...\n');
    console.log(`Total extraction size: ${output.length} characters`);
  })
  .catch(error => {
    console.error('Error:', error);
  });