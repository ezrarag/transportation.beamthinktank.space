'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Truck,
  ChevronDown,
  MoreVertical,
  Loader2,
  LogOut,
  ShieldCheck,
  LogIn,
  AlertCircle,
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

        {user && (
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{signingOut ? 'Signing out...' : `Sign Out (${user.email})`}</span>
          </button>
        )}

        <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white transition font-medium"
          >
            ← Return to Transportation Homepage
          </Link>
        </div>
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const pathname = usePathname()
  const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging'
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
    if (effectiveRole === 'board') return '/admin/board'
    return '/admin/dashboard'
  }, [partnerProjectId, effectiveRole])
  
  // Redirect partner admins to their project page
  useEffect(() => {
    if (effectiveRole === 'partner_admin' && partnerProjectId && pathname === '/admin/dashboard') {
      router.push(`/admin/projects/${partnerProjectId}`)
    }
  }, [effectiveRole, partnerProjectId, pathname, router])

  const handleSignOut = async () => {
    if (!auth) return
    
    setSigningOut(true)
    setDropdownOpen(false)
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
        <Loader2 className="h-12 w-12 animate-spin text-transport-amber" />
      </div>
    )
  }

  if (!user || !hasAdminShellAccess) {
    return <AdminAuthScreen />
  }

  return (
    <div className={`min-h-screen bg-orchestra-dark flex overflow-hidden ${isStaging ? 'border-t-4 border-purple-500' : ''} relative`}>
      {/* Staging Watermark */}
      {isStaging && (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-purple-400 text-9xl font-bold transform -rotate-45">STAGING</div>
          </div>
        </div>
      )}
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-orchestra-dark/95 backdrop-blur-md border-r border-orchestra-gold/20 transform transition-transform duration-300 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        initial={{ x: -224 }}
        animate={{ x: sidebarOpen ? 0 : -224 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-orchestra-gold/20">
            <Link href={adminHomeHref} className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-transport-amber" />
              <span className="text-lg font-bold text-white font-mono">BEAM Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-orchestra-cream hover:text-orchestra-gold"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-3">
            {navGroups.map((group) => (
              <div key={group.key} className="space-y-1.5">
                {group.title && (
                  <p className="px-2 text-[10px] font-semibold tracking-[0.14em] text-orchestra-gold/70">
                    {group.title}
                  </p>
                )}
                {group.items.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

                  if (!link.enabled) {
                    return (
                      <div
                        key={link.key}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-orchestra-cream/55 border border-orchestra-gold/10 bg-orchestra-gold/5"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium truncate">{link.label}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wide text-orchestra-gold/70">Soon</span>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-orchestra-gold/20 text-orchestra-gold border border-orchestra-gold/30'
                          : 'text-orchestra-cream hover:bg-orchestra-gold/10 hover:text-orchestra-gold'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium truncate">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-orchestra-gold/20 space-y-2">
            {user && (
              <div className="text-xs text-orchestra-cream/70 truncate px-2">
                {user.email}
              </div>
            )}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm text-orchestra-cream hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{signingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
            <div className="text-xs text-orchestra-cream/50 pt-2 border-t border-orchestra-gold/10">
              BEAM Transportation Admin Portal
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:ml-56 flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-orchestra-dark/95 backdrop-blur-md border-b border-orchestra-gold/20 p-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-orchestra-cream hover:text-orchestra-gold"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Desktop header with Navigation Dropdown */}
        <header className="hidden lg:flex items-center justify-between bg-orchestra-dark/95 backdrop-blur-md border-b border-orchestra-gold/20 px-6 py-4 flex-shrink-0 relative z-[60]">
          <div className="flex-1"></div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-orchestra-gold/10 hover:bg-orchestra-gold/20 text-orchestra-gold rounded-lg transition-colors border border-orchestra-gold/30 relative z-[70]"
            >
              <MoreVertical className="h-5 w-5" />
              <span className="font-medium">Menu</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[9998]"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed right-6 top-20 w-56 bg-orchestra-dark border border-orchestra-gold/30 rounded-lg shadow-2xl z-[9999] overflow-hidden backdrop-blur-md"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <div className="py-2">
                      {navGroups.map((group) => (
                        <div key={`dropdown-group-${group.key}`}>
                          {group.title && (
                            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold tracking-[0.14em] text-orchestra-gold/70">
                              {group.title}
                            </p>
                          )}
                          {group.items.map((link) => {
                            const Icon = link.icon
                            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

                            if (!link.enabled) {
                              return (
                                <div
                                  key={`dropdown-${link.key}`}
                                  className="flex items-center justify-between space-x-3 px-4 py-2.5 text-orchestra-cream/60"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    <span className="font-medium">{link.label}</span>
                                  </div>
                                  <span className="text-[10px] uppercase tracking-wide text-orchestra-gold/70">Soon</span>
                                </div>
                              )
                            }

                            return (
                              <Link
                                key={`dropdown-${link.key}`}
                                href={link.href}
                                onClick={() => setDropdownOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 transition-colors relative z-[10000] ${
                                  isActive
                                    ? 'bg-orchestra-gold/20 text-orchestra-gold border-l-2 border-orchestra-gold'
                                    : 'text-orchestra-cream hover:bg-orchestra-gold/10 hover:text-orchestra-gold'
                                }`}
                                style={{ pointerEvents: 'auto' }}
                              >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span className="font-medium">{link.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      ))}
                      
                      {/* Divider */}
                      <div className="border-t border-orchestra-gold/20 my-2" />
                      
                      {/* User Info */}
                      {user && (
                        <div className="px-4 py-2 text-xs text-orchestra-cream/70 border-b border-orchestra-gold/10">
                          <p className="truncate">{user.email}</p>
                        </div>
                      )}
                      
                      {/* Sign Out */}
                      <button
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 transition-colors relative z-[10000] text-orchestra-cream hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{signingOut ? 'Signing out...' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6 flex-1 overflow-y-auto overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
