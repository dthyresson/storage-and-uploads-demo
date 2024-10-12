import { randomUUID } from 'crypto'

import PDFDocument from 'pdfkit'
import type { QueryResolvers, MutationResolvers, Invoice } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

const generateRandomInvoice = (): Omit<
  Invoice,
  'pdf' | 'createdAt' | 'updatedAt' | 'id'
> => {
  const now = new Date()
  const dueDate = new Date(
    now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  ) // Random due date within 30 days

  return {
    invoiceId: `INV-${randomUUID().slice(0, 8)}`,
    customer: `Customer-${Math.floor(Math.random() * 1000)}`,
    amount: Math.floor(Math.random() * 10000) + 100, // Random amount between 100 and 10099
    dueOn: dueDate,
    invoicedOn: now,
    memo: `Invoice for services rendered - ${now.toLocaleDateString()}`,
  }
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
  doc.text(`Amount: $${data.amount}`).moveDown()

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
