import { Discount, RegularDiscount, PremiumDiscount, VIPDiscount } from './discount'

class Customer {
	name: string
	type: string
	discount: Discount

	constructor(name: string, type: string) {
		this.name = name
		this.type = type
		this.discount = this.setDiscount()
	}

	private setDiscount(): Discount {
		switch (this.type) {
			case 'Regular':
				return new RegularDiscount()
			case 'Premium':
				return new PremiumDiscount()
			case 'VIP':
				return new VIPDiscount()
			default:
				throw new Error('Invalid customer type')
		}
	}
}

// Please do not refactor the order class

class Order {
	customer: Customer
	items: string[]
	prices: number[]
	totalPrice: number
	discountedPrice: number

	constructor(customer: Customer) {
		this.customer = customer
		this.items = []
		this.prices = []
		this.totalPrice = 0
		this.discountedPrice = 0
	}

	addItem(item: string, price: number): void {
		this.items.push(item)
		this.prices.push(price)
		this.calculateTotal()
	}

	calculateTotal(): void {
		this.totalPrice = this.prices.reduce((sum, price) => sum + price, 0)
		this.applyDiscount()
	}

	applyDiscount(): void {
		this.discountedPrice = this.totalPrice - this.totalPrice * this.customer.discount
	}

	printOrder(): void {
		console.log(`Customer: ${this.customer.name}`)
		console.log(`Items: ${this.items.join(', ')}`)
		console.log(`Total Price: ${this.totalPrice}`)
		console.log(`Discounted Price: ${this.discountedPrice}`)
	}
}

// Order Management System - Handles orders
class OrderManagementSystem {
	static main(): void {
		const customer = new Customer('John Doe', 'VIP')
		const order = new Order(customer)

		order.addItem('Laptop', 1000)
		order.addItem('Mouse', 50)
		order.addItem('Keyboard', 80)

		order.printOrder()

		OrderManagementSystem.generateInvoice(order)
	}

	static generateInvoice(order: Order): void {
		console.log('Generating Invoice...')
		console.log(`Customer: ${order.customer.name}`)
		console.log(`Total: $${order.totalPrice}`)
		console.log(`Discounted Total: $${order.discountedPrice}`)
		console.log(`Items: ${order.items.join(', ')}`)
		console.log('Thank you for shopping with us!')
	}
}

// Run the order management system
OrderManagementSystem.main()
