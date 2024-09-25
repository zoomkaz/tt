import { ApiClient } from "./Client"

export const AuthMethod = async (id: string, code: string) => {
  return await ApiClient({
    url: '/oauth2/access_token',
    method: 'POST',
    data: {
      "client_id": id,
      "client_secret": "H3f94qGN8aVTr1SOjWxJFgl1z59IOrsSEVeLdAeHOSrdiXOYbN82duFQFIV5YqvY",
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "https://zoomkaz.github.io/tt/"
    }
  })
}