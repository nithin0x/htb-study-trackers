# CWES Study Kit

![CWES Study Kit](assets/share/cwes-v4.png)

A day-by-day study tracker, ready-made prep notes (Obsidian, Notion, and CherryTree), curated HTB Labs practice boxes, and exam resources for the **Hack The Box Certified Web Exploitation Specialist (CWES)** certification.

**Open the site: https://nithin0x.github.io/htb-study-trackers/**

## What's included

| Tool | What it gives you | Link |
|---|---|---|
| **Study tracker** | 20 modules, 279 sections, 5 timelines (30 to 150 days), daily notes, pace tracking, offline `.html` download | [Open tracker](https://nithin0x.github.io/htb-study-trackers/cwes/tracker/) |
| **Prep notes** | 54 pre-built notes: 20 module notes, 10 blank methodology phases, exam workspace, 6 templates | [Choose app](https://nithin0x.github.io/htb-study-trackers/cwes/notes/) |
| **Practice boxes** | 38 curated HTB Labs machines & web challenges ordered from warm-ups to hard chains | [Open boxes](https://nithin0x.github.io/htb-study-trackers/cwes/practice/) |
| **Resources & costs** | 98 links across 9 sections, 5 favorites, 29 pass tips, interactive HTB cost calculator | [Open resources](https://nithin0x.github.io/htb-study-trackers/cwes/resources/) |

## Study tracker

![CWES study tracker](assets/shots/cwes-tracker.webp)

- Splits the **Web Penetration Tester** HTB Academy job-role path (20 modules, 279 sections) into daily tasks in study order.
- Choose from five timelines: **30, 40, 50, 75, or 150 days** (~50, 38, 30, 20, or 10 hours/week). Your checkmarks and notes carry over whenever you switch timelines.
- Dashboard tracks overall completion, streak, current phase, estimated finish date, and ahead/behind pace.
- Includes **Already done some modules?** (with one-click shared-module shortcuts for CPTS, CJCA, and CDSA).
- **Export backup** and **Import** save and restore your progress (including solved practice boxes) as a JSON file.
- Single self-contained HTML file that also works offline via **Download offline .html**.

## Prep notes

![CWES prep notes in Obsidian, CherryTree, and Notion](assets/shots/cwes-notes.webp)

Available in three formats with the exact same structure:

- **Obsidian** (`.zip` vault, no community plugins needed — browse in [vaults/cwes-prep-vault/](vaults/cwes-prep-vault/))
- **Notion** (duplicate template into your workspace)
- **CherryTree** (single `.ctd` file, preinstalled on Kali)

Each format includes:
- 20 module notes split by Academy section
- 10 blank numbered methodology phases to build your personal web testing playbook
- An exam-day workspace (scope & rules, apps, findings, flags, and a 7-day log) aligned with the CWES report
- Links to tested CWES community cheat sheets, starter `ffuf` and `GraphQL` notes, and the SysReptor CWES report template

## Practice boxes

![CWES practice boxes](assets/shots/cwes-practice.webp)

- 38 HTB Labs machines and web challenges ordered from single-bug warm-ups to chained hard boxes.
- Tagged with the CWES Academy modules they practice, filterable by module or remaining status, with links to IppSec videos and 0xdf write-ups.
- Synced with the tracker's **Practice Boxes** tab and included in JSON backups.
- Optional extra practice — everything tested on the exam is covered in HTB Academy's Web Penetration Tester path.

## Resources & cost calculator

![CWES resources page](assets/shots/cwes-resources.webp)

- **Favorites**: 5 curated picks covering each stage of CWES prep.
- **All Resources**: 98 links grouped into 9 sections with live search (`/`), type filters (Official, Video, GitHub, Web, Community), and 29 exam tips grouped by reviewer.
- **What It Costs**: interactive comparison of Student, Silver Monthly, Silver Annual, Gold Annual, and optional HTB Labs VIP+ / HTB PRO plans across all five timelines.

## FAQ

Read the beginner guide and FAQ at **https://nithin0x.github.io/htb-study-trackers/faq/**.

## Where your progress lives

Progress is stored locally in your browser's `localStorage` and never leaves your device. There is no account and no tracking. Use **Export backup** regularly to keep a copy or move progress between browsers/devices.

Note that the hosted site and a downloaded local `.html` copy keep separate browser storage — pick one or transfer between them via Export/Import.

## Feedback & contributions

- Found a write-up, video, cheat sheet, or practice box that helped with CWES? [Suggest a resource](https://github.com/nithin0x/htb-study-trackers/issues/new?template=suggest-resource.yml)
- Spotted a broken link, wrong module, or layout bug? [Report a problem](https://github.com/nithin0x/htb-study-trackers/issues/new?template=report-problem.yml)

## Credits

Forked and tailored for CWES from [cnmoseman's htb-study-trackers](https://github.com/cnmoseman/htb-study-trackers), which originally started from [mattrfield's coae-study-tracker](https://github.com/mattrfield/coae-study-tracker). This is an independent study aid, not affiliated with or endorsed by Hack The Box.

## License

MIT licensed — see [LICENSE](LICENSE). Embedded fonts (`IBM Plex Mono` / `Chakra Petch` license notices) are under the SIL Open Font License 1.1 in [LICENSES/](LICENSES/).
