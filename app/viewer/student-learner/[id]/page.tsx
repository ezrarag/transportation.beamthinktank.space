import { redirect } from 'next/navigation'

export default async function LegacyStudentLearnerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/viewer/student/${id}`)
}
