export default async function getBundle(site_name: string, bundle: string, range_start: number, range_end: number) {
    const res = await fetch(`http://127.0.0.1/drupal/rest_api/${site_name}/${bundle}/range/${range_start}/${range_end}`, { next: { revalidate: 10 } })

    if (!res.ok) throw new Error('Failed to fetch Bundle ')//return undefined

    return res.json()
}