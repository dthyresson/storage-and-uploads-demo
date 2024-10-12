import { randomUUID } from 'crypto'

import PDFDocument from 'pdfkit'
import type { QueryResolvers, MutationResolvers, Invoice } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

const firstNames = [
  'John',
  'Jane',
  'Michael',
  'Emily',
  'David',
  'Sarah',
  'Robert',
  'Lisa',
  'William',
  'Emma',
]
const lastNames = [
  'Smith',
  'Johnson',
  'Brown',
  'Davis',
  'Wilson',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
]
const suffixes = [
  'LLC',
  'Inc.',
  'Co.',
  'Corp.',
  'Ltd.',
  '& Sons',
  'Associates',
  'Enterprises',
  'Group',
  'Partners',
]

const products = [
  'Dragon Taming',
  'Unicorn Grooming',
  'Cloud Sculpting',
  'Time Travel Tours',
  'Mermaid Singing Lessons',
  'Invisible Ink Manufacturing',
  'Teleportation Device Repair',
  'Fairy Dust Collection',
  'Goblin Negotiation Services',
  'Interdimensional Cable Installation',
]

const generateRandomInvoice = (): Omit<
  Invoice,
  'pdf' | 'createdAt' | 'updatedAt' | 'id'
> => {
  const now = new Date()
  const dueDate = new Date(
    now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  ) // Random due date within 30 days

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

  const selectedProducts = shuffleArray(products).slice(
    0,
    Math.floor(Math.random() * 3) + 3
  )
  const productList = selectedProducts.join(', ')

  return {
    invoiceId: `INV-${randomUUID().slice(0, 8)}`,
    customer: `${firstName} ${lastName} ${suffix}`,
    amount: Math.floor(Math.random() * 10000) + 100, // Random amount between 100 and 10099
    dueOn: dueDate,
    invoicedOn: now,
    memo: `Invoice for services rendered: ${productList} - ${now.toLocaleDateString()}`,
  }
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const invoices: QueryResolvers['invoices'] = () => {
  return db.invoice.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const createInvoice: MutationResolvers['createInvoice'] = async () => {
  const data = generateRandomInvoice()
  const invoicePdfBuffer = await generateInvoicePdf(data)
  const file = new File([invoicePdfBuffer], `invoice-${data.invoiceId}.pdf`, {
    type: 'application/pdf',
  })
  const pdf = await storage.writeFile(file)

  return db.invoice.create({ data: { ...data, pdf } })
}

export const generateInvoicePdf = async (
  data: Omit<Invoice, 'pdf' | 'createdAt' | 'updatedAt' | 'id'>
): Promise<Buffer> => {
  const doc = new PDFDocument({ margin: 50 })

  // Create a write stream (in memory)
  const chunks: Buffer[] = []
  doc.on('data', (chunk) => chunks.push(chunk))

  // Add content to the PDF
  doc.fontSize(25).text('Invoice', { align: 'center' }).moveDown()

  doc
    .fontSize(12)
    .text(`Invoice Number: ${data.invoiceId}`)
    .text(`Date: ${data.invoicedOn}`)
    .moveDown()

  doc
    .text(`Customer: ${data.customer}`)
    .text(`Due on: ${data.dueOn}`)
    .moveDown()

  doc.text(`Memo: ${data.memo}`).moveDown()
  doc.text(`Amount: $${data.amount.toFixed(2)}`).moveDown()

  // Return a Promise that resolves with the PDF buffer
  return new Promise((resolve) => {
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks)
      logger.info({ pdfSize: pdfBuffer.length }, 'PDF generated')
      resolve(pdfBuffer)
    })
    doc.end()
  })
}
