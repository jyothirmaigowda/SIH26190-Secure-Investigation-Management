type PlaceholderPageProps = {
  title: string
  description: string
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm font-medium text-sky-300">Integration placeholder</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
          {description}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
          This shell only provides navigation and layout for the demo frontend.
          Module functionality, backend calls, and authorization behavior are
          intentionally not implemented here.
        </p>
      </section>
    </div>
  )
}

export default PlaceholderPage
