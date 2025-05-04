import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ADDRESS, BRANDS, CATEGORIES, CUSTOMER, PAYMENTMETHODS, PAYMENTS, PRODUCTS, PRODUCTSPECS, PURCHARSES, PURCHARSESDETAIL, STATUS } from './data/seed-data';
import { Brand } from 'src/products/entities/brand.entity';
import { Address } from 'src/customer/entities/address.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Category } from 'src/products/entities/category.entity';
import { ProductSpecs } from 'src/products/entities/productSpecs.entity';
import { Status } from 'src/purchase/entities/status.entity';
import { PaymentMethod } from '../purchase/entities/paymentMethod.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Payment } from 'src/purchase/entities/payment.entity';
import { PurchaseDetail } from 'src/purchase/entities/purchaseDetail';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(ProductSpecs)
    private readonly productSpecRepository: Repository<ProductSpecs>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,

    @InjectRepository(PurchaseDetail)
    private readonly purchaseDetailRepository: Repository<PurchaseDetail>,
  ) {}

  async runSeed() {

    await this.deleteAllTable(this.productSpecRepository, 'productSpecs');
    await this.deleteAllTable(this.productRepository, 'product');
    await this.deleteAllTable(this.brandRepository, 'brand');
    await this.deleteAllTable(this.categoryRepository, 'category');
    
    await this.insertBrands();
    await this.insertCategory();
    await this.insertProducts();
    await this.insertSpecs();

    await this.deleteAllTable(this.addressRepository, 'address');
    await this.deleteAllTable(this.customerRepository, 'customer');
    await this.insertCustomer();
    await this.insertAddress();

    await this.deleteAllTable(this.statusRepository, 'status');
    await this.deleteAllTable(this.paymentMethodRepository, 'payment_method');
    await this.insertStatus();
    await this.insertPaymentMethod();

    await this.deleteAllTable(this.purchaseDetailRepository, 'purchase_detail');
    await this.deleteAllTable(this.purchaseRepository, 'purchase');
    await this.deleteAllTable(this.paymentRepository, 'payment');

    await this.insertPurchase()
    await this.insertPurchaseDetail()
    await this.insertPayment()

    return 'SEED EXECUTED';
  }

  async deleteAllTable(repositorio: Repository<any>, alias: string) {
    const query = repositorio.createQueryBuilder(alias);

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw (error);
    }
  }

  async insertProducts() {

    const products = PRODUCTS;

    const insertProduct:Product[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    products.forEach( product => {

      const entidad = this.productRepository.create({
        ...product,
        category: { id: product.id_category } as Category,
        brand: { id: product.id_brand } as Brand
      }); 
      insertProduct.push(entidad);;
    });

    await this.productRepository.save(insertProduct);
  }

  async insertBrands() {
    // Obtenemos los datos a insertar
    const brands = BRANDS;

    const insertBrands:Brand[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    brands.forEach( brand => {
      const entidad = this.brandRepository.create({
        id: brand.id,
        name: brand.name
      });
      insertBrands.push(entidad)
    });

    await this.brandRepository.save(insertBrands);
  }

  async insertSpecs() {

    const specs = PRODUCTSPECS;

    const insertBrands:ProductSpecs[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    specs.forEach( spec => {
      const entidad = this.productSpecRepository.create({
        name: spec.name,
        value: spec.value,
        product: { id: spec.id_product } as Product
      });
      insertBrands.push(entidad)
    });

    await this.productSpecRepository.save(insertBrands);
  }

  async insertCategory() {

    const categories = CATEGORIES;

    const insertCategories: Category[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    categories.forEach( categorie => {
      const entidad = this.categoryRepository.create({
        id: categorie.id,
        name: categorie.name
      });
      insertCategories.push(entidad)
    });

    await this.categoryRepository.save(insertCategories);
  }

  async insertAddress() {
    
    const address = ADDRESS;

    const insertAddress:Address[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    address.forEach( address => {
      const entidad = this.addressRepository.create({
        id: address.id,
        street: address.street,
        city: address.city,
        country: address.country,
        zip: address.zip,
        reference: address.reference,
        is_default: false,
        customer: { id: address.id_customer } as Customer,
      });
      insertAddress.push(entidad)
    });

    await this.addressRepository.save(insertAddress);
  }

  async insertCustomer() {

    const customers = CUSTOMER;

    const insertCustomer:Customer[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    customers.forEach( async (customer) => {
      const entidad = this.customerRepository.create({
        id: customer.id,
        "first_name": customer.first_name,
        "last_name": customer.last_name,
        "email": customer.email,
        "phone": customer.phone,
        "password": customer.password,
      });
      insertCustomer.push(entidad)
    });

    await this.customerRepository.save(insertCustomer);
  }

  async insertStatus() {

    const status = STATUS;

    const insertStatus: Status[] = []

    status.forEach( async (status) => {
      const entidad = this.statusRepository.create({
        id: status.id,
        name: status.name,
        type: status.type
      });
      insertStatus.push(entidad)
    });

    await this.statusRepository.save(insertStatus);
  }

  async insertPaymentMethod() {

    const paymentMethod = PAYMENTMETHODS;

    const insertPaymentMethod: PaymentMethod[] = []

    paymentMethod.forEach( async (paymentMethod) => {
      const entidad = this.paymentMethodRepository.create({
        id: paymentMethod.id,
        name: paymentMethod.name,
        description: paymentMethod.description
      });
      insertPaymentMethod.push(entidad)
    });

    await this.paymentMethodRepository.save(insertPaymentMethod);
  }

  async insertPurchase() {

    const purchases = PURCHARSES;

    const insertPurchase: Purchase[] = []

    purchases.forEach( async (purchase) => {
      const entidad = this.purchaseRepository.create({
        id: purchase.id,
        currency: purchase.currency,
        total_cost: purchase.total_cost,
        status: { id: purchase.id_status } as Status,
        customer: { id: purchase.id_customer } as Customer
      });
      insertPurchase.push(entidad)
    });

    await this.purchaseRepository.save(insertPurchase);
  }

  async insertPurchaseDetail() {

    const purchasesDetail = PURCHARSESDETAIL;

    const insertPurchasesDetail: PurchaseDetail[] = []

    purchasesDetail.forEach( async (purchaseDetail) => {
      const entidad = this.purchaseDetailRepository.create({
        id: purchaseDetail.id,
        quantity: purchaseDetail.quantity,
        sale_price: purchaseDetail.sale_price,
        product: { id: purchaseDetail.id_product } as Product,
        purchase: { id: purchaseDetail.id_purchase } as Purchase
      });
      insertPurchasesDetail.push(entidad)
    });

    await this.purchaseDetailRepository.save(insertPurchasesDetail);
  }

  async insertPayment() {

    const payments = PAYMENTS;

    const insertPayments: Payment[] = []

    payments.forEach( async (payment) => {
      const entidad = this.paymentRepository.create({
        id: payment.id,
        currency: payment.currency,
        amount: payment.amount,
        payment_method: { id: payment.id_payment_method } as PaymentMethod,
        status: { id: payment.id_status } as Status,
        purchase: { id: payment.id_purchase } as Purchase
      });
      insertPayments.push(entidad)
    });

    await this.paymentRepository.save(insertPayments);
  }

}
