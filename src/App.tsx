import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { useEffect, useState } from 'react'
import './App.css'
import { CarBox } from './Component/CarBox/CarBox'
import { Layout } from './Component/Layout/Layout'
import * as apiCar from './services/car'
import { Car } from './types/car'
import { IResponse } from './types/response'

function App() {
  const [cars, setCars] = useState<Car[]>([])
  const [data, setData] = useState<Car>(null)
  const [action, setAction] = useState<string>(null)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isModalDelete, setModalDelete] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(null)

  useEffect(() => {
    handleFetchAll()
  }, [])

  const handleFetchAll = async () => {
    const res: IResponse<Car[]> = await apiCar.getAll()

    setCars(res.data)
  }

  const handleCreate = async () => {
    const res = await apiCar.create(data)
    if (res.success) {
      handleFetchAll()
      setModalOpen(false)
    }
  }

  const handleEdit = (index: number) => {
    setAction('update')
    setIndex(index)
    const car = cars.filter((x: Car, i: number) => i == index)?.[0]
    setData(car)
    setModalOpen(true)
  }

  const handleUpdate = async () => {
    const res = await apiCar.update(index, data)
    if (res.success) {
      handleFetchAll()
      setModalOpen(false)
      setData(null)
    }
  }

  const handleOpenDelete = (index: number) => {
    setModalDelete(true)
    setIndex(index)
    const car = cars.filter((x: Car, i: number) => i == index)?.[0]
    setData(car)
  }

  const handleDelete = async () => {
    const res = await apiCar.remove(index)
    if (res.success) {
      handleFetchAll()
      setModalDelete(false)
      setData(null)
    }
  }

  return (
    <Layout>
      <h3>Car</h3>
      <Button
        className={'pb'}
        type="primary"
        onClick={() => {
          setAction('add')
          setModalOpen(true)
          setData(null)
        }}
      >
        Add Car
      </Button>

      {cars?.map((x, i) => {
        return (
          <CarBox
            key={i}
            index={i}
            setData={setData}
            data={x}
            handleEdit={handleEdit}
            handleOpenDelete={handleOpenDelete}
          />
        )
      })}

      <Modal
        title={action == 'add' ? 'Add Car' : 'Edit Car'}
        open={isModalOpen}
        onOk={() => (action == 'add' ? handleCreate() : handleUpdate())}
        onCancel={() => {
          setModalOpen(false)
          setData(null)
        }}
        footer={
          <Button
            type="primary"
            onClick={() => (action == 'add' ? handleCreate() : handleUpdate())}
          >
            {action == 'add' ? 'Add' : 'Update'}
          </Button>
        }
      >
        <p>
          <Form.Item label="Name">
            <Input
              value={data?.name}
              onChange={(e) => {
                const update = {
                  ...data,
                  name: e.target.value
                }
                setData(update)
              }}
            />
          </Form.Item>
        </p>
        <p>
          <Form.Item label="Price">
            <InputNumber
              value={data?.price}
              onChange={(value) => {
                const update = {
                  ...data,
                  price: value
                }
                setData(update)
              }}
            />
          </Form.Item>
        </p>
        <p>
          <Form.Item label="Discount">
            <InputNumber
              value={data?.discount}
              onChange={(value) => {
                const update = {
                  ...data,
                  discount: value
                }
                setData(update)
              }}
            />
          </Form.Item>
        </p>
      </Modal>

      <Modal
        title={'Confirm Delete'}
        open={isModalDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalDelete(false)
          setData(null)
        }}
        footer={
          <>
            <Button type="primary" onClick={() => setModalDelete(false)}>
              Cancle
            </Button>
            <Button type="primary" onClick={handleDelete} danger>
              Confirm Delete
            </Button>
          </>
        }
      >
        ต้องการลบ {data?.name}
      </Modal>
    </Layout>
  )
}

export default App
