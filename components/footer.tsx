import React from "react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface FooterData {
  address?: string;
  directionsUrl?: string;
  socialLinks?: { name?: string; url?: string; icon?: string }[];
  sections?: { title?: string; links?: { label?: string; url?: string }[] }[];
  gallery?: { image?: string; alt?: string }[];
}

async function getFooterData(): Promise<FooterData> {
  try {
    const filePath = path.join(process.cwd(), "content", "footer.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data as FooterData;
  } catch (error) {
    console.error("Error loading footer data:", error);
    return {};
  }
}

function safeImageSrc(src?: string) {
  if (!src) return ""; // No image
  if (src.startsWith("http://") || src.startsWith("https://")) return src; // Full URL OK
  if (!src.startsWith("/")) return "/" + src; // Add leading slash
  return src;
}

export default async function Footer() {
  const footer = await getFooterData();

  return (
    <footer className="bg-white py-8 px-4 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-[#404040]">

        {/* Logo & Address */}
        <div className="space-y-4">
          <Image
            src="/icons/assa-abloy-logo-header.svg"
            alt="ASSA ABLOY"
            width={187}
            height={26}
            className="mt-2"
          />

          {footer?.address && (
            <address className="not-italic">{footer.address}</address>
          )}

          {footer?.directionsUrl && (
            <div className="pt-2">
              <Link
                href={footer.directionsUrl}
                className="inline-flex items-center gap-1 border-b border-black text-[16px] font-medium"
              >
                Get Directions <span className="text-lg font-bold ml-1">&#8250;</span>
              </Link>
            </div>
          )}

          {Array.isArray(footer?.socialLinks) && footer.socialLinks.length > 0 && (
            <div className="flex space-x-2">
              {footer.socialLinks.map((social, idx) =>
                social?.url && social?.icon ? (
                  <Link key={idx} href={social.url}>
                    <div className="w-5 h-5 inline-block">
                      <Image
                        src={safeImageSrc(social?.icon)}
                        alt={social?.name || "Social"}
                        width={20}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </Link>
                ) : null
              )}

            </div>
          )}
        </div>

        {/* Sections */}
        {Array.isArray(footer?.sections) &&
          footer.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              {section?.title && (
                <h4 className="font-bold text-black text-[28px]">{section.title}</h4>
              )}
              <div className="space-y-1 text-[#404040] text-[18px]">
                {Array.isArray(section?.links) &&
                  section.links.map((link, linkIdx) =>
                    link?.url ? (
                      <div key={linkIdx}>
                        <Link href={link.url}>{link.label || "Link"}</Link>
                      </div>
                    ) : link?.label ? (
                      <div key={linkIdx}>{link.label}</div>
                    ) : null
                  )}
              </div>
            </div>
          ))}

        {/* Gallery */}
        <div className="space-y-2">
          <h4 className="font-bold text-black text-[28px]">Gallery</h4>
          <div className="grid grid-cols-3 gap-2">
            {Array.isArray(footer?.gallery) &&
              footer.gallery.map((img, idx) =>
                img?.image ? (
                  <Image
                    key={idx}
                    src={safeImageSrc(img.image)}
                    alt={img?.alt || "Gallery image"}
                    width={64}
                    height={64}
                    className="object-cover rounded-lg"

                  />
                ) : null
              )}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-600">&copy; ASSA ABLOY</div>
    </footer>
  );
}
