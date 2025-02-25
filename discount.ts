export interface Discount {
	applyDiscount(total: number): number
}

export class RegularDiscount implements Discount {
	applyDiscount(total: number): number {
		return total * 0.05
	}
}

export class PremiumDiscount implements Discount {
	applyDiscount(total: number): number {
		return total * 0.1
	}
}

export class VIPDiscount implements Discount {
	applyDiscount(total: number): number {
		return total * 0.2
	}
}
