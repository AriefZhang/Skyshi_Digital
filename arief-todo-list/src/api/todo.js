import axios from 'axios'

const todo = axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id'
})

export default todo