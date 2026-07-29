# How to Add Photos & Links

Two separate systems, both work the same basic way: put a picture in the right folder, save, refresh your browser. No code editing needed for photos.

---

## 1. Adding photos to an EVENT

Every event has its own folder for photos.

**Steps:**
1. Open the folder `src/assets/events/`
2. Find the folder matching that event (or create one if it doesn't exist yet — folder names below)
3. Drag your photo(s) into that folder
4. Save. Refresh your browser (or just wait a second if the dev server is running — it updates itself)
5. Go to that event's page and the photo will be there, in the spinning gallery

**Folder names that already exist:**
| Event | Folder name |
|---|---|
| ACES Hangout | `src/assets/events/hangout/` |
| Rep Your School | `src/assets/events/rep-your-school/` |
| Rep Your Jersey | `src/assets/events/rep-your-jersey/` |

You can drop as many photos as you want into one folder — the gallery ring resizes itself automatically.

**Accepted file types:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`

---

## 2. Adding a brand new event (not just new photos to an existing one)

This is the one part that needs a tiny code edit, because the title and description have to come from somewhere.

1. Open `src/data/events.ts`
2. Copy one of the existing entries, like this one:
   ```
   {
     id: "hangout",
     title: "ACES Hangout",
     description: "...",
   },
   ```
3. Change the `id`, `title`, and `description` to your new event. **Important:** the `id` you pick here is also your folder name — keep it short, lowercase, with dashes instead of spaces (e.g. `id: "beach-day"`).
4. Create a matching folder: `src/assets/events/beach-day/`
5. Drop photos in there whenever you have them (can be empty for now — the page will just say "no photos yet" until you add some)

---

## 3. Adding a cover photo to a GALLERY album

This is the "ACES Gallery" page — the one that links out to Pixieset/Google Drive/Telegram albums.

1. Open the folder `src/assets/gallery/`
2. Name your photo **exactly** like the album's slug (see table below), for example: `codefest.jpg`
3. Drop it into that folder
4. Save, refresh — the album's card now shows that photo instead of just its title

**Slug names for each existing album:**
| Album | File name to use |
|---|---|
| CODEFEST | `codefest.jpg` |
| CBET Dinner | `cbet-dinner.jpg` |
| REP ACES | `rep-aces.jpg` |
| ACES Week | `aces-week.jpg` |
| FIELD TRIP | `field-trip.jpg` |
| Orientation | `orientation.jpg` |
| MedTech Rave | `medtech-rave.jpg` |
| Ladies Meetup | `ladies-meetup.jpg` |

(`.png`, `.webp`, or `.avif` work too — just keep the name before the dot exactly matching the slug.)

---

## 4. Making a Gallery album card link somewhere (or adding a brand new album)

Unlike events, every Gallery card is a clickable link out to an external album (Pixieset, Drive, etc.) — so this one's just editing a list.

1. Open `src/pages/Gallery.tsx`
2. Find the list near the top called `albums` — it looks like this:
   ```
   { slug: "codefest", title: "CODEFEST", url: "https://Acesworks.pixieset.com/codefest/" },
   ```
3. **To change where an album links to:** just edit the `url` part.
4. **To add a whole new album:** copy one of those lines, give it a new `slug` (short, lowercase, dashes for spaces), a `title` (what shows on the card), and the `url` it should open. Then, if you want a cover photo for it, follow Step 3 above using that same slug as the filename.

---

## Quick troubleshooting

- **Photo not showing up?** Double-check the filename/folder name matches exactly — no extra spaces, correct dashes, lowercase.
- **Still not showing after saving?** Fully refresh the browser tab (not just the preview). If that doesn't work, stop and restart `npm run dev`.
- **Card shows text instead of a photo?** That's normal — it means no photo has been added for that one yet. It's not broken, just waiting for a picture.
