export default async function getFullBundle( bundle: string, view_mode: string, quantity: number, langcode: string) {
    const res = await fetch(`http://127.0.0.1/drupal/rest_api/${bundle}/${view_mode}/${quantity}/${langcode}`, { next: { revalidate: 10 } })

    if (!res.ok) throw new Error('Failed to fetch Bundle ')//return undefined

    return res.json()
}