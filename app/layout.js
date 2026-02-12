import './globals.css'

export const metadata = {
  title: 'Aarambha Gautam | Backend Developer',
  description: 'Backend Developer specializing in Django, AI/ML, and building solid web applications',
  keywords: 'Backend Developer, Django, Python, AI/ML, Next.js, Portfolio',
  authors: [{ name: 'Aarambha Gautam' }],
  openGraph: {
    title: 'Aarambha Gautam | Backend Developer',
    description: 'Backend Developer specializing in Django, AI/ML, and building solid web applications',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
