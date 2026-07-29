export function formatDate(ts){
  if(!ts) return '-'
  const d = new Date(ts)
  return d.toLocaleString()
}
