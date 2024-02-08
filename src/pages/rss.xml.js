import rss from "@astrojs/rss";
import { newtClient } from "@lib/newt";
// newtのブログ
const { items: articles } = await newtClient.getContents({
  appUid: "blog",
  modelUid: "article"
});
export function GET(context) {
  return rss({
    // 出力されるXMLの`<title>`フィールド
    title: "Buzz’s Blog",
    // 出力されるXMLの`<description>`フィールド
    description: "A humble Astronaut’s guide to the stars",
    // エンドポイントのコンテキストからプロジェクトの"site"を取得
    // https://docs.astro.build/ja/reference/api-reference/#contextsite
    site: context.site,
    // 出力されるXMLの<item>の
    // コンテンツコレクションやglobインポートを利用した例については「`items`の生成」セクションをご覧ください
    items: articles.map(post => ({
      title: post.title,
      description: post.description,
      content: post.body,
      pubDate: post._sys.raw.publishedAt,
      link: `/blog/${post.slug}`,
      customData: `${post.tags.map(
        tag => `<category>${tag.name}</category>`
      )}<image>${post.coverImage.src}</image>`
    })),
    // (任意) カスタムXMLを挿入
    customData: `<language>en-us</language>`
  });
}
