import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs'
import { faker } from '@faker-js/faker'
import { NewCustomerProps, SignInProps, CustomerProps } from '../../types'

const filterCustomers = (
  data: CustomerProps[], 
  property: 'name' | 'email', 
  value: string) => {
  return data.filter(c => c[property].toLowerCase().startsWith(value))
}

export const startMirage = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
  
    models: {
      customer: Model.extend<Partial<CustomerProps>>({}),      
    },
  
    factories: {
      customer: Factory.extend({
        name() {
          return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLocaleLowerCase()
        },
        authorizeSendMail(i) {
          const isAuthorizing = [true, false]
          return isAuthorizing[i % isAuthorizing.length]          
        },
        authorizeDisplayVideo(i) {
          const isAuthorizing = [true, false]
          return isAuthorizing[i % isAuthorizing.length]          
        },
        video_url(i) {          
          const urls = [
            'https://res.cloudinary.com/bruno0907storage/video/upload/v1653333344/dillys/video.mp4',
            'https://res.cloudinary.com/bruno0907storage/video/upload/v1653349125/dillys/video3.mp4',
            'https://res.cloudinary.com/bruno0907storage/video/upload/v1653332348/dillys/video2.mp4'
          ]
          return urls[i % urls.length]
        },
        createdAt() {
          return faker.date.recent(10)
        },
        updatedAt() {
          return faker.date.recent(10)
        }
      })
    },
  
    seeds(server) {
      server.createList('customer', 5)
    },
  
    routes() {
      this.namespace = 'api'
  
      this.get('/customers', function (this: any, schema, request) {
        const { page, perPage, searchBy, searchValue } = request.queryParams!
        
        if(!perPage) {
          const total = schema.all('customer').length
          const customers: CustomerProps[] = this.serialize(schema.all('customer')).customers

          if(!searchBy) {            
            return new Response(
              200,
              { 'x-total-count' : String(total) },
              { data: customers }
            )
          }

          const customersFilter = filterCustomers(customers, searchBy, searchValue)
          const filterTotal = customersFilter.length
            
          return new Response(
            200,
            { 'x-total-count' : String(filterTotal) },
            { data:  customersFilter}
          )          
        } 

        if(!searchValue) {
          const total = schema.all('customer').length
          const pageStart = (Number(page) - 1) * Number(perPage)
          const pageEnd = pageStart + Number(perPage)
          
          const customers: CustomerProps[] = this.serialize(schema.all('customer')).customers.slice(pageStart, pageEnd)          
    
          return new Response(
            200,
            { 'x-total-count' : String(total) },
            { data: customers }
          )
        }

        const pageStart = (Number(page) - 1) * Number(perPage)
        const pageEnd = pageStart + Number(perPage)
        
        const customers: CustomerProps[] = this.serialize(schema.all('customer')).customers.slice(pageStart, pageEnd)        
        const customersFiltered = filterCustomers(customers, searchBy, searchValue);
        const filterTotal = customersFiltered.length

        return new Response(
          200,
          { 'x-total-count' : String(filterTotal) },
          { data:  customersFiltered}
        )   
      })

      this.post('/customers', (schema, request) => {
        const { name, email, authorizeSendMail, authorizeDisplayVideo }: NewCustomerProps = JSON.parse(request.requestBody)
        
        schema.create('customer', { 
          name, 
          email, 
          authorizeSendMail,
          authorizeDisplayVideo,
          video_url: 'https://res.cloudinary.com/bruno0907storage/video/upload/v1653333344/dillys/video.mp4',
          createdAt: faker.date.recent(10),
          updatedAt: faker.date.recent(10)
        })

        return new Response(201)

      })

      this.put('/customers/:id', (schema, request) => {
        const { id } = request.params!
        
        const { name, email, authorizeSendMail, authorizeDisplayVideo }: CustomerProps = JSON.parse(request.requestBody)
        
        const customer = schema.findBy('customer', { id })
        
        if(!customer) return new Response(400, {}, {
          error: {
            message: 'Customer not found'
          }
        })

        customer.update({
          name,
          email,
          authorizeSendMail,
          authorizeDisplayVideo,
          updatedAt: faker.date.recent(10)
        })

        return new Response(200)
      })

      this.del('/customers/:id', (schema, request) => {
        const { id } = request.params!

        const customer = schema.findBy('customer', { id })     

        if(!customer) return new Response(500, {}, { 
          error: { 
            message: 'Customer not found' 
          }
        })

        customer.destroy()

        return new Response(200)
      })
  
      this.post('/sign-in', (schema, request) => {
        const { username, password }: SignInProps = JSON.parse(request.requestBody)

        if(username !== 'admin' && password !== '123456') {
          return new Response(400, {}, {
            errors: {
              code: 400,
              message: 'Username or assword is invalid'
            }
          })
        }

        return new Response(200)
      })

      this.post('/customers/sendMail', (schema, request) => {
        const { id } = JSON.parse(request.requestBody)

        console.log('Email enviado para: ', id)

        return new Response(200)
      })
    }      
  })
  return server

}  
