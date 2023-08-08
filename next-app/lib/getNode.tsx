export default async function getNode(id: string, view_mode: string, langcode: string) {
    const res = await fetch(`http://127.0.0.1/drupal/rest_api/node/${id}/${view_mode}/${langcode}`, { next: { revalidate: 60 } })

    if (!res.ok) throw new Error('Failed to fetch Node') //return undefined

    return res.json()
}