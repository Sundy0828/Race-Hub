import { seoMeta } from "@/app/seo";
import RacePageClient from "@/client/races/race/RacePageClient";
import { GetRaceWithResultsDocument } from "@/graphql/generated/graphqlTypes";
import { getClient } from "@/providers/apollo/apolloClient";
import type { Metadata } from "next";

type Props = {
  params: {
    raceid: string;
    yearid: string;
    resultid: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { raceid, yearid, resultid } = params;

  const client = getClient();
  const { data } = await client.query({
    query: GetRaceWithResultsDocument,
    variables: { raceId: Number(raceid) },
  });

  const title = data?.race?.name ?? "Race Results";

  return seoMeta(title, `Results for ${title}`);
}

export default function SpecificResultPage({ params }: Props) {
  return (
    <div>
      <RacePageClient
        raceid={params.raceid}
        yearid={params.yearid}
        resultid={params.resultid}
      />
    </div>
  );
}
