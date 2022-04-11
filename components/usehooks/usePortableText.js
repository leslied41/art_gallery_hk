import { PortableText } from "@portabletext/react";
import sanityClient from "../../client.js";
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SampleImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);

  return (
    <img
      src={urlFor().image(value).fit("max").auto("format").url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        //aspectRatio: width / height,
        objectFit: "contain",
        // width: "100%",
        width: "100%",
        height: "auto",
      }}
    />
  );
};

const serializers = {
  marks: {
    link: ({ children, value }) =>
      value.blank ? (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={value.href}>{children}</a>
      ),
  },
  types: {
    image: SampleImageComponent,
  },
  block: {
    // Ex. 2: rendering custom styles
    Text_block_large: ({ children }) => <p className="h2">{children}</p>,
    Text_block_small: ({ children }) => <p className="h3">{children}</p>,
    Text_block_reference: ({ children }) => <p className="h7">{children}</p>,
  },
};

export const usePortableText = (data) => {
  return (
    <PortableText
      value={data}
      components={serializers}
      projectId="z3dq9mvc"
      dataset="production"
    />
  );
};
