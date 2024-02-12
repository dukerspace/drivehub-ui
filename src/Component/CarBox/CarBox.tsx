import { Button, Card, Col, Row } from 'antd'
import { Car } from '../../types/car'
import './CarBox.css'

interface Props {
  index: number
  data: Car
  setData: (data: Car) => void
  handleEdit: (index: number) => void
  handleOpenDelete: (index: number) => void
}

export const CarBox: React.FC<Props> = ({ index, data, handleEdit, handleOpenDelete }) => {
  const DiscountBox = () => {
    return (
      <>
        <span className="price">{data.price} THB</span>
        <span className="discount">{data.price - data.discount} THB</span>
      </>
    )
  }

  return (
    <Card className="box-space">
      <Row>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <h3 className="left">{data.name}</h3>
            </Col>
            <Col span={24}>
              <div className="left">{data.discount ? <DiscountBox /> : `${data.price} THB`}</div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={() => handleEdit(index)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleOpenDelete(index)}>
            Delete
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
