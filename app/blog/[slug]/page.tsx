import { Blog, Image } from "@/app/models/blogs";
import { getBlogPostBySlug, getBlogPosts } from "../../services/blogMarkdown";
import MainContainer from "@/app/features/main-container";
import SearchBar from "@/app/components/SearchBar";

export default async function Page({ params }: { params: { slug: string } }) {
  const blogPost = await getBlogPostBySlug(params.slug);

  const title = "PRO-TECH TITAN® Blogs";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blog' },
    { label: blogPost?.title || params.slug, href: `/blog/${params.slug}` }
  ];

  const blogPost1 = await getBlogPosts();

  return (
    <div>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
      <SearchBar blogPosts={blogPost1.blogPosts} />
      {blogPost ? (
        <>
          <div className="container mx-auto px-4 py-11 w-[90%]">
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
        <div className=" flex justify-center align-middle w-[100%] h-[100%]">
          <h1 className="text-[50px] font-[800] p-10">Not Found</h1>
        </div>
      )}
    </div>
  );
}
