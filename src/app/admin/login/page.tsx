'use client'
import { useActionState } from 'react'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--admin-sidebar)' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Myra Global Exports
          </p>
          <h1 className="text-2xl font-semibold" style={{ color: '#FFFFFF' }}>
            Admin Console
          </h1>
        </div>

        <div
          className="rounded-lg p-7"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <form action={formAction} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-steel/50 focus-visible:border-white/40"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-medium"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-steel/50 focus-visible:border-white/40"
              />
            </div>
            {state?.error && (
              <p
                className="text-sm px-3 py-2 rounded-md"
                style={{
                  backgroundColor: 'rgba(220,38,38,0.12)',
                  color: '#FCA5A5',
                }}
              >
                {state.error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isPending}
              style={{
                backgroundColor: 'var(--admin-accent)',
                color: 'white',
              }}
            >
              {isPending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
