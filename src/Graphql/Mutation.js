import { gql } from '@apollo/client';


export const MUTATION_CUSTOMER = gql`
mutation Mutation($customerInput: customerInput) {
    createCustomer(CustomerInput: $customerInput) {
      id
     
    }
  }
`

export const MUTATION_EDIT_CUSTOMER = gql`
mutation Mutation($editCustomerInput: editCustomerInput) {
  editCustomer(EditCustomerInput: $editCustomerInput) {
    id
   
  
  }
}
`

export const MUTATION_DELETE_CUSTOMER = gql`
mutation DeleteCustomer($customerId: ID) {
  deleteCustomer(customerId: $customerId) {
    id
  
  }
}
`

export const MUTATION_ADD_INVOICE = gql`
mutation Mutation($invoiceInput: invoiceInput) {
  createInvoice(InvoiceInput: $invoiceInput) {
    id
  
  }
}

` 

export const MUTATION_LOGIN_LONDON = gql`
mutation LondonStattLogin($userName: String, $password: String) {
  londonStattLogin(userName: $userName, password: $password) {
    londonId
    londonToken
  }
}
`

export const MUTATION_ADD_BOOKING = gql`
mutation CreateBooking($bookingInput: bookingInput) {
  createBooking(BookingInput: $bookingInput) {
    id
   
  }
}
`

export const MUTATION_UPDATE_BOOKING = gql`
mutation Mutation($editBookingInput: editBookingInput) {
  editBooking(EditBookingInput: $editBookingInput) {
    id
    
  }
}
`

export const MUTATION_EDIT_INVOICE = gql`
mutation EditInvoice($editInvoiceInput: editInvoiceInput) {
  editInvoice(EditInvoiceInput: $editInvoiceInput) {
    id
  
  }
}

`

export const MUTATION_INVOICE_IN_CONTAINER = gql`
mutation Mutation($invoiceId: ID, $itemId: ID, $containerNo: String) {
  invoiceItemIntoContainer(invoiceId: $invoiceId, itemId: $itemId, containerNo: $containerNo) {
    id
   
  }
}

`

export const MUTATION_INVOICE_DELIVERED = gql`
mutation Mutation($invoiceId: ID, $itemId: ID, $itemDeliveredDateAndTime: String, $itemStatus: String) {
  invoiceItemIntoDelivered(invoiceId: $invoiceId, itemId: $itemId, ItemDeliveredDateAndTime: $itemDeliveredDateAndTime, ItemStatus: $itemStatus) {
    id
  
    
  }
}
`


export const MUTATION_WAREHOUSE_LOGIN = gql`
mutation Mutation($warehouseLoginInput: warehouseLoginInput) {
  warehouseLogin(WarehouseLoginInput: $warehouseLoginInput) {
    warehouseId
    warehouseToken
  }
}
`

export const MUTATION_EMAIL = gql`
mutation Mutation($email: String, $subject: String, $text: String, $userName: String, $img: String, $logo: String, $htmlContext: String) {
  createMail(email: $email, subject: $subject, text: $text, userName: $userName, Img: $img, logo: $logo, htmlContext: $htmlContext)
}
`

export const MUTATION_INVOICE_EDIT = gql`
mutation Mutation($editInvoiceInput: editInvoiceInput) {
  editInvoice(EditInvoiceInput: $editInvoiceInput) {
 id
  }
}
`