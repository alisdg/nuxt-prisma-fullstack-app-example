
export default defineEventHandler(async (event) => {
  const body =  getQuery(event)
  return body
})
