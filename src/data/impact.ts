export type Source = { label: string; url: string };

export type ImpactEntry = {
  id: string;
  title: string;
  org: string;
  year: string;
  /** One-line statement of the milestone — must be supported by the sources below. */
  claim: string;
  /** Context. Only facts traceable to the attached sources. */
  detail: string[];
  /**
   * Pradeep's own account of his contribution. Deliberately kept in a separate,
   * separately-labelled field: the public record credits organisations, and this
   * site should not blur the two.
   */
  role?: string;
  sources: Source[];
};

/**
 * Every entry carries at least one independent public source, and every figure
 * quoted here was read from one of them. Claims that could not be corroborated
 * externally are not in this list — they live in the CV-derived sections, where
 * they read as a personal account rather than as verified record.
 */
export const impact: ImpactEntry[] = [
  {
    id: 'go-healthy-2025',
    title: 'Winner — “Go Healthy with Taiwan” 2025',
    org: 'TAITRA · Taiwan Excellence · IdeasLab',
    year: '2025',
    claim:
      'IdeasLab was named one of three global winners of TAITRA’s 2025 “Go Healthy with Taiwan” competition — chosen from 638 proposals across 55 countries — for a baseball motion-analysis system.',
    detail: [
      '“Go Healthy with Taiwan” is a global call for proposals run under Taiwan Excellence by TAITRA, spanning cycling, fitness and sports technology, and smart healthcare. Proposals are judged in equal measure on health benefit, connection to Taiwanese products, innovation and feasibility.',
      'The 2025 Grand Finals were held in Taipei on 10 December 2025 with six finalist teams. Three winners were selected, each receiving USD 30,000. The winning entry here applied the XView AI motion-analysis technology to baseball — pairing it with Taiwanese smart apparel and wearable sensors.',
      'Separately reported: IdeasLab works with the Taiwan Institute of Sports Science on AI-based motion analysis.',
    ],
    role:
      'I led the technical proposal and the narrative behind it, and built the motion-analysis models the system rests on. The award itself was won by the company — the public coverage credits the organisation rather than individuals.',
    sources: [
      { label: 'Go Healthy with Taiwan — official programme', url: 'https://gohealthy.taiwanexcellence.org/' },
      {
        label: 'Grand Finals coverage — 638 proposals, 55 countries',
        url: 'https://newshub.medianet.com.au/2025/12/top-innovators-compete-in-taipei-as-go-healthy-with-taiwan-finals-spotlight-health-tech-advances/133652/',
      },
      {
        label: 'Winners and the baseball system',
        url: 'https://thebetterindia.com/innovation/go-healthy-with-taiwan-2026-health-innovation-challenge-12141541',
      },
    ],
  },
  {
    id: 'taiwan-expo-europe-2026',
    title: 'Taiwan Expo Europe 2026 — listed exhibitor',
    org: 'TAITRA · EXPO XXI Warsaw, Poland',
    year: '2026',
    claim:
      'IdeasLab Formosa is a listed exhibitor at Taiwan Expo in Europe, 22–24 June 2026 in Warsaw, showing XView under the Taiwan Excellence banner.',
    detail: [
      'Taiwan Expo in Europe runs 22–24 June 2026 at EXPO XXI Warsaw, organised by TAITRA. Its themes cover AI and AIoT, smart manufacturing, digital infrastructure, smart cities and mobility, and sustainable development, with the Taiwan Excellence Pavilion presenting award-winning products from Taiwanese companies.',
      '“Go Healthy with Taiwan” features as a named highlight of the programme, presenting Taiwan’s capabilities in smart healthcare, sports technology and AI for health and well-being.',
      'The official exhibitor listing names Ideas Lab, Formosa, with XView as the listed product — also exhibiting at Taipei Cycle Show, 25–28 March 2026.',
    ],
    role:
      'Selected as lead engineering representative for the AI capabilities being presented.',
    sources: [
      {
        label: 'Official exhibitor listing — Ideas Lab, Formosa · XView',
        url: 'https://www.taiwanexpoeurope.com.tw/en/exhibitor/5655073AE4F501E7DDB9B191CD6B48F0/info.html',
      },
      {
        label: 'Taiwan Excellence — Expo Europe programme and dates',
        url: 'https://www.taiwanexcellence.org/en/press/newsroom/1506',
      },
    ],
  },
  {
    id: 'xview-ai',
    title: 'XView AI — markerless swing analysis, shipped',
    org: 'IdeasLab · iOS',
    year: '2025',
    claim:
      'The pose and lifting research reached users as XView AI — announced as the first markerless app to offer complete golf swing analysis in real time, running on-device without a cloud connection.',
    detail: [
      'XView AI tracks body, shaft and club movement in real time and runs offline, with no cloud dependency. XView AI Pro launched in spring 2025; Free and Plus versions followed in August 2025.',
      'K.J. Choi, nine-time PGA Tour champion, joined as an advisor and the company’s first outside investor. World Long Drive champion Martin Borgmeier is a brand ambassador, and the product carries testimonials from teaching professionals.',
      'IdeasLab Inc was founded in New York in 2017; the Taiwan entity, IdeasLab Formosa, was registered in 2023 and is based in Neihu, Taipei.',
    ],
    role:
      'I led R&D on the 2D-to-3D pose lifting and on-device deployment that the analysis runs on — the work described in case file 01.',
    sources: [
      {
        label: 'Launch announcement — first markerless real-time swing analysis',
        url: 'https://www.prnewswire.com/news-releases/ideaslab-announces-xview-ai-the-first-markerless-app-to-offer-complete-golf-swing-analysis-and-insights-in-real-time-302455186.html',
      },
      {
        label: 'XView AI on the App Store',
        url: 'https://apps.apple.com/us/app/xview-ai-golf-swing-analysis/id1616121788',
      },
      {
        label: 'World Long Drive champion signs as ambassador',
        url: 'https://www.prnewswire.com/news-releases/ideaslab-signs-world-long-drive-champion-martin-borgmeier-as-brand-ambassador-for-xview-ai-302496847.html',
      },
    ],
  },
  {
    id: 'planogram-scale',
    title: 'Retail vision AI at national scale',
    org: 'President Information Corporation',
    year: '2023 — 2025',
    claim:
      'The planogram-compliance problem I worked on at President Information Corp is deployed across more than 7,000 7-ELEVEN stores in Taiwan, per the company’s own peer-reviewed account.',
    detail: [
      'A paper co-authored from President Information Corporation, published in Scientific Reports in December 2025, describes a real-time planogram compliance system using computer vision and virtual shelves, deployed across over 7,000 7-ELEVEN stores in Taiwan.',
      'It reports 99.23% precision and 98.93% recall on shelf detection, 94.61% precision and 93.02% recall on product detection, and few-shot performance of 98.39% Top-1 accuracy on previously unseen products — the training-free catalogue scaling that makes the approach operable at that size.',
    ],
    role:
      'I am not an author on that paper — it is included here as independent evidence of the scale and direction of the work at that company, alongside my own contribution described in case file 04.',
    sources: [
      {
        label:
          'Scientific Reports (2025) — real-time planogram compliance, 7,000+ stores',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41402356/',
      },
    ],
  },
];
