type AuthRegisterInput = {
  email: string
  password: string
  password_confirm: string
}

type AuthRegisterRequest = Omit<AuthRegisterInput, 'password_confirm'> & {
  name: string
  password_confirmation: string
}

type AuthRegisterResponse = {}
