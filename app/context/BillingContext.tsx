import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface BillingContextProps {
  subscriptionStatus: "active" | "inactive"
  credits: number
}

const BillingContext = createContext<BillingContextProps>({} as BillingContextProps)

export const BillingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscriptionStatus] = useState<"active" | "inactive">("inactive")
  const [credits, setCredits] = useState<number>(0)

  useEffect(() => setCredits(10), [])

  const value = useMemo(() => {
    return {
      subscriptionStatus,
      credits,
    }
  }, [subscriptionStatus, credits])

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
}

export const useBilling = () => useContext(BillingContext)
