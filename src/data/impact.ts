export type Source = { label: string; url: string };

export type ImpactEntry = {
  id: string;
  title: string;
  org: string;
  year: string;
  /*
    Named here rather than picked by array position in the component. A
    positional list silently reassigns every icon the moment an entry is added
    or reordered, and falls through to a wrong-but-plausible default instead of
    failing.
  */
  icon: 'award' | 'expo' | 'app' | 'retail';
  /** One-line statement of the milestone — must be supported by the sources below. */
  claim: string;
  /** Context. Only facts traceable to the attached sources. */
  detail: string[];
  /**
   * Pradeep's own account of his contribution. Deliberately kept in a separate,
   * separately-labelled field: the public record credits organisations, and this
   * site should not blur the two.
   *
   * This field is rendered in the *collapsed* card, beside the claim. It used to
   * live inside the accordion panel, which meant the only prose a scanner ever
   * saw was the milestone — four organisational achievements in a row, with the
   * person whose portfolio this is reachable only by clicking. The separation
   * was the right idea implemented backwards: the company got the headline and
   * the author got the footnote. Both are visible now, and which is which is
   * still labelled.
   *
   * State the work, never the rank. All four of these once opened with a
   * seniority verb — "I led", "I was selected as lead", "I led R&D", "I was
   * lead engineer" — rendered inches from a column headed "Public record" with
   * live sources under it. The layout invites that comparison and the
   * comparison was losing: corroborated fact on the left, self-assigned title
   * on the right, four times running. A rank claim is the one kind of claim
   * this field can never source. A description of the actual decision is
   * checkable in kind: only the person who made it could have written it.
   *
   * State the contribution and stop. These once carried a trailing disclaimer
   * each — the award was the company's, no public source names me, I am not an
   * author on that paper. Individually each was honest; four in a row read as
   * apologising for being on the page. The separation is already carried by the
   * labels and by the sources sitting beside them, which is structure doing the
   * work rather than prose repeating it.
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
    icon: 'award',
    title: 'Winner — “Go Healthy with Taiwan” 2025',
    org: 'TAITRA · Taiwan Excellence · IdeasLab',
    year: '2025',
    claim:
      'One of three global winners of TAITRA’s 2025 “Go Healthy with Taiwan” competition, chosen from 638 proposals across 55 countries, for a baseball motion-analysis system built on the XView motion-analysis technology.',
    detail: [
      '“Go Healthy with Taiwan” is a global call for proposals run under Taiwan Excellence by TAITRA, spanning cycling, fitness and sports technology, and smart healthcare. Proposals are judged in equal measure on health benefit, connection to Taiwanese products, innovation and feasibility.',
      'The 2025 Grand Finals were held in Taipei on 10 December 2025 with six finalist teams. Three winners were selected, each receiving USD 30,000. The winning entry here applied the XView AI motion-analysis technology to baseball — pairing it with Taiwanese smart apparel and wearable sensors.',
      'Separately reported: IdeasLab works with the Taiwan Institute of Sports Science on AI-based motion analysis.',
    ],
    role:
      'I authored the proposal end to end. The work behind it was establishing two things: what baseball biomechanics actually demands — injury-prevention physics, not only performance gain — and how far a golf-tuned lifting stack carries into a different high-speed motion class. Market scope and standards came out of working with the business side; the technical argument, and every claim in it, is mine.',
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
    icon: 'expo',
    title: 'Taiwan Expo Europe 2026 — the work on an international floor',
    org: 'TAITRA · EXPO XXI Warsaw, Poland',
    year: '2026',
    claim:
      'The motion-analysis work was shown under the Taiwan Excellence banner at Taiwan Expo in Europe, 22–24 June 2026 at EXPO XXI Warsaw — TAITRA’s flagship European programme, with XView named in the official exhibitor listing.',
    detail: [
      'Taiwan Expo in Europe ran 22–24 June 2026 at EXPO XXI Warsaw, organised by TAITRA. Its themes cover AI and AIoT, smart manufacturing, digital infrastructure, smart cities and mobility, and sustainable development, with the Taiwan Excellence Pavilion presenting award-winning products from Taiwanese companies.',
      '“Go Healthy with Taiwan” features as a named highlight of the programme, presenting Taiwan’s capabilities in smart healthcare, sports technology and AI for health and well-being.',
      'The official exhibitor listing names Ideas Lab, Formosa, with XView as the listed product — the company also exhibited at Taipei Cycle Show, 25–28 March 2026.',
    ],
    role:
      'I carried the research onto the main stage — our technical case, put to an international audience that had not come for the mathematics. Making it land there is a different discipline from building it, and it is why I was the one sent.',
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
    icon: 'app',
    title: 'XView AI — markerless swing analysis, shipped',
    org: 'IdeasLab · iOS',
    year: '2025',
    claim:
      'The pose and lifting research reached users as XView AI — a markerless golf swing analysis app whose entire analysis pipeline runs on the phone, with no cloud connection and no footage leaving the device.',
    detail: [
      'The company’s announcement describes XView AI as the first markerless app to offer complete golf swing analysis in real time, tracking body, shaft and club, and running offline with no cloud dependency. XView AI Pro launched in spring 2025; Free and Plus versions followed in August 2025.',
      'K.J. Choi, nine-time PGA Tour champion, joined as an advisor and the company’s first outside investor. World Long Drive champion Martin Borgmeier is a brand ambassador, and the product carries testimonials from teaching professionals.',
      'IdeasLab Inc was founded in New York in 2017; the Taiwan entity, IdeasLab Formosa, was registered in 2023 and is based in Neihu, Taipei.',
    ],
    role:
      'The 2D-to-3D pose lifting the analysis reads its numbers from, and the CoreML deployment that keeps the whole pipeline on the handset, are my work. Case file 01 is the full account, including what it cost.',
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
    icon: 'retail',
    title: 'Retail vision AI at national scale',
    org: 'President Information Corporation',
    year: '2023 — 2025',
    claim:
      'The planogram-compliance programme I was lead engineer on at President Information Corp is deployed across more than 7,000 7-ELEVEN stores in Taiwan, per the company’s own peer-reviewed account.',
    detail: [
      'A paper co-authored from President Information Corporation, published in Scientific Reports in December 2025, describes a real-time planogram compliance system using computer vision and virtual shelves, deployed across over 7,000 7-ELEVEN stores in Taiwan.',
      'It reports 99.23% precision and 98.93% recall on shelf detection, 94.61% precision and 93.02% recall on product detection, and few-shot performance of 98.39% Top-1 accuracy on previously unseen products — the generalisation to unseen SKUs that makes the approach operable at that size without a retraining cycle per product.',
    ],
    role:
      'The detection and embedding architecture behind that programme is my work — dense detection for where a product is, a fine-tuned metric space for which product it is, so a new SKU costs vectors instead of a training run. Case file 04.',
    sources: [
      {
        label:
          'Scientific Reports (2025) — real-time planogram compliance, 7,000+ stores',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41402356/',
      },
    ],
  },
];
