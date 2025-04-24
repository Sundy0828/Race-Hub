import { seoMeta } from "@/app/seo";
import RacePageClient from "@/client/races/race/RacePageClient";
import { GetRaceWithResultsDocument } from "@/graphql/generated/graphqlTypes";
import { getClient } from "@/providers/apollo/apolloClient";
import type { Metadata } from "next";

type Props = {
  params: {
    raceId: string;
    yearId: string;
    resultId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { raceId, yearId, resultId } = params;

  const client = getClient();
  const { data } = await client.query({
    query: GetRaceWithResultsDocument,
    variables: { raceId: Number(raceId) },
  });

  const title = data?.race?.name ?? "Race Results";

  return seoMeta(title, `Results for ${title}`);
}

export default function SpecificResultPage({ params }: Props) {
  return (
    <RacePageClient
      raceId={params.raceId}
      yearId={params.yearId}
      resultId={params.resultId}
    />
  );
}
