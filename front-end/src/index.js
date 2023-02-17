import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from 'Layout'
import 'index.css'
import redux from './store/redux'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={redux}>
      <Layout />
    </Provider>
  </QueryClientProvider>
)
