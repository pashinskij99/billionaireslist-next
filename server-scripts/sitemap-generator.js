const fs = require("fs");
const axios = require("axios")

async function genSiteMap() {

  const staticPath = fs
    .readdirSync("pages")
    .filter(staticPage => !["api", "_app.js", "_document.js", "404.jsx", "sitemap.xml.js", '[id]'].includes(staticPage))
    .map(staticPagePath =>
      staticPagePath !== 'index.js'
        ? staticPagePath.split('.')[0]
        : '')

  const baseUrl = await axios.create({
    baseURL: `${process.env.API_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { data: { quotes } } = await baseUrl.get('/quotes', { params: { perPage: '500' } })
  const { data: { celebrities } } = await baseUrl.get('/celebrities', { params: { perPage: '500' } })
  const { data: { posts } } = await baseUrl.get('/posts', { params: { perPage: '500' } })

  const filesXML = [
    { fileName: 'quotes-sitemap.xml', data: quotes },
    { fileName: 'celebrities-sitemap.xml', data: celebrities },
    { fileName: 'posts-sitemap.xml', data: posts },
    { fileName: 'pages-sitemap.xml', data: staticPath },
  ]

  createIndexSitemap(filesXML)
  createSubSitemap(filesXML)

}

function createSubSitemap(filesXML) {
  const sitemapStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapEnd = "</urlset>";

  filesXML.forEach(({ fileName, data }) => {
    let newData

    if (fileName === 'celebrities-sitemap.xml') {
      newData = data.map(element => setUrl(element.name.toLowerCase().split(' ').join('-')));
    } else if (fileName === 'quotes-sitemap.xml') {
      newData = data.map(element => setUrl(getQuotePath(element.name, element.id)))
    } else if (fileName === 'pages-sitemap.xml') {
      newData = data.map(element => setUrl(element))
    } else {
      newData = data.map(element => setUrl(element.id));
    }

    createAndWriteFile(`public/${fileName}`, [sitemapStart, newData.join(' '), sitemapEnd].join(''))
  })
}

function createIndexSitemap(filesXML) {
  const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `
  const sitemapEnd = '</sitemapindex>'

  const newDate = filesXML.map(({ id, fileName }) => `
    <sitemap>
      <loc>${process.env.BASE_URL}/${fileName}</loc>
    </sitemap>
  `)

  createAndWriteFile('public/sitemap.xml', [sitemapStart, newDate.join(' '), sitemapEnd].join(' '))
}

function getQuotePath(name, id) {
  return `quote/${name.toLowerCase().split(' ').join('-')}-quote-${id}`
}

function setUrl(name) {
  return `
    <url>
      <loc>${process.env.BASE_URL}/${name}</loc>
      <lastmod>2023-04-18T12:27:40.152Z</lastmod>
      <priority>1</priority>
    </url>
  `
}

function createAndWriteFile(pathWithFileName, content) {
  fs.writeFileSync(pathWithFileName, content)
}

genSiteMap();
