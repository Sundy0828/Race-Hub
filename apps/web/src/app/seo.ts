export const seoMeta = (title: string, description: string) => {
  const fullTitle = `${title} | Race Hub`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: "/icons/racehub-icon.png",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/icons/racehub-icon.png"],
    },
    icons: {
      icon: "/icons/racehub-icon.png",
    },
  };
};
