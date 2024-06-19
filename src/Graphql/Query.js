/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

export const QUERY_ALL_CUSTOMER = gql`
query GetAllCustomer {
  getAllCustomer {
    id
    customerUniqueId
    fName
    lName
    company
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addresstwo
    postCode
    webPage
    notes
    area
    createdDateTime
    status
  }
}`

export const QUERY_GET_USER_BY_ID = gql`
query Query($userId: ID) {
  getLondonById(userId: $userId) {
    id
    userName
    warehouseName
    warehouseEmail
    warehouseContact
    contactName
    contactEmail
    contactPhone
    address
    password
    role
    createDataAndTime
    status
  }
}
`

export const QUERY_GET_ALL_INVOICE = gql`
query GetAllInvoice {
  getAllInvoice {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    bookingId
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    feedbackStatus
    feedbackMessage
    area
    createdDateTime
    paymentType
    paymentStatus
    paymentId
    paymentAmount
    paymentOther
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`

export const QUERY_GET_BOOKING_STATUS_PENDING = gql`
query GetBookingStatusPending {
  getBookingStatusPending {
    id
    bookingUniqueId
    bookDateAndTime
    pickUpDate
    pickUpTime
    notes
    allocation
    customerId
    collectionBoyId
    collectionName
    collectionBoyuniqueId
    createDateAndTime
    status
  }
}
`

export const QUERY_GET_ALL_COLLECTION_BOY = gql`
query GetAllWarehouseCollectionBoy {
  getAllWarehouseCollectionBoy {
    id
    uniqueId
    fName
    lName
    userName
    email
    phone
    address
    collectionStaffRole
    password
    type
    createdDateTime
    status
  }
}
`
export const QUERY_GET_INVOICE_BY_ID = gql`
query Query($invoiceId: ID) {
  getInvoiceById(invoiceId: $invoiceId) {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}

`

export const QUERY_GET_FREETOWN_INVOICE = gql`
query Query {
  getInvoiceFreetown {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    imgQR
    imgSignature
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`

export const QUERY_GET_ALL_FREETOWN_COLLECTION_BOY = gql`
query Query {
  getAllFreetownCollectionBoy {
    id
    uniqueId
    fName
    lName
    userName
    email
    phone
    address
    collectionStaffRole
    createdDateTime
    status
    type
  }
}

`

export const QUERY_GET_ALL_INVOICE_CONTAINER = gql`
query GetInvoiceContainer {
  getInvoiceContainer {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`

export const QUERY_GET_ALL_INVOICE_ON_WAY = gql`
query Query {
  getInvoiceOnWay {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}

`

export const QUERY_GET_ALL_INVOICE_WAREHOUSE_LONDON = gql`
query Query {
  getInvoiceWarehouse {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`

export const QUERY_GET_ALL_INVOICE_FREETOWN = gql`
query GetInvoiceFreetown {
  getInvoiceFreetown {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`
export const QUERY_GET_ALL_INVOICE_PICK_UP = gql`
query Query {
  getInvoicePickUp {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}
`
export const QUERY_GET_ALL_INVOICE_DELIVERED = gql`
query GetInvoiceDelivered {
  getInvoiceDelivered {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    createdDateTime
    status
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
  }
}

`

export const QUERY_GET_WAREHOUSE_BY_ID = gql`
query GetWarehouseById($warehouseId: ID) {
  getWarehouseById(warehouseId: $warehouseId) {
    id
    warehouseName
    warehouseContact
    warehouseEmail
    contactName
    contactEmail
    contactPhone
    username
    address
    password
    role
    createDataAndTime
    status
  }
}
`

export const GET_AREA = gql`
query Query {
  getAllArea {
    id
    areaName
    areaAddress
    areaLongitude
    areaLatitude
    createdDateTime
    status
  }
}
`

export const GET_ALL_CONTAINER  = gql`
query GetAllContainer {
  getAllContainer {
    id
    containerUniqueId
    vesselName
    carrierName
    containerDescription
    capacity
    createdDateTime
    status
  }
}

`

export const GET_ALL_BOOKING = gql`
query GetAllBooking {
  getAllBooking {
    id
    bookingUniqueId
    bookDateAndTime
    pickUpDate
    pickUpTime
    notes
    allocation
    customerId
    collectionBoyId
    collectionName
    collectionBoyuniqueId
    createDateAndTime
    status
  }
}
`

export const GET_INVOICE_BY_INVOICE_NUMBER = gql`
query GetInvoiceByInvoiceNo($invoiceId: String) {
  getInvoiceByInvoiceNo(invoiceId: $invoiceId) {
    id
 
  }
}
`
export const GET_INVOICE_PAYMENT_STATUS = gql`
query Query {
  getPaymentStatus {
    id
    invoiceNumber
    customerId
    customerUniqueId
    containerId
    containerUniqueId
    recipientName
    email
    phoneOne
    phoneTwo
    phoneThree
    addressOne
    addressTwo
    postCode
    totalCost
    bookingNo
    bookingId
    items {
      id
      itemId
      itemType
      itemDescription
      length
      height
      weight
      quantity
      costPerItem
      ItemDeliveredDateAndTime
      ItemStatus
      containerNo
    }
    collectionBoyId
    collectionBoyName
    collectionBoyFreetownId
    collectionBoyFreetownName
    collectionBoyFreetownUniqueId
    imgQR
    imgSignature
    warehousePickupDateAndTime
    freetownPickUpDateAndTime
    containerPickUpDateAndTime
    collectionBoyPickUpDateAndTime
    onWayDateAndTime
    deliveredDateAndTime
    feedbackStatus
    feedbackMessage
    area
    createdDateTime
    paymentType
    paymentStatus
    paymentId
    paymentAmount
    paymentOther
    status
  }
}


`