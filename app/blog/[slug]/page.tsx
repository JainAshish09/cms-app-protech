import { Blog, BlogEntry } from "@/app/models/blogs";
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
    <div >
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
      {blogPost ? (
        <>
          <div className="w-[80%] justify-center m-auto p-11">
            <h1 className="font-[700] text-[50px] text-start mb-9">{blogPost.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} className="text-[30px]" />
            {blogPost.image && blogPost.image.length > 0 && (
              <div className="">
                {blogPost.image.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={"../" + image}
                    alt={`${image}`}
                    className="my-4 xl:w-[30%] md:w-[50%] sm:w-[100%]"
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
