import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Context/Context'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    const root = createRoot(el)
    const initialUser = props.initialPage.props.auth?.user || null;
    root.render(
      <AuthProvider initialUser={initialUser}>
        <App {...props} />
      </AuthProvider>
    )
  },
})