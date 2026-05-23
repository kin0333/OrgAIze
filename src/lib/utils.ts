import { type ClassValue, clsx } from "clsx"

export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Approved":
    case "Accepted":
      return "bg-[#e0f7f1] text-[#004d00]"
    case "Pending":
    case "Draft":
      return "bg-amber-50 text-amber-700"
    case "Rejected":
    case "Declined":
      return "bg-red-50 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}
