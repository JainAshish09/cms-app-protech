import { Blog, Image } from "@/app/models/blogs";
import { getBlogPostBySlug } from "../utils/markdownUtil";
import MainContainer from "@/app/features/main-container";

export default async function Page({ params }: { params: { slug: string } }) {
  const blogPost = await getBlogPostBySlug(params.slug);

  const title = "PRO-TECH TITAN® Blogs";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blog' },
    { label: blogPost?.title || params.slug, href: `/blog/${params.slug}` }
  ];

  return (
    <div>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
      {blogPost ? (
        <>
          <div className="container mx-auto px-4 py-11">
            <h1 className="text-4xl font-bold mb-9">{blogPost.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: blogPost.htmlString }} className="text-xl" />
            {blogPost.image && blogPost.image.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blogPost.image.map((image: Image, index: number) => (
                  <img
                    key={index}
                    src={`../${image.image}`}
                    alt={image.image}
                    className="flex-shrink-0 sm:w-[100%] md:w-[45%] lg:w-[30%] aspect-square "
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
}
