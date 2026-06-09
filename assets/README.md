Place your site logo here as `logo-512.png` (512x512 px recommended).

Steps to prepare the image:

1) If you have an SVG, export a 512x512 PNG. Examples:

- With ImageMagick:

magick convert logo.svg -background none -resize 512x512 assets/logo-512.png

- With Inkscape (Windows):

inkscape logo.svg --export-type=png --export-filename=assets/logo-512.png --export-width=512 --export-height=512

2) If you only have a PNG, ensure it is at least 512x512. To resize with ImageMagick:

magick convert input.png -background none -resize 512x512 assets/logo-512.png

3) Commit the file and ensure it is served under /assets/logo-512.png (production: https://rechtflott.com/assets/logo-512.png).

Notes:
- Google prefers a square, high-contrast image for the site logo.
- Make sure the file is accessible (HTTP 200) and not blocked by robots.txt.
- After uploading, test with Google Rich Results Test and in Search Console.
