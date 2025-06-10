import { Provider } from "../components/ui/provider"
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  return (
    <Provider >
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </Provider>
  )
}