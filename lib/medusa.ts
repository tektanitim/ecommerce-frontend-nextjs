// eticaret-projesi/lib/medusa.ts
import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "http://localhost:9000", // Backend adresin
  maxRetries: 3,
  apiKey: "pk_69369b9e67607147a15702ac5bc00549c692e508b6719c9e8eddf70ee2576abe",
})

export default medusa
