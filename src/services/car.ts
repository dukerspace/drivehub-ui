import { Car } from '../types/car'
import { ApiClient } from './api'

export const getAll = async () => {
  const res = await ApiClient().get('/cars')

  return res.data
}

export const create = async (data: Car) => {
  const res = await ApiClient().post('/cars', data)

  return res.data
}

export const getById = async (id: number) => {
  const res = await ApiClient().get(`cars/${id}`)

  return res.data
}

export const update = async (id: number, data: Car) => {
  const res = await ApiClient().put(`cars/${id}`, data)

  return res.data
}

export const remove = async (id: number) => {
  const res = await ApiClient().delete(`cars/${id}`)

  return res.data
}
