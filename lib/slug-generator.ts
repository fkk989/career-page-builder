export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function generateAvailableSlug(
  name: string,
  checkFn: (slug: string) => Promise<boolean>
) {
  let slug = generateSlug(name);
  let attempt = 1;

  // if slug exists → try slug-2, slug-3, slug-4...
  while (await checkFn(slug)) {
    slug = `${generateSlug(name)}-${attempt}`;
    attempt++;
  }

  return slug;
}
