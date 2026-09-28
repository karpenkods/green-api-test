import {
  checkAccountSchema,
  sendMessageSchema,
} from '../../../common/validations/validationSchema'

const t = (key: string) => key

describe('validationSchema', () => {
  it('validates account data for name mode', async () => {
    const schema = checkAccountSchema(t, 'name')

    await expect(
      schema.isValid({
        idInstance: '1',
        apiTokenInstance: '2',
        username: '@user',
        phoneNumber: '',
      }),
    ).resolves.toBe(true)

    await expect(
      schema.isValid({
        idInstance: '1',
        apiTokenInstance: '2',
        username: 'user',
      }),
    ).resolves.toBe(false)
  })

  it('validates account data for phone mode', async () => {
    const schema = checkAccountSchema(t, 'phone')

    await expect(
      schema.isValid({
        idInstance: '1',
        apiTokenInstance: '2',
        phoneNumber: '79991234567',
      }),
    ).resolves.toBe(true)

    await expect(
      schema.isValid({
        idInstance: '1',
        apiTokenInstance: '2',
        phoneNumber: '123',
      }),
    ).resolves.toBe(false)
  })

  it('validates send message schema', async () => {
    const schema = sendMessageSchema(t)

    await expect(schema.isValid({ message: 'hello' })).resolves.toBe(true)
    await expect(schema.isValid({ message: '' })).resolves.toBe(false)
    await expect(schema.isValid({ message: 'a'.repeat(4000) })).resolves.toBe(
      false,
    )
  })
})
