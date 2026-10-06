import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  public readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({
      has: this.page.getByText(productName, { exact: true }),
    });
    await product.locator('button').click();
  }

  async getCartItemByName(productName: string): Promise<Locator> {
    await this.cartLink.click();
    return this.page.locator('.cart_item').filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
}
