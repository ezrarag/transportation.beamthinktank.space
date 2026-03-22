import { redirect } from 'next/navigation'
import { isTransportAreaSlug } from '@/lib/transport/areas'

export default async function ViewerAreaPage({
  params,
}: {
  params: Promise<{ area: string }>
}) {
  const { area } = await params
  redirect(`/viewer?area=${isTransportAreaSlug(area) ? area : 'repair'}`)
}
