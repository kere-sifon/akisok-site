const captions: Record<string, string> = {
  "hero-ibom-coast": "dawn over the Qua Iboe estuary, looking toward Ibeno",
  "seaport-ibaka": "the Ibom Deep Seaport site from the water at Ibaka",
  "anaang-language":
    "a family compound veranda in Abak — conversation, not a posed portrait",
  "ekpe-society":
    "Ekpe lodge architecture and cloth, not a tourist-facing masquerade still",
  "calabar-uyo-highway":
    "the Calabar–Uyo corridor at ordinary traffic, not a ribbon-cutting",
  "pillar-news":
    "a newsroom or press still from the linked source, not a staged scene",
  "pillar-technology":
    "the Ibom tech community at work — a real photograph belongs here",
  "akwa-ibom":
    "mangrove giving way to palm — the coast-to-inland gradient of the state",
  "the-people":
    "a compound yard in ordinary use, not a festival still",
};

export function imageCaption(key: string) {
  return captions[key] ?? "a real photograph belonging to this piece";
}
