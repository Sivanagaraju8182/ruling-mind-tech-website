"use client";

/**
 * LocationMap.tsx  -  Google Map of our office (Contact page).
 *
 * PRIVACY (DPDP Act): loading a Google map sends the visitor's IP address to Google
 * and may set Google cookies. So the map is NOT loaded automatically. The visitor
 * sees a placeholder and loads the map by clicking "Load map" (a clear, active choice).
 * The address comes from src/lib/site.ts -> mapQuery.
 */
import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LocationMap({ query, address }: { query: string; address: string }) {
  const [loaded, setLoaded] = useState(false);

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="crest border border-gold-500/40 bg-ink-900">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/7]">
        {loaded ? (
          <iframe
            title={`Map showing the location of Ruling Mind Tech: ${address}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="lattice absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center border border-gold-500/60 text-gold-300">
              <MapPin className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="max-w-md text-jade-100/80">{address}</p>
            <p className="max-w-md text-sm text-jade-100/55">The map is provided by Google. When you load it, Google receives your IP address and may set cookies.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => setLoaded(true)}>Load map</Button>
              <Button href={openUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                Open in Google Maps
              </Button>
            </div>
          </div>
        )}
      </div>

      {loaded && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold-500/30 px-5 py-3 text-sm">
          <span className="text-jade-100/75">{address}</span>
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-gold-300 hover:text-gold-200">
            Get directions <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
