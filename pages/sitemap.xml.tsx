import { GetServerSideProps } from "next";
import { BlogsTitlesType } from "./api/blogTitles";
import createUrl from "../utils/functions/createUrl";

function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const fetchedRes = await fetch(`${process.env.DOMAIN}/api/blogTitles`);
  const data = (await fetchedRes.json()) as BlogsTitlesType[];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>${process.env.DOMAIN}</loc>
     </url>
        ${data
          .map(
            (item: BlogsTitlesType) =>
              `<url>
                    <loc>${process.env.DOMAIN}/blog/${createUrl(item.title)}/?id=${
                item._id
              }</loc>
                <lastmod>${formatDate(item.time.split(" ")[0])}</lastmod>
        </url>`
          )
          .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

function formatDate(date: string) {
  let words = date.split("-");
  words = words.reverse();
  const formatedDate = words.join("-");
  return formatedDate;
}

export default Sitemap;
