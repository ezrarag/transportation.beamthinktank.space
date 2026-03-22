import { transportConfig } from '@/lib/config/transportConfig'
import { orchestraConfig } from '@/lib/config/orchestraConfig'
import type { NGOConfig } from '@/lib/types/portal'

export const DEFAULT_NGO = 'transport'

export const ngoConfigs: Record<string, NGOConfig> = {
  [transportConfig.id]: transportConfig,
  [orchestraConfig.id]: orchestraConfig,
}

export function getNgoConfig(ngo?: string): NGOConfig | null {
  const key = ngo ?? DEFAULT_NGO
  return ngoConfigs[key] ?? null
}
