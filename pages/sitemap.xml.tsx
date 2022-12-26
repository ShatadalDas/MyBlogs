import { GetServerSideProps } from "next";
import { BlogsTitlesType } from "./api/blogTitles";
import createUrl from "../utils/functions/createUrl";

function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  //   const BASE_URL = "http://localhost:3000";

  const fetchedRes = await fetch(`${process.env.DOMAIN}/api/blogTitles`);
  const data = (await fetchedRes.json()) as BlogsTitlesType[];

    const sitemap = 
`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${data
          .map(
            (item: BlogsTitlesType) =>
              `<url>
                    <loc>${process.env.DOMAIN}/${createUrl(item.title)}/?id=${
                item._id
              }</loc>
                <lastmod>${item.time.split(" ")[0]}</lastmod>
        </url>`)
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

export default Sitemap;
