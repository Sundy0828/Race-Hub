export const seoMeta = (title: string, description: string) => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      cardType: "summary_large_image",
    },
  };
};
