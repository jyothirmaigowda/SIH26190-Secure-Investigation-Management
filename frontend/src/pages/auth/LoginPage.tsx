import { FormEvent, useState } from 'react'
import type { LoginCredentials } from '../../types/auth'

type LoginPageProps = {
  onLogin: (credentials: LoginCredentials) => void
}

type LoginErrors = {
  username?: string
  password?: string
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: LoginErrors = {}

    if (!username.trim()) {
      nextErrors.username = 'Enter an email address or username.'
    }

    if (!password) {
      nextErrors.password = 'Enter a password.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onLogin({
      password,
      username: username.trim(),
    })
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-sky-400/40 bg-slate-900 text-base font-bold text-sky-200 shadow-lg shadow-slate-950/30"
            >
              S
            </div>
            <div>
              <p className="text-lg font-semibold text-white">SIMS</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Fictional Demo Workspace
              </p>
            </div>
          </div>
          <p className="hidden text-sm text-slate-400 sm:block">
            Secure Investigation Management System
          </p>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Secure Investigation Management System
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              SIMS
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              A clean legal-tech workspace for investigation teams to prepare
              case workflows, review documents, and coordinate operational
              dashboards using fictional demo data.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-sm font-semibold text-white">Case Intake</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Demo dashboard entry point.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-sm font-semibold text-white">Document Flow</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Placeholder integration area.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-sm font-semibold text-white">Demo State</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Local frontend session only.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-700/80 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
            <div className="border-b border-slate-800 pb-6">
              <p className="text-sm font-medium text-sky-300">Access demo</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Log in to SIMS
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Demo interface — authentication integration pending.
              </p>
            </div>

            <form className="mt-6 space-y-5" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-sm font-medium text-slate-200"
                  htmlFor="username"
                >
                  Email or Username
                </label>
                <input
                  aria-describedby={
                    errors.username ? 'username-error' : undefined
                  }
                  aria-invalid={errors.username ? 'true' : 'false'}
                  autoComplete="username"
                  className="mt-2 w-full rounded-md border border-slate-600 bg-slate-950 px-4 py-3 text-base text-white shadow-sm outline-none transition placeholder:text-slate-600 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/50"
                  id="username"
                  name="username"
                  onChange={(event) => {
                    setUsername(event.target.value)
                    if (errors.username) {
                      setErrors((current) => ({
                        ...current,
                        username: undefined,
                      }))
                    }
                  }}
                  placeholder="analyst.demo"
                  type="text"
                  value={username}
                />
                {errors.username ? (
                  <p className="mt-2 text-sm text-rose-300" id="username-error">
                    {errors.username}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-2 flex rounded-md border border-slate-600 bg-slate-950 shadow-sm transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-300/50">
                  <input
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    aria-invalid={errors.password ? 'true' : 'false'}
                    autoComplete="current-password"
                    className="min-w-0 flex-1 rounded-l-md bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-slate-600"
                    id="password"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value)
                      if (errors.password) {
                        setErrors((current) => ({
                          ...current,
                          password: undefined,
                        }))
                      }
                    }}
                    placeholder="Enter any demo password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                  />
                  <button
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="min-w-20 rounded-r-md border-l border-slate-700 px-4 text-sm font-medium text-slate-300 outline-none transition hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white focus:ring-2 focus:ring-inset focus:ring-sky-300"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-rose-300" id="password-error">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <button
                className="w-full rounded-md bg-sky-500 px-4 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-950/30 outline-none transition hover:bg-sky-400 focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                type="submit"
              >
                Log in
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Accepts any non-empty demo username and password. No backend
              authentication or authorization is performed.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
