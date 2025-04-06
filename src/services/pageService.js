import axios from "axios";

export async function fetchPages() {
  console.log("PageService - Fetching pages from API");
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pages`
    );
    console.log("PageService - Pages received:", data);

    // Process pages to add URL based on title
    const processedPages = data.map((page) => ({
      ...page,
      url: page.title.toLowerCase().replace(/\s+/g, "-"),
    }));

    console.log("PageService - Processed pages with URLs:", processedPages);
    return processedPages;
  } catch (err) {
    console.error("PageService - Failed to fetch pages:", err);
    throw err;
  }
}
