import { useEffect, useState } from "react"
import axios from 'axios';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    () => {
      (async () => {
        axios
      })()
    },
    []
  )
}