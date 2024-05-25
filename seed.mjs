import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
    },
  },
)

const categories = ['Food', 'Housing', 'Car', 'Entertainment']

async function seedTransactions() {
  const { error: deleteError } = await supabase
    .from('transactions')
    .delete()
    .gte('id', 0)

  if (deleteError) {
    throw new Error('Error deleting existing data')
  }

  let transactions = []

  for (let year = new Date().getFullYear(); year > new Date().getFullYear() - 2; year--) {
    for (let i = 0; i < 10; i++) {
      const date = new Date(
        year,
        faker.number.int({ min: 0, max: 11 }),
        faker.number.int({ min: 1, max: 28 })
      )

      let type, category

      const typeBias = Math.random()

      if (typeBias < 0.85) {
        type = 'expense'
        category = faker.helpers.arrayElement(categories)
      } else if (typeBias < 0.95) {
        type = 'income'
      } else {
        type = faker.helpers.arrayElement(['saving', 'investment'])
      }

      let amount

      switch (type) {
        case 'income':
          amount = faker.number.int({ min: 2000, max: 5000 })
          break
        case 'expense':
          amount = faker.number.int({ min: 100, max: 1000 })
          break
        case 'saving':
        case 'investment':
          amount = faker.number.int({ min: 5000, max: 10000 })
          break
        default:
          amount = 0
      }

      transactions.push({
        created_at: date,
        amount,
        type,
        description: faker.lorem.sentence(),
        category: type === 'expense' ? category : null
      })
    }
  }

  const { error: upsertError } = await supabase
    .from('transactions')
    .upsert(transactions)

  if (upsertError) {
    throw new Error('Error inserting data')
  }

  return 'Data inserted successfully'
}

seedTransactions()
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message))
