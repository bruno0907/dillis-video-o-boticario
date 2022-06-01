import { useEffect, useState } from "react"

export const useCustomersFilter = (value: { searchBy?: string, searchValue?: string }, delay: number) => {  
  const [state, setState] = useState({
    searchBy: '',
    searchValue: ''
  })  
  
  useEffect(() => {
    if(!value.searchBy) return

    const handler = setTimeout(() => {
      setState({
        searchBy: value.searchBy!,
        searchValue: value.searchValue!
      })
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value.searchBy, value.searchValue, delay])

  return state
}
