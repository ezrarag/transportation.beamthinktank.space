'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Truck,
  Loader2,
  LogOut,
  ShieldCheck,
  LogIn,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  User,
} from 'lucide-react'
import { getAdminNavGroups } from '@/lib/config/adminNav'
import { useUserRole } from '@/lib/hooks/useUserRole'
import { usePartnerProject } from '@/lib/hooks/useProjectAccess'
import { signOut, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ADMIN_GATEWAYS_DISABLED, isAdminEmailAllowed } from '@/lib/config/adminAccess'

function AdminAuthScreen() {
  const router = useRouter()
  const { user } = useUserRole()
  const [signingOut, setSigningOut] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (auth) {
      setSigningIn(true)
      void getRedirectResult(auth)
        .then((res) => {
          if (res?.user) {
            router.refresh()
          }
        })
        .catch((err: any) => {
          console.error('Redirect auth result error:', err)
          if (err.code === 'auth/unauthorized-domain') {
            setAuthError(`This domain (${typeof window !== 'undefined' ? window.location.hostname : 'current domain'}) is not authorized. Please add it to Firebase Console > Authentication > Settings > Authorized domains.`)
          } else if (err.code === 'auth/operation-not-allowed') {
            setAuthError('Google Sign-In is not enabled in Firebase Console (Authentication > Sign-in method > Google).')
          } else if (err.code !== 'auth/redirect-cancelled-by-user') {
            setAuthError(`Auth Redirect Error (${err.code || 'unknown'}): ${err.message}`)
          }
        })
        .finally(() => {
          setSigningIn(false)
        })
    }
  }, [router])

  const handleGoogleSignIn = async () => {
    if (!auth) {
      setAuthError('Firebase Auth is not initialized. Please ensure environment variables are configured in Vercel or .env.local.')
      return
    }
    setAuthError(null)
    setSigningIn(true)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      const res = await signInWithPopup(auth, provider)
      if (res?.user) {
        router.refresh()
      }
    } catch (error: any) {
      console.warn('Popup auth failed or blocked (e.g. Safari / iPad), falling back to redirect:', error)
      if (error.code === 'auth/unauthorized-domain') {
        setAuthError(`This domain (${typeof window !== 'undefined' ? window.location.hostname : 'current domain'}) is not authorized in Firebase Console > Authentication > Settings > Authorized domains.`)
        setSigningIn(false)
        return
      }
      if (error.code === 'auth/operation-not-allowed') {
        setAuthError('Google Sign-In is not enabled in Firebase Console (Authentication > Sign-in method > Google).')
        setSigningIn(false)
        return
      }
      try {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        await signInWithRedirect(auth, provider)
      } catch (redirectErr: any) {
        console.error('Redirect sign in error:', redirectErr)
        setAuthError(`Sign in error (${redirectErr.code || error.code || 'unknown'}): ${redirectErr.message || error.message}`)
        setSigningIn(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-transport-black text-white flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center space-y-6 bg-transport-steel/60 p-8 rounded-3xl border border-transport-amber/40 shadow-2xl backdrop-blur-md"
      >
        <div className="w-16 h-16 rounded-full bg-transport-amber/20 text-transport-amber border border-transport-amber/40 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide">
            Transportation Admin
          </h1>
          <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
            {user ? (
              <>Signed in as <strong className="text-transport-amber">{user.email}</strong>. To access the admin area, please sign in with an authorized admin Google account (<strong className="text-white">ezra@readyaimgo.biz</strong>).</>
            ) : (
              <>Sign in with your admin Google account (<strong className="text-transport-amber">ezra@readyaimgo.biz</strong>) to access the BEAM Transportation Admin Area.</>
            )}
          </p>
        </div>

        {authError && (
          <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/50 text-left text-xs text-red-200 space-y-1 backdrop-blur-md">
            <div className="flex items-center gap-2 font-bold text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Authentication Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-red-200/90">{authError}</p>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn}
          className="w-full py-3.5 px-6 rounded-full bg-transport-amber text-black font-mono font-bold text-sm hover:bg-amber-300 transition shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
        >
          <LogIn className="w-4 h-4 text-black" />
          <span>{signingIn ? 'Signing in...' : 'Sign In with Admin Google Account'}</span>
        </button>
      </motion.div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, role, loading: roleLoading } = useUserRole()
  const partnerProjectId = usePartnerProject()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const pathname = usePathname()
  
  const isAllowedAdmin = isAdminEmailAllowed(user?.email)
  const effectiveRole = ADMIN_GATEWAYS_DISABLED || isAllowedAdmin ? 'beam_admin' : role
  const hasAdminShellAccess =
    ADMIN_GATEWAYS_DISABLED ||
    isAllowedAdmin ||
    role === 'beam_admin' ||
    role === 'partner_admin' ||
    role === 'board'

  const navGroups = useMemo(
    () => getAdminNavGroups({ role: effectiveRole, partnerProjectId }),
    [effectiveRole, partnerProjectId],
  )

  const adminHomeHref = useMemo(() => {
    if (effectiveRole === 'partner_admin' && partnerProjectId) return `/admin/projects/${partnerProjectId}`
    return '/admin'
  }, [partnerProjectId, effectiveRole])
  
  // Redirect partner admins to their project page if trying to view root /admin
  useEffect(() => {
    if (effectiveRole === 'partner_admin' && partnerProjectId && pathname === '/admin') {
      router.push(`/admin/projects/${partnerProjectId}`)
    }
  }, [effectiveRole, partnerProjectId, pathname, router])

  const handleSignOut = async () => {
    if (!auth) return
    setSigningOut(true)
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      setSigningOut(false)
    }
  }

  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transport-black">
        <Loader2 className="h-10 w-10 animate-spin text-transport-amber" />
      </div>
    )
  }

  if (!user || !hasAdminShellAccess) {
    return <AdminAuthScreen />
  }

  const currentSectionName = pathname === '/admin' 
    ? 'Executive Overview' 
    : pathname.replace('/admin/', '').split('/')[0].replace(/-/g, ' ').toUpperCase()

  return (
    <div className="min-h-screen bg-[#07080B] text-white flex overflow-hidden font-sans selection:bg-transport-amber selection:text-black">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Persistent Left Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0D14] border-r border-white/10 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0F131D]/80">
          <Link href={adminHomeHref} className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-transport-amber/15 border border-transport-amber/30 flex items-center justify-center text-transport-amber group-hover:scale-105 transition-transform">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-black text-white font-mono tracking-wider block">
                BEAM TRANSPORT
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-transport-signal block">
                Control Hub
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation - Grouped into 5 Domains */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
          {navGroups.map((group) => (
            <div key={group.key} className="space-y-1">
              <p className="px-3 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-white/40">
                {group.title}
              </p>
              {group.items.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(`${link.href}/`))

                if (!link.enabled) {
                  return (
                    <div
                      key={link.key}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-white/35 cursor-not-allowed"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-white/25" />
                        <span className="truncate">{link.label}</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 bg-white/5 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-xs font-medium group ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-sm'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-transport-amber' : 'text-white/50 group-hover:text-white'
                      }`} />
                      <span className="truncate">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-transport-signal/15 text-transport-signal border border-transport-signal/30 font-bold shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Pinned User Profile & Session Indicator */}
        <div className="p-3 border-t border-white/10 bg-[#0B0E16] space-y-2.5">
          <div className="flex items-center space-x-2.5 px-2.5 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-mono font-bold text-white truncate">
                {user?.email || 'ezra@readyaimgo.biz'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                  Admin Active
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-red-300 hover:text-white hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{signingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header Rail */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#08090C]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-white/50">
              <span className="text-white/70 font-semibold hidden sm:inline">BEAM Transport</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline text-white/30" />
              <span className="text-transport-amber font-medium truncate max-w-[200px] sm:max-w-xs">
                {currentSectionName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Telemetry</span>
            </span>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              title="Open public website"
            >
              <span>Public Portal</span>
              <ExternalLink className="w-3 h-3 text-white/50" />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content Canvas */}
        <main className="flex-1 min-w-0 bg-[#07090E]">
          {children}
        </main>
      </div>
    </div>
  )
}
