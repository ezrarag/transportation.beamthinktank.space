import type { PortalPath } from '@/lib/types/portal'

export function resolvePortalPath(path: PortalPath, ngo?: string, scoped = false): string {
  if (path === '/home') {
    return scoped && ngo ? `/${ngo}` : '/'
  }

  const scopeEligible: PortalPath[] = [
    '/',
    '/home',
    '/studio/recordings',
    '/projects',
    '/dashboard',
    '/admin',
    '/viewer',
    '/partner',
    '/partner/apply',
    '/cohort',
    '/cohort/enroll',
    '/subscriber',
    '/subscribe',
    '/studio',
  ]

  if (scoped && ngo) {
    if (!scopeEligible.some((eligiblePath) => path === eligiblePath || path.startsWith(`${eligiblePath}/`))) {
      return path
    }
    return path === '/' ? `/${ngo}` : `/${ngo}${path}`
  }
  return path
}
