import { createContext, useContext } from 'react'

export const LangContext = createContext({ lang: 'es', setLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}
