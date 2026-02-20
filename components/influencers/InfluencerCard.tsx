import Link from "next/link";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Influencer } from "@/lib/types";

const PLATFORM_STYLES: Record<string, string> = {
  youtube: "bg-rose/15 text-rose",
  instagram: "bg-violet/15 text-violet",
  tiktok: "bg-cyan/15 text-cyan"
};

export default function InfluencerCard({ influencer }: { influencer: Influencer }) {
  const formatter = new Intl.NumberFormat("en-US");

  return (
    <Link href={`/influencers/${influencer.id}`}>
      <Card className="p-5 transition hover:-translate-y-1 hover:bg-surface-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-base font-semibold text-text">{influencer.name}</p>
            <p className="text-xs text-text-dim">{influencer.handle}</p>
          </div>
          <Badge className={PLATFORM_STYLES[influencer.platform]}>{influencer.platform}</Badge>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase text-text-dim">Subscribers</p>
          <p className="mt-1 font-display text-lg font-semibold text-text">
            {formatter.format(influencer.subscribers)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
